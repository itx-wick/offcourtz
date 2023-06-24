import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Keyboard,
} from 'react-native';
import AWS from 'aws-sdk';
import fs from 'react-native-fs';
import {decode} from 'base64-arraybuffer';
import Modal from 'react-native-modal';
import {SvgXml} from 'react-native-svg';
import {useDispatch, useSelector} from 'react-redux';
import {useToast} from 'react-native-toast-notifications';
import {theme} from '../theme';
import {Commons} from '../utils';
import {END_POINTS, screens} from '../config';
import {svgImages} from '../helpers';
import {screenWidth} from '../constants';
import Button from '../components/button';
import TextField from '../components/textField';
import ApiService from '../services/ApiService';
import DropDown from '../components/dropDownView';
import {setLoader} from '../redux/reducers/commonSlice';
import {fontFamily, fontSize, fontWeight} from '../constants/fontDecorations';
import {launchImageLibrary} from 'react-native-image-picker';

function CustomWorkout({navigation}) {
  const toast = useToast();
  const dispatch = useDispatch();
  const authToken = useSelector(state => state.Auth.token);
  const [title, setTitle] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [titleFocus, setTitleFocus] = React.useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState({});

  useEffect(() => {
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

  const handleChange = (type, value) => {
    if (type === 'Title') {
      setTitle(value);
    }
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

  const validateData = () => {
    const data = [...formVal];
    Keyboard.dismiss();
    if (title == '' || title.length < 4) {
      showToast('normal', fieldError('title'), 3000);
      return;
    }
    for (let index = 0; index < data.length; index++) {
      if (data[index].type == '') {
        showToast('normal', `Please Choose Exercise-${index + 1} Type`, 3000);
        return;
      } else if (data[index].duration == '') {
        showToast(
          'normal',
          `Please Choose Exercise-${index + 1} Duration`,
          3000,
        );
        return;
      } else if (data[index].name == '') {
        showToast('normal', `Workout-${index + 1} Name Required`, 3000);
        return;
      } else if (data[index].name.length < 4) {
        showToast('normal', `Workout-${index + 1} Name Too Short`, 3000);
        return;
      }
    }
    if (Object.keys(selectedImage).length === 0) {
      showToast('normal', 'Image Required', 3000);
      return;
    } else {
      process();
    }
  };

  const fieldError = inputType => {
    if (inputType == 'title') {
      if (title === '') {
        return 'Title Required';
      } else if (title.length < 4) return 'Title Too Short';
    }
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

  const process = async () => {
    try {
      dispatch(setLoader(true));
      uploadFileToS3(selectedImage);
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
          let body = {
            title: title,
            exercises: formVal,
            image: data.Location,
          };
          console.log('Workout Body', JSON.stringify(body, null, 2));
          await ApiService.post(END_POINTS.createWorkout, body, authToken)
            .then(res => {
              console.log(
                'Post Created Response',
                JSON.stringify(res, null, 2),
              );
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
        }
      });
    });
  };

  function handleSelection(e, i, type) {
    let newForm = [...formVal];
    console.log('New Form', newForm);
    if (type === 'type') {
      newForm[i]['type'] = e.title;
      setFormVal(newForm);
    } else if (type === 'duration') {
      newForm[i]['duration'] = parseInt(e.title);
      setFormVal(newForm);
    } else if (type === 'name') {
      newForm[i]['name'] = e;
      setFormVal(newForm);
    }
    console.log('Form', formVal);
  }

  const [formVal, setFormVal] = useState([
    {type: '', duration: null, name: ''},
  ]);

  const addNew = () => {
    setFormVal([...formVal, {type: '', duration: null, name: ''}]);
  };

  const onRemove = i => {
    const newForm = [...formVal];
    newForm.splice(i, 1);
    setFormVal(newForm);
  };

  const navigateBack = () => {
    navigation.goBack();
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
          <Text style={styles.headerTitle}>Custom Workout</Text>
        </View>
        <View style={styles.underlineView} />
      </View>

      {!modalVisible && (
        <>
          <ScrollView>
            <View style={styles.secondaryCont}>
              <View style={{marginTop: 10}}>
                <TextField
                  inputWidth={0.92 * screenWidth}
                  height={0.12 * screenWidth}
                  borderColor={theme.colors.greyText}
                  borderRadius={0.4 * screenWidth}
                  title={'Title'}
                  placeholder={'Title'}
                  paddingHorizontal={10}
                  type={'text'}
                  onChangeText={e => {
                    handleChange('Title', e);
                  }}
                  onEndEditing={() => setTitleFocus(false)}
                  onFocus={() => setTitleFocus(true)}
                  value={title}
                />
              </View>
              {formVal.map((item, i) => (
                <View>
                  {formVal.length > 1 && (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: 15,
                      }}>
                      <Text
                        style={{
                          fontFamily: fontFamily.argentum_sans,
                          fontSize: fontSize.verbiage_20,
                          fontWeight: fontWeight[500],
                        }}>{`Exercise ${i + 1}`}</Text>
                      <TouchableOpacity onPress={() => onRemove(i)}>
                        <Image
                          source={require('../assets/images/delete.png')}
                          style={{
                            width: 50,
                            height: 50,
                            marginHorizontal: 3,
                          }}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                  <View style={{marginTop: 10}}>
                    <Text
                      style={{
                        fontFamily: fontFamily.argentum_sans,
                        fontSize: fontSize.verbiage_medium,
                        fontWeight: fontWeight[500],
                        marginVertical: 5,
                        color: theme.colors.greyText,
                      }}>
                      Exercise Type
                    </Text>
                    <DropDown
                      width={0.92 * screenWidth}
                      height={0.12 * screenWidth}
                      borderColor={theme.colors.greyText}
                      borderRadius={0.12 * screenWidth}
                      icon={svgImages.caretDown}
                      title={'Choose Exercise'}
                      type={'Exercise'}
                      data={Commons.exercises}
                      selectedItem={item.type}
                      onPressItem={e => {
                        handleSelection(e, i, 'type');
                      }}
                      dropDownListStyle={{
                        maxHeight: 0.35 * screenWidth,
                        flexGrow: 0,
                      }}
                    />
                  </View>
                  <View style={{marginTop: 10}}>
                    <Text
                      style={{
                        fontFamily: fontFamily.argentum_sans,
                        fontSize: fontSize.verbiage_medium,
                        fontWeight: fontWeight[500],
                        marginVertical: 5,
                        color: theme.colors.greyText,
                      }}>
                      Exercise Duration
                    </Text>
                    <DropDown
                      width={0.92 * screenWidth}
                      height={0.12 * screenWidth}
                      borderColor={theme.colors.greyText}
                      borderRadius={0.12 * screenWidth}
                      icon={svgImages.caretDown}
                      title={'Choose Duration'}
                      type={'Duration'}
                      data={Commons.durations}
                      selectedItem={item.duration}
                      onPressItem={e => {
                        handleSelection(e, i, 'duration');
                      }}
                      dropDownListStyle={{
                        maxHeight: 0.35 * screenWidth,
                        flexGrow: 0,
                      }}
                    />
                  </View>
                  <View style={{marginTop: 10}}>
                    <TextField
                      inputWidth={0.92 * screenWidth}
                      height={0.12 * screenWidth}
                      borderColor={theme.colors.greyText}
                      borderRadius={0.4 * screenWidth}
                      value={item.workoutName}
                      onChangeText={e => {
                        handleSelection(e, i, 'name');
                      }}
                      title={'Workout Name'}
                      placeholder={'Workout Name'}
                      paddingHorizontal={10}
                      type={'text'}
                    />
                  </View>
                </View>
              ))}
              <View style={{marginTop: 10}}>
                <TouchableOpacity
                  onPress={addNew}
                  style={{
                    width: 0.92 * screenWidth,
                    height: 0.12 * screenWidth,
                    borderColor: theme.colors.greyText,
                    borderRadius: 0.4 * screenWidth,
                    borderWidth: 2,
                    marginVertical: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    backgroundColor: theme.colors.black,
                  }}>
                  <SvgXml width="22" height="22" xml={svgImages.plus2} />
                  <Text
                    style={{
                      fontFamily: fontFamily.argentum_sans,
                      fontSize: fontSize.verbiage_large,
                      color: 'white',
                      fontWeight: fontWeight[500],
                      marginHorizontal: 5,
                    }}>
                    ADD NEW EXERCISE
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{marginTop: 10, marginBottom: 100}}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontFamily: fontFamily.argentum_sans,
                      fontSize: fontSize.verbiage_large,
                      fontWeight: '500',
                      marginVertical: 5,
                      color: theme.colors.black,
                    }}>
                    Upload Workout Thumbnail
                  </Text>
                </View>
                <ImageBackground
                  style={{
                    height: 0.4 * screenWidth,
                    borderWidth: 1,
                    borderColor: theme.colors.greyText,
                    borderRadius: 15,
                    marginTop: 5,
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    backgroundColor: theme.colors.white,
                  }}
                  imageStyle={{
                    borderRadius: 15,
                  }}
                  source={{uri: selectedImage.uri}}>
                  <View style={{height: 50}}>
                    <SvgXml width="90" height="90" xml={svgImages.smiley} />
                  </View>
                  <Button
                    title={'ADD'}
                    iconHeight={16}
                    iconWidth={16}
                    icon={svgImages.plus}
                    onPress={() => {
                      pickImages();
                    }}
                    btnWidth={screenWidth * 0.25}
                    btnHeight={40}
                    titleColor={theme.colors.white}
                    backgroundColor={theme.colors.secondaryBlack}
                  />
                </ImageBackground>
              </View>
            </View>
          </ScrollView>
          <View style={{width: screenWidth, alignItems: 'center'}}>
            <Button
              title={'CREATE CUSTOM WORKOUT'}
              onPress={() => {
                validateData();
              }}
              btnWidth={screenWidth * 0.92}
              btnHeight={0.14 * screenWidth}
              titleColor={theme.colors.white}
              backgroundColor={theme.colors.primary}
              btnStyle={{
                position: 'absolute',
                bottom: 25,
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
              Custom Workout Created
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
              Your have successfully created workout!
            </Text>
            <View style={{marginVertical: 5}}>
              <Button
                title={'SHARE WITH YOUR FRIENDS'}
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

export default CustomWorkout;

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
});
