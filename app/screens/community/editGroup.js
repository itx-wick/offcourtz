import React, {useState, useRef} from 'react';
import {
  ImageBackground,
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AWS from 'aws-sdk';
import fs from 'react-native-fs';
import {decode} from 'base64-arraybuffer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {View, Text} from 'react-native';
import {theme} from '../../theme';
import {
  fontFamily,
  fontSize,
  fontWeight,
} from '../../constants/fontDecorations';
import Modal from 'react-native-modal';
import userPlaceholder from '../../assets/images/user.jpeg';
import {screenHeight, screenWidth} from '../../constants';
import {svgImages} from '../../helpers';
import {END_POINTS, screens} from '../../config';
import {SvgXml} from 'react-native-svg';
import Button from '../../components/button';
import {Commons} from '../../utils';
import {TextInput} from 'react-native-gesture-handler';
import {FlatList} from 'react-native';
import {Image} from 'react-native';
import {Platform} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setLoader} from '../../redux/reducers/commonSlice';
import {launchImageLibrary} from 'react-native-image-picker';
import {useToast} from 'react-native-toast-notifications';
import ApiService from '../../services/ApiService';
import FastImage from 'react-native-fast-image';
function EditGroup({navigation, route}) {
  const grp = route.params;
  const toast = useToast();
  const searchRef = useRef();
  const dispatch = useDispatch();
  const authToken = useSelector(state => state.Auth.token);
  const myFriends = useSelector(state => state.Auth.friends);
  const isLoader = useSelector(state => state.Common.loader);
  const [search, setSearch] = useState('');
  const [name, setName] = useState(grp.title);
  const [desc, setDesc] = useState(grp.description);
  const [status, setStatus] = useState(grp.type);
  const [listTab, setListTab] = useState(Commons.groupTabs);
  const [data, setData] = useState(myFriends);
  const [selectedItem, setSelectedItem] = useState({});
  const [selectedImage, setSelectedImage] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [nameFocus, setNameFocus] = React.useState(false);
  const [descFocus, setDescFocus] = React.useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  React.useEffect(() => {
    console.log(JSON.stringify(grp, null, 2));
    dispatch(setLoader(false));
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  React.useEffect(() => {
    const updatedArray = myFriends.map(obj => {
      // Check if the object's ID matches the desired ID
      const matchingObj = grp.participants.find(obj2 => obj2._id === obj._id);
      if (matchingObj) {
        // Create a new object with the updated key value(s)
        return {...obj, selected: matchingObj.selected};
      } else {
        // If the ID doesn't match, return the original object
        return obj;
      }
    });
    setData(updatedArray);
  }, [myFriends]);

  const setStatusFilter = status => {
    setStatus(status);
  };

  const onSearch = search => {
    if (search !== '') {
      let tempData = data.filter(item => {
        return item.firstName.toLowerCase().indexOf(search.toLowerCase()) > -1;
      });
      setData(tempData);
    } else {
      setData(myFriends);
    }
  };

  const renderListItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          console.log(data[index]);
          const modifiedArray = [...data];
          modifiedArray[index] = {
            ...modifiedArray[index],
            selected: !item.selected,
          };
          setData([...modifiedArray]);
        }}
        style={styles.listItem}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <FastImage
            source={item?.image ? {uri: item.image} : userPlaceholder}
            style={styles.userImage}
          />
          <View>
            <Text
              style={
                styles.listItemTitle
              }>{`${item.firstName} ${item.lastName}`}</Text>
            <Text style={styles.listItemSubTitle}>{`${item.email}`}</Text>
          </View>
        </View>
        <SvgXml
          xml={
            item.selected
              ? svgImages.activeCheckIcon
              : svgImages.inActiveCheckIcon
          }
        />
      </TouchableOpacity>
    );
  };

  const pickImages = async () => {
    await launchImageLibrary({
      mediaType: 'photo',
    })
      .then(async res => {
        setSelectedImage(res.assets[0]);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const flatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: screenWidth * 0.9,
          backgroundColor: theme.colors.gray1,
        }}
      />
    );
  };

  const navigateBack = () => {
    navigation.goBack();
  };

  const showToast = (type, msg, duration) => {
    toast.show(msg, {
      type: type,
      placement: 'bottom',
      duration: duration,
      offset: 30,
      animationType: 'zoom-in',
    });
  };

  const handleChange = (type, value) => {
    if (type === 'Name') {
      setName(value);
    } else if (type === 'Description') {
      setDesc(value);
    }
  };

  const fieldError = inputType => {
    if (inputType == 'name') {
      if (name === '') {
        return 'Group Name Required';
      } else if (name.length < 4) return 'Group Name Too Short';
    } else if (inputType == 'description') {
      if (desc === '') {
        return 'Group Description Required';
      }
    } else if (inputType == 'participants') {
      return 'Select at least 1 participant';
    }
  };

  const validateData = () => {
    Keyboard.dismiss();
    const count = data.reduce((acc, obj) => (obj.selected ? acc + 1 : acc), 0);
    if (name == '' || name.length < 4) {
      showToast('normal', fieldError('name'), 3000);
    } else if (desc == '') {
      showToast('normal', fieldError('description'), 3000);
    } else if (count === 0) {
      showToast('normal', fieldError('participants'), 3000);
    } else {
      process();
    }
  };

  const process = async () => {
    try {
      // dispatch(setLoader(true));
      // if (Object.keys(selectedImage).length !== 0) {
      //   uploadFileToS3(selectedImage);
      // } else {
      //   createGroup();
      // }
      // dispatch(setLoader(false));
    } catch (error) {
      showToast('normal', error, 3000);
      console.log('try/catch', error);
    }
  };

  const uploadFileToS3 = async imgFile => {
    const s3bucket = new AWS.S3({
      accessKeyId: 'AKIAZGOWSY7KCYB2AESW',
      secretAccessKey: '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',
      Bucket: 'offcourtz-files',
      signatureVersion: 'v4',
    });
    const contentType = imgFile.type;
    const contentDeposition = `inline;filename="${imgFile.fileName}"`;
    const fPath = imgFile.uri;
    const base64 = await fs.readFile(fPath, 'base64');
    const arrayBuffer = decode(base64);

    s3bucket.createBucket(() => {
      const params = {
        Bucket: 'offcourtz-files',
        Key: 'images/' + imgFile.fileName,
        Body: arrayBuffer,
        ContentDisposition: contentDeposition,
        ContentType: contentType,
      };
      s3bucket.upload(params, async (error, data) => {
        if (error) {
          console.log('Uploading Error', error);
        } else {
          console.log('Data', data.Location);
          createGroup(data.Location);
        }
      });
    });
  };

  const createGroup = async (img = null) => {
    let body = {
      title: name,
      type: status,
      description: desc,
      image: img,
      participants: data.filter(obj => obj.selected === true),
    };
    await ApiService.post(END_POINTS.createGroup, body, authToken)
      .then(res => {
        console.log('Group Created Response', JSON.stringify(res, null, 2));
        setTimeout(() => {
          setModalVisible(true);
        }, 0);
        dispatch(setLoader(false));
      })
      .catch(err => {
        dispatch(setLoader(false));
        showToast('normal', err, 3000);
        console.log('promise error', err);
      });
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerMainContainer}>
        <View style={styles.headContainer}>
          <TouchableOpacity
            onPress={navigateBack}
            style={{position: 'absolute', left: 15}}>
            <SvgXml width="36" height="36 " xml={svgImages.back} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Group</Text>
        </View>
        <View style={styles.underlineView} />
      </View>

      {!modalVisible && (
        <>
          <ScrollView>
            <View style={styles.secondaryCont}>
              <View style={{marginTop: 15}}>
                <ImageBackground
                  style={{
                    height: 0.45 * screenWidth,
                    borderWidth: 2,
                    borderColor: theme.colors.gray1,
                    borderRadius: 15,
                    marginTop: 5,
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    backgroundColor: theme.colors.white,
                  }}
                  imageStyle={{
                    borderRadius: 15,
                  }}
                  source={{
                    uri:
                      Object.keys(selectedImage).length !== 0
                        ? selectedImage.uri
                        : grp.image,
                  }}>
                  <View style={{height: 50}}>
                    <SvgXml
                      width="60"
                      height="60"
                      xml={svgImages.imagePlaceHolder}
                    />
                  </View>
                  <Button
                    title={'ADD PHOTO'}
                    iconHeight={16}
                    iconWidth={16}
                    icon={svgImages.plus}
                    onPress={() => pickImages()}
                    btnWidth={screenWidth * 0.4}
                    btnHeight={45}
                    titleColor={theme.colors.white}
                    backgroundColor={theme.colors.secondaryBlack}
                  />
                </ImageBackground>
              </View>
              <View style={styles.listTab}>
                {listTab.map(e => (
                  <TouchableOpacity
                    style={[
                      styles.btnTab,
                      status === e.status && styles.btnTabActive,
                    ]}
                    onPress={() => setStatusFilter(e.status)}>
                    <Text style={styles.textTab}>{e.status}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={{marginTop: 10}}>
                <Text
                  style={{
                    fontFamily: fontFamily.argentum_sans,
                    fontSize: fontSize.verbiage_medium,
                    fontWeight: fontWeight[300],
                    marginVertical: 5,
                    color: theme.colors.greyText,
                  }}>
                  Group Name
                </Text>
                <TextInput
                  width={0.92 * screenWidth}
                  height={0.12 * screenWidth}
                  borderWidth={2}
                  borderColor={theme.colors.gray1}
                  borderRadius={0.12 * screenWidth}
                  placeholderTextColor={theme.colors.greyText}
                  placeholder="England Tennis Group"
                  onChangeText={e => {
                    handleChange('Name', e);
                  }}
                  onEndEditing={() => setNameFocus(false)}
                  onFocus={() => setNameFocus(true)}
                  value={name}
                  style={{
                    paddingHorizontal: 15,
                    fontFamily: fontFamily.argentum_sans,
                    fontSize: fontSize.verbiage,
                    color: theme.colors.black,
                    backgroundColor: theme.colors.white,
                  }}
                />
              </View>
              <View style={{marginTop: 10}}>
                <Text
                  style={{
                    fontFamily: fontFamily.argentum_sans,
                    fontSize: fontSize.verbiage_medium,
                    fontWeight: fontWeight[300],
                    marginVertical: 5,
                    color: theme.colors.greyText,
                  }}>
                  Group Description
                </Text>
                <TextInput
                  width={0.92 * screenWidth}
                  height={0.12 * screenWidth}
                  borderWidth={2}
                  borderColor={theme.colors.gray1}
                  borderRadius={0.12 * screenWidth}
                  placeholderTextColor={theme.colors.greyText}
                  placeholder="Description Of The Group"
                  onChangeText={e => {
                    handleChange('Description', e);
                  }}
                  onEndEditing={() => setDescFocus(false)}
                  onFocus={() => setDescFocus(true)}
                  value={desc}
                  style={{
                    paddingHorizontal: 15,
                    fontFamily: fontFamily.argentum_sans,
                    fontSize: fontSize.verbiage,
                    color: theme.colors.black,
                    backgroundColor: theme.colors.white,
                  }}
                />
              </View>
              <View
                style={[
                  styles.underlineView,
                  {width: 0.92 * screenWidth, marginVertical: 20},
                ]}
              />
              <View>
                <Text
                  style={{
                    fontFamily: fontFamily.argentum_sans,
                    fontSize: fontSize.verbiage_20,
                    fontWeight: fontWeight[700],
                    color: theme.colors.black,
                  }}>
                  Add Participants
                </Text>
                <View style={styles.searchInputContainer}>
                  <Ionicons
                    name={'ios-search'}
                    size={24}
                    color={theme.colors.primary}
                    style={styles.searchIcon}
                  />
                  <TextInput
                    value={search}
                    ref={searchRef}
                    onChangeText={txt => {
                      onSearch(txt);
                      setSearch(txt);
                    }}
                    style={styles.searchInput}
                    placeholder="Search Participants"
                    placeholderTextColor={theme.colors.greyText}
                  />
                </View>
                <FlatList
                  data={data}
                  showsVerticalScrollIndicator={false}
                  ListFooterComponent={<View style={{height: 10}} />}
                  keyExtractor={item => item._id}
                  contentContainerStyle={styles.listContentContainer}
                  ItemSeparatorComponent={flatListItemSeparator}
                  renderItem={renderListItem}
                  style={{
                    height: 0.75 * screenWidth,
                    marginBottom: 0.14 * screenWidth,
                  }}
                />
              </View>
            </View>
          </ScrollView>
          <View
            style={{
              width: screenWidth,
              alignItems: 'center',
            }}>
            <Button
              title={'CREATE GROUP'}
              onPress={() => {
                validateData();
                // setModalVisible(!modalVisible);
              }}
              btnWidth={screenWidth * 0.92}
              btnHeight={0.14 * screenWidth}
              titleColor={theme.colors.white}
              backgroundColor={theme.colors.primary}
              btnStyle={{
                position: 'absolute',
                bottom: 15,
              }}
            />
          </View>
        </>
      )}
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: theme.colors.white,
              borderRadius: 20,
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
              width: screenWidth * 0.85,
              paddingVertical: 20,
              alignItems: 'center',
            }}>
            <SvgXml xml={svgImages.checkCircle} />
            <Text
              style={{
                fontFamily: fontFamily.argentum_sans,
                fontSize: fontSize.verbiage_22,
                fontWeight: 'bold',
                color: theme.colors.secondaryBlack,
                marginTop: 10,
              }}>
              Group Updated
            </Text>
            <Text
              style={{
                fontFamily: fontFamily.argentum_sans,
                fontSize: fontSize.verbiage,
                fontWeight: fontWeight[500],
                textAlign: 'left',
                color: theme.colors.greyText,
                marginVertical: 10,
              }}>
              Your have successfully updated the group!
            </Text>
            <View style={{marginVertical: 5}}>
              <Button
                title={'DONE'}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  navigateBack();
                }}
                btnWidth={screenWidth * 0.75}
                btnHeight={0.14 * screenWidth}
                titleColor={theme.colors.white}
                titleStyle={{
                  fontFamily: fontFamily.argentum_sans,
                  fontSize: fontSize.verbiage_16,
                  fontWeight: fontWeight[500],
                  color: theme.colors.white,
                }}
                backgroundColor={theme.colors.primary}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default EditGroup;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: theme.colors.whisper,
  },
  headerMainContainer: {
    width: screenWidth,
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 0.12 * screenWidth : 0.04 * screenWidth,
  },
  headContainer: {
    flexDirection: 'row',
    height: 0.12 * screenWidth,
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth,
  },
  headerTitle: {
    fontFamily: fontFamily.argentum_sans,
    fontWeight: '500',
    fontSize: fontSize.verbiage_20,
    color: theme.colors.secondaryBlack,
  },
  underlineView: {
    width: screenWidth,
    height: 1,
    backgroundColor: theme.colors.gray1,
    marginVertical: 10,
  },
  secondaryCont: {
    width: '100%',
    paddingHorizontal: 15,
  },
  searchInputContainer: {
    width: screenWidth * 0.92,
    height: 0.12 * screenWidth,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.gray1,
    borderRadius: screenHeight * 0.14,
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: theme.colors.white,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: fontSize.verbiage_medium,
    fontFamily: fontFamily.argentum_sans,
    fontWeight: fontWeight[500],
  },
  userImage: {
    width: 0.12 * screenWidth,
    height: 0.12 * screenWidth,
    borderRadius: 0.12 * screenWidth,
    borderWidth: 2,
    marginRight: 10,
    resizeMode: 'contain',
    borderColor: theme.colors.gray1,
  },
  listItem: {
    flexDirection: 'row',
    width: screenWidth * 0.92,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingVertical: 10,
  },
  listItemTitle: {
    fontFamily: fontFamily.argentum_sans,
    fontSize: fontSize.verbiage_large,
    fontWeight: fontWeight[600],
    color: theme.colors.black,
    textTransform: 'capitalize',
  },
  listItemSubTitle: {
    fontFamily: fontFamily.argentum_sans,
    fontSize: fontSize.verbiage_medium,
    color: theme.colors.secondaryBlack,
  },
  listContentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  listTab: {
    width: 0.92 * screenWidth,
    flexDirection: 'row',
    backgroundColor: theme.colors.white,
    height: 0.14 * screenWidth,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0.14 * screenWidth,
    marginTop: 15,
  },
  btnTab: {
    // width: (0.92 * screenWidth) / 2.15,
    // height: 0.09 * screenWidth,
    width: '50%',
    height: 0.11 * screenWidth,
    borderRadius: 0.11 * screenWidth,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTab: {
    fontFamily: fontFamily.argentum_sans,
    fontSize: fontSize.verbiage_medium,
    fontWeight: fontWeight[400],
  },
  btnTabActive: {
    backgroundColor: theme.colors.primary,
  },
});
