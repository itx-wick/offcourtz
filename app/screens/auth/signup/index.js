import React from 'react';
import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import { useToast } from "react-native-toast-notifications";



import { svgImages } from '../../../helpers';
import { theme } from '../../../theme';
import Button from '../../../components/button';
import { screenHeight, screenWidth } from '../../../constants';
import { register } from '../../../redux/reducers/authSlice';
import { setLoader } from '../../../redux/reducers/commonSlice';
import {
  fontFamily,
  fontSize,
  fontWeight,
} from '../../../constants/fontDecorations';
import { END_POINTS, screens } from '../../../config';
import TextField from '../../../components/textField';
import DropDown from '../../../components/dropDownView';
import ApiService from '../../../services/ApiService';
import Commons from '../../../utils/Commons';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../components/loader';

const { colors } = theme;

const Signup = ({ navigation }) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.Auth);
  const isLoader = useSelector(state => state.Common.loader);
  const [firstName, setFirstName] = React.useState('');
  const [fnFocus, setFNFocus] = React.useState(false);
  const [fnError, setFNError] = React.useState(false);
  const [lastName, setLastName] = React.useState('');
  const [lnFocus, setLNFocus] = React.useState(false);
  const [lnError, setLNError] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [emailFocus, setEmailFocus] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [country, setCountry] = React.useState('');
  const [countryError, setCountryError] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [pwdFocus, setPwdFocus] = React.useState(false);
  const [pwdError, setPwdError] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState({});
  const [dateOfBirth, setDateOfBirth] = React.useState('');
  const [dobError, setDOBError] = React.useState(false);
  const [isDatePickerVisible, setDatePickerVisible] = React.useState(false);
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState({});

  React.useEffect(() => {
    dispatch(setLoader(false))
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
    if (type === 'FirstName') {
      setFirstName(value);
    } else if (type === 'LastName') {
      setLastName(value);
    } else if (type === 'Email') {
      setEmail(value);
    } else if (type === 'Password') {
      setPassword(value);
    }
  };

  function handleSelection(e) {
    setSelectedItem(e);
    setCountry(e.title);
    setCountryError(false);
  }

  const updateShowHidePassword = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const pickADate = (date, check) => {
    let tempDate = new Date(date);
    let year = tempDate.getFullYear();
    let month = ('0' + (tempDate.getMonth() + 1)).slice(-2);
    let day =
      tempDate.getDate() < 10 ? '0' + tempDate.getDate() : tempDate.getDate();
    let fDate = `${day}/${month}/${year}`;
    setDateOfBirth(fDate);
    setDOBError(false);
    hideDatePicker();
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
    if (firstName.length >= 4) {
      setFNError(false);
    } else {
      setFNError(true);
    }
    if (lastName.length >= 4) {
      setLNError(false);
    } else {
      setLNError(true);
    }
    if (password.length >= 6) {
      setPwdError(false);
    } else {
      setPwdError(true);
    }
    if (dateOfBirth !== '') {
      setDOBError(false);
    } else {
      setDOBError(true);
    }
    if (country !== '') {
      setCountryError(false);
    } else {
      setCountryError(true);
    }
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
    if (firstName && lastName && email && dateOfBirth && country && password) {
      process()
    }
  };

  const fieldError = inputType => {
    if (inputType == 'firstName') {
      if (firstName === '') {
        return 'Required*';
      } else if (firstName.length < 4) return 'First Name Too Short';
    } else if (inputType == 'lastName') {
      if (lastName === '') {
        return 'Required*';
      } else if (lastName.length < 4) return 'Last Name Too Short';
    } else if (inputType == 'userEmail') {
      if (email === '') {
        return 'Required*';
      } else if (
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) == false
      ) {
        return 'Enter Valid Email';
      }
    } else if (inputType == 'password') {
      if (password.length < 6) {
        return 'Password too short';
      }
    }
  };

  const onBlur = onBlurInputType => {
    if (onBlurInputType === 'FirstName') {
      if (firstName) {
        console.log('FirstName', firstName);
        if (firstName.length >= 4) {
          setFNError(false);
        } else {
          setFNError(true);
        }
      }
    } else if (onBlurInputType === 'LastName') {
      if (lastName) {
        if (lastName.length >= 4) {
          setLNError(false);
        } else {
          setLNError(true);
        }
      }
    } else if (onBlurInputType === 'Password') {
      if (password) {
        if (password.length >= 6) {
          setPwdError(false);
        } else {
          setPwdError(true);
        }
      }
    } else if (onBlurInputType === 'Email') {
      if (email) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
          setEmailError(false);
        } else {
          setEmailError(true);
        }
      }
    }
  };

  const showToast = (type, msg, duration) => {
    toast.show(msg, {
      type: type,
      placement: "bottom",
      duration: duration,
      offset: 30,
      animationType: "zoom-in",
    })
  }

  const process = async () => {
    try {
      let body = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        dob: dateOfBirth,
        country: country,
        password: password,
        avatar: ''
      };
      dispatch(setLoader(true))
      await ApiService.post(END_POINTS.register, body)
        .then(res => {
          dispatch(register(res))
          dispatch(setLoader(false))
          Commons.reset(navigation, screens.trial)
        })
        .catch(err => {
          dispatch(setLoader(false))
          showToast("normal", err, 3000);
          console.log("promise error", err);
        });
    } catch (error) {
      showToast("normal", error, 3000);
      console.log("try/catch", error);
    }
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerMainContainer}>
        <View style={styles.headContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <SvgXml width="36" height="36 " xml={svgImages.back} />
          </TouchableOpacity>
          <Button
            title={'LOGIN'}
            onPress={() => navigation.navigate(screens.login)}
            btnWidth={screenWidth * 0.25}
            btnHeight={40}
            titleColor={colors.black}
            backgroundColor={colors.white}
          />
        </View>
        <View style={styles.underlineView} />
      </View>
      <KeyboardAvoidingView
        // keyboardVerticalOffset={
        //   // Platform.OS === 'ios' ? 0.035 * screenHeight : null
        // }
        behavior={'padding'}>
        <ScrollView>
          <View style={styles.secondaryCont}>
            <Text style={styles.titleText}>SIGN UP</Text>
            <Text style={styles.subTitleText}>Register your account</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 25,
              }}>
              <View>
                <TextField
                  onBlur={() => onBlur('FirstName')}
                  inputWidth={0.45 * screenWidth}
                  height={0.12 * screenWidth}
                  borderColor={
                    fnError ? theme.colors.error : theme.colors.greyText
                  }
                  borderRadius={0.4 * screenWidth}
                  onChangeText={e => {
                    handleChange('FirstName', e);
                  }}
                  onEndEditing={() => setFNFocus(false)}
                  onFocus={() => setFNFocus(true)}
                  value={firstName}
                  title={'First Name'}
                  placeholder={'John'}
                  paddingHorizontal={10}
                  type={'text'}
                />
              </View>
              <TextField
                inputWidth={0.45 * screenWidth}
                height={0.12 * screenWidth}
                borderColor={
                  lnError ? theme.colors.error : theme.colors.greyText
                }
                borderRadius={0.4 * screenWidth}
                onChangeText={e => {
                  handleChange('LastName', e);
                }}
                value={lastName}
                onBlur={() => onBlur('LastName')}
                onEndEditing={() => setLNFocus(false)}
                onFocus={() => setLNFocus(true)}
                title={'Last Name'}
                placeholder={'Doe'}
                paddingHorizontal={10}
                type={'text'}
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <TextField
                inputWidth={0.92 * screenWidth}
                height={0.12 * screenWidth}
                borderColor={
                  emailError ? theme.colors.error : theme.colors.greyText
                }
                borderRadius={0.4 * screenWidth}
                backgroundColor={theme.colors.white}
                onChangeText={e => {
                  handleChange('Email', e);
                }}
                value={email}
                onBlur={() => onBlur('Email')}
                onEndEditing={() => setEmailFocus(false)}
                onFocus={() => setEmailFocus(true)}
                title={'Email'}
                placeholder={'name@example.com'}
                paddingHorizontal={10}
                type={'text'}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                showDatePicker();
              }}
              style={{ marginTop: 10 }}>
              <TextField
                inputWidth={0.92 * screenWidth}
                height={0.12 * screenWidth}
                borderColor={
                  dobError ? theme.colors.error : theme.colors.greyText
                }
                borderRadius={0.4 * screenWidth}
                icon={svgImages.calendarBlank}
                value={dateOfBirth}
                title={'Date of Birth'}
                placeholder={'01/07/1990'}
                paddingHorizontal={10}
                editable={false}
                type={'text'}
              />
            </TouchableOpacity>
            <View style={{ marginTop: 10 }}>
              <Text
                style={{
                  fontFamily: fontFamily.argentum_sans,
                  fontSize: fontSize.verbiage_medium,
                  fontWeight: fontWeight[500],
                  marginVertical: 5,
                  color: theme.colors.greyText,
                }}>
                Country
              </Text>
              <DropDown
                width={0.92 * screenWidth}
                // height={0.12 * screenWidth}
                // borderWidth={1}
                borderColor={
                  countryError ? theme.colors.error : theme.colors.greyText
                }
                borderRadius={0.12 * screenWidth}
                icon={svgImages.caretDown}
                title={'Select Country'}
                type={'Country'}
                data={Commons.countries}
                selectedItem={selectedItem.title}
                onPressItem={handleSelection}
                dropDownListStyle={{
                  height: 0.35 * screenWidth,
                }}
                flatListView={{
                  height: 0.35 * screenWidth,
                }}
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <TextField
                inputWidth={0.92 * screenWidth}
                height={0.12 * screenWidth}
                borderColor={
                  pwdError ? theme.colors.error : theme.colors.greyText
                }
                borderRadius={0.4 * screenWidth}
                onChangeText={e => {
                  handleChange('Password', e);
                }}
                value={password}
                onBlur={() => onBlur('Password')}
                onEndEditing={() => setPwdFocus(false)}
                onFocus={() => setPwdFocus(true)}
                showHidePassIcon={true}
                secureTextEntry={secureTextEntry}
                updateShowHidePassword={updateShowHidePassword}
                title={'Password'}
                placeholder={'Password'}
                showPassword={false}
                paddingHorizontal={10}
                type={'password'}
              />
            </View>
            <View
              style={{
                marginTop: 15,
              }}>
              <View style={{ flexDirection: 'row' }}>
                <Text
                  style={{
                    fontFamily: fontFamily.argentum_sans,
                    fontSize: fontSize.verbiage_large,
                    fontWeight: '500',
                    marginVertical: 5,
                    color: theme.colors.black,
                  }}>
                  Profile Photo
                </Text>
                <Text
                  style={{
                    fontFamily: fontFamily.argentum_sans,
                    fontSize: fontSize.verbiage,
                    fontWeight: '300',
                    marginTop: 6,
                    marginHorizontal: 3,
                    color: theme.colors.black,
                  }}>
                  {'(Optional)'}
                </Text>
              </View>
              <ImageBackground
                style={{
                  height: 0.4 * screenWidth,
                  borderWidth: 1,
                  borderColor: colors.greyText,
                  borderRadius: 15,
                  marginTop: 5,
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  backgroundColor: theme.colors.white,
                }}
                imageStyle={{
                  borderRadius: 15,
                }}
                source={{ uri: selectedImage.uri }}>
                <View style={{ height: 50 }}>
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
                  titleColor={colors.white}
                  backgroundColor={colors.secondaryBlack}
                />
              </ImageBackground>
            </View>
            <View style={{ marginBottom: 0.05 * screenWidth }}>
              <Button
                title={'CREATE ACCOUNT'}
                onPress={() => validateData()}
                btnWidth={screenWidth * 0.92}
                btnHeight={0.14 * screenWidth}
                titleColor={colors.white}
                backgroundColor={colors.primary}
                btnStyle={{
                  marginVertical: 15
                }}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={data => pickADate(data)}
        onCancel={hideDatePicker}
      />
      {isLoader ? <Loader /> : null}
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.whisper,
  },
  headerMainContainer: {
    width: screenWidth,
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 0.12 * screenWidth : 0.04 * screenWidth,
  },
  headContainer: {
    flexDirection: 'row',
    marginTop: 0.01 * screenHeight,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: screenWidth,
    paddingHorizontal: 15,
  },
  underlineView: {
    width: screenWidth * 0.9,
    height: 2.5,
    backgroundColor: colors.white,
    marginVertical: 10,
  },
  secondaryCont: {
    width: '100%',
    paddingHorizontal: 15,
  },
  titleText: {
    fontFamily: fontFamily.argentum_sans,
    fontWeight: 'bold',
    fontSize: fontSize.screen_title,
    color: colors.white,
  },
  subTitleText: {
    fontFamily: fontFamily.argentum_sans,
    fontSize: fontSize.verbiage_medium,
    color: colors.greyText,
    marginLeft: 2,
  },
  containerStyle: {
    backgroundColor: colors.transparent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countryInputCont: {
    borderRadius: 0.12 * screenWidth,
    borderWidth: 1,
    borderColor: theme.colors.greyText,
    paddingHorizontal: 10,
  },
  mycountryNameStyle: {
    width: 0.87 * screenWidth,
    fontFamily: fontFamily.argentum_sans,
    fontSize: fontSize.verbiage_medium,
    height: 0.12 * screenWidth,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.transparent,
    padding: 5,
  },
  myDropdownContainerStyle: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.greyText,
    marginTop: 2,
  },
  myDropdownCountryTextStyle: {
    fontFamily: fontFamily.argentum_sans,
    fontSize: fontSize.verbiage_medium,
    padding: 12,
  },
  myDropdownRowStyle: {
    borderWidth: 1,
    borderColor: colors.gray1,
  },
});
