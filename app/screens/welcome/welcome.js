import React from 'react';
import {
  View,
  ImageBackground,
  Image,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { screenHeight, screenWidth } from '../../constants';
import Button from '../../components/button';

import { theme } from '../../theme';
import {
  fontFamily,
  fontSize,
  fontWeight,
} from '../../constants/fontDecorations';
import { screens } from '../../config';
const { colors } = theme;

const Welcome = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../assets/images/splash_bg.png')}
      style={{ width: screenWidth, height: screenHeight }}>
      <SafeAreaView>
        <View
          style={{
            width: screenWidth,
            height: screenHeight,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logoImage}
          />
          <View
            style={styles.getStartedMainView}>
            <View
              style={styles.getStartedBtnView}>
              <Button title={'GET STARTED'} onPress={() => navigation.navigate(screens.getStarted)} />
            </View>
            <View
              style={styles.loginBtnView}>
              <Button
                title={'LOGIN'}
                backgroundColor={colors.secondaryBlack}
                onPress={() => { }}
              />
            </View>
            <Text style={[styles.text]}>
              By clicking "Get Started" you agree to our
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <TouchableOpacity onPress={() => { }}>
                <Text style={styles.policyText}>Privacy Policy</Text>
              </TouchableOpacity>
              <Text style={styles.policyText}>{' |  '}</Text>
              <TouchableOpacity onPress={() => { }}>
                <Text style={styles.policyText}> Terms of Use</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

export default Welcome;

const styles = StyleSheet.create({
  logoImage: {

    position: 'absolute',
    alignSelf: 'center',
    top: 0.34 * screenHeight,
  },
  getStartedMainView: {
    position: 'absolute',
    bottom: 0.08 * screenHeight,
    alignContent: 'center',
  },
  getStartedBtnView: {
    marginTop: 0.02 * screenHeight,
    alignItems: 'center',
  },
  loginBtnView: {
    marginTop: 0.015 * screenHeight,
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    paddingTop: 25,
    color: colors.greyText,
    fontFamily: fontFamily.argentum_sans,
    fontWeight: fontWeight[400],
    fontSize: fontSize.verbiage,
  },
  policyText: {
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    color: colors.white,
    fontFamily: fontFamily.argentum_sans,
    fontWeight: fontWeight[400],
    fontSize: fontSize.verbiage,
  },
});
