import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {useToast} from 'react-native-toast-notifications';

import {svgImages} from '../../../helpers';
import {theme} from '../../../theme';
import Button from '../../../components/button';
import {screenHeight, screenWidth} from '../../../constants';
import {
  fontFamily,
  fontSize,
  fontWeight,
} from '../../../constants/fontDecorations';
import ApiService from '../../../services/ApiService';

import {END_POINTS, screens} from '../../../config';
import TextField from '../../../components/textField';
import {useDispatch, useSelector} from 'react-redux';
import {setLoader} from '../../../redux/reducers/commonSlice';
const {colors} = theme;

const ForgotPassword = ({navigation}) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState('');
  const [emailFocus, setEmailFocus] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [pwdFocus, setPwdFocus] = React.useState(false);
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const handleChange = (type, value) => {
    if (type === 'Email') {
      setEmail(value);
    } else if (type === 'Password') {
      setPassword(value);
    }
  };

  const updateShowHidePassword = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const validateData = () => {
    Keyboard.dismiss();
    if (
      email == '' ||
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    ) {
      showToast('normal', fieldError('userEmail'), 3000);
    } else if (password == '' || password.length < 6) {
      showToast('normal', fieldError('password'), 3000);
    } else {
      process();
    }
  };

  const fieldError = inputType => {
    if (inputType == 'userEmail') {
      if (email === '') {
        return 'Email Required';
      } else if (
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) == false
      ) {
        return 'Enter Valid Email';
      }
    } else if (inputType == 'password') {
      if (password === '') {
        return 'Password Required';
      } else if (password.length < 6) {
        return 'Password too short';
      }
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
      let body = {
        email: email,
        password: password,
      };
      console.log('Body', body);
      dispatch(setLoader(true));
      await ApiService.post(END_POINTS.forgotPassword, body)
        .then(res => {
          dispatch(setLoader(false));
          setEmail('');
          setPassword('');
          showToast('success', res.message, 3000);
        })
        .catch(err => {
          dispatch(setLoader(false));
          showToast('normal', err, 3000);
          console.log('promise error', err);
        });
    } catch (error) {
      showToast('normal', error, 3000);
      console.log('try/catch', error);
    }
  };

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
      <ScrollView>
        <View style={styles.secondaryCont}>
          <Text style={styles.titleText}>PASSWORD</Text>
          <Text style={styles.subTitleText}>Reset your password</Text>
          <View style={{marginTop: 25}}>
            <TextField
              inputWidth={0.92 * screenWidth}
              height={0.12 * screenWidth}
              borderColor={theme.colors.greyText}
              borderRadius={0.4 * screenWidth}
              onChangeText={e => {
                handleChange('Email', e);
              }}
              value={email}
              onEndEditing={() => setEmailFocus(false)}
              onFocus={() => setEmailFocus(true)}
              title={'Email'}
              placeholder={'name@example.com'}
              paddingHorizontal={10}
              type={'text'}
            />
          </View>

          <View style={{marginTop: 10}}>
            <TextField
              inputWidth={0.92 * screenWidth}
              height={0.12 * screenWidth}
              borderColor={theme.colors.greyText}
              borderRadius={0.4 * screenWidth}
              showHidePassIcon={true}
              secureTextEntry={secureTextEntry}
              updateShowHidePassword={updateShowHidePassword}
              onChangeText={e => {
                handleChange('Password', e);
              }}
              value={password}
              onEndEditing={() => setPwdFocus(false)}
              onFocus={() => setPwdFocus(true)}
              title={'New Password'}
              placeholder={'Password'}
              showPassword={false}
              paddingHorizontal={10}
              type={'password'}
            />
          </View>
          <View style={{marginTop: 15}}>
            <Button
              title={'RESET PASSWORD'}
              onPress={() => validateData()}
              btnWidth={screenWidth * 0.92}
              btnHeight={0.14 * screenWidth}
              titleColor={colors.white}
              backgroundColor={colors.primary}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ForgotPassword;

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
  forgotPasswordText: {
    marginVertical: 15,
    fontFamily: fontFamily.argentum_sans,
    fontSize: fontSize.verbiage_medium,
    fontWeight: fontWeight[500],
    color: colors.secondaryBlack,
    textAlign: 'right',
    paddingHorizontal: 10,
  },
});
