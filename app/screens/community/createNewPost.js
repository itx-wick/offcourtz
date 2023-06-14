import React, {useState} from 'react';
import {
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {View, Text} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useToast} from 'react-native-toast-notifications';
import AWS from 'aws-sdk';
import fs from 'react-native-fs';
import {decode} from 'base64-arraybuffer';
import {theme} from '../../theme';
import {
  fontFamily,
  fontSize,
  fontWeight,
} from '../../constants/fontDecorations';
import Modal from 'react-native-modal';
import DropDown from '../../components/dropDownView';
import {screenWidth} from '../../constants';
import {svgImages} from '../../helpers';
import {END_POINTS, screens} from '../../config';
import {SvgXml} from 'react-native-svg';
import Button from '../../components/button';
import {Commons} from '../../utils';
import ApiService from '../../services/ApiService';
import {setLoader} from '../../redux/reducers/commonSlice';
import {TextInput} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';

function CreateNewPost({navigation}) {
  const toast = useToast();
  const dispatch = useDispatch();
  const authToken = useSelector(state => state.Auth.token);
  const [caption, setCaption] = React.useState('');
  const [captionFocus, setCaptionFocus] = React.useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [postTo, setPostTo] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [selectedImage, setSelectedImage] = useState({});

  React.useEffect(() => {
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
    if (type === 'Caption') {
      setCaption(value);
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
    Keyboard.dismiss();
    if (Object.keys(selectedImage).length === 0) {
      showToast('normal', 'Image Required', 3000);
    } else if (Object.keys(selectedItem).length === 0) {
      showToast('normal', 'Post To Required', 3000);
    } else if (caption == '' || caption.length < 6) {
      showToast('normal', fieldError('caption'), 3000);
    } else {
      process();
    }
  };

  const fieldError = inputType => {
    if (inputType == 'caption') {
      if (caption === '') {
        return 'Caption Required';
      } else if (caption.length < 6) return 'Caption Too Short';
    }
  };

  function handleSelection(e) {
    setSelectedItem(e);
    setPostTo(e.title === 'Global' ? true : false);
  }

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
            caption: caption,
            isGlobal: postTo,
            image: data.Location,
          };
          console.log('Auth Token', authToken);
          await ApiService.post(END_POINTS.createPost, body, authToken)
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
          <Text style={styles.headerTitle}>Create New Post</Text>
        </View>
        <View style={styles.underlineView} />
      </View>
      {!modalVisible && (
        <ScrollView>
          <View style={styles.secondaryCont}>
            <View style={{marginTop: 15}}>
              <ImageBackground
                style={{
                  height: 0.45 * screenWidth,
                  borderWidth: 2,
                  borderColor: theme.colors.gray1,
                  backgroundColor: theme.colors.white,
                  borderRadius: 15,
                  marginTop: 5,
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                }}
                imageStyle={{
                  borderRadius: 15,
                }}
                source={{uri: selectedImage.uri}}>
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
            <View style={{marginTop: 10}}>
              <Text
                style={{
                  fontFamily: fontFamily.argentum_sans,
                  fontSize: fontSize.verbiage_medium,
                  fontWeight: fontWeight[300],
                  marginVertical: 5,
                  color: theme.colors.greyText,
                }}>
                Post To
              </Text>
              <DropDown
                width={0.92 * screenWidth}
                height={0.12 * screenWidth}
                borderWidth={2}
                borderColor={theme.colors.gray1}
                borderRadius={0.12 * screenWidth}
                icon={svgImages.caretDown}
                title={'Choose '}
                type={'Post'}
                data={Commons.communityFilter}
                selectedItem={selectedItem.title}
                onPressItem={handleSelection}
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
                  fontWeight: fontWeight[300],
                  marginVertical: 5,
                  color: theme.colors.greyText,
                }}>
                Caption
              </Text>
              <TextInput
                style={{
                  width: 0.92 * screenWidth,
                  height: 0.25 * screenWidth,
                  borderWidth: 2,
                  borderColor: theme.colors.gray1,
                  borderRadius: 15,
                  fontFamily: fontFamily.argentum_sans,
                  fontSize: fontSize.verbiage,
                  color: theme.colors.black,
                  fontWeight: fontWeight[400],
                  paddingTop: 15,
                  paddingHorizontal: 15,
                  backgroundColor: theme.colors.white,
                  textAlignVertical: 'top',
                }}
                multiline
                placeholderTextColor={theme.colors.greyText}
                placeholder="Write a caption..."
                onChangeText={e => {
                  handleChange('Caption', e);
                }}
                onEndEditing={() => setCaptionFocus(false)}
                onFocus={() => setCaptionFocus(true)}
                value={caption}
              />
            </View>
            <View
              style={{
                width: 0.92 * screenWidth,
                alignItems: 'center',
                marginTop: 15,
              }}>
              <Button
                title={'CREATE POST'}
                onPress={() => {
                  validateData();
                }}
                btnWidth={screenWidth * 0.92}
                btnHeight={0.14 * screenWidth}
                titleColor={theme.colors.white}
                backgroundColor={theme.colors.primary}
              />
            </View>
          </View>
        </ScrollView>
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
              Post Created
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
              Your have successfully created the post!
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

export default CreateNewPost;

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
