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
import {screenHeight, screenWidth} from '../../constants';
import Button from '../../components/button';

import {theme} from '../../theme';
const {colors} = theme;
import {
  fontFamily,
  fontSize,
  fontWeight,
} from '../../constants/fontDecorations';
import {screens} from '../../config';

const Welcome = ({navigation}) => {
  return (
    <ImageBackground
      source={require('../../assets/images/splash_bg.png')}
      style={{width: screenWidth, height: screenHeight}}>
      <SafeAreaView>
        <View style={styles.mainContainer}>
          <View style={styles.container}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.img}
              resizeMode={'contain'}
            />
          </View>
          <View style={styles.btnContainer}>
            <View style={styles.btn}>
              <Button
                title={'GET STARTED'}
                onPress={() => navigation.navigate(screens.getStarted)}
              />
            </View>
            <View style={styles.btn}>
              <Button
                title={'LOGIN'}
                backgroundColor={colors.secondaryBlack}
                onPress={() => {}}
              />
            </View>
            <Text style={[styles.text]}>
              By clicking "Get Started" you agree to our
            </Text>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <TouchableOpacity onPress={() => {}}>
                <Text style={styles.policyText}>Privacy Policy</Text>
              </TouchableOpacity>
              <Text style={styles.policyText}>{' |  '}</Text>
              <TouchableOpacity onPress={() => {}}>
                <Text style={styles.policyText}> Terms of Use</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  img: {
    position: 'absolute',
    alignSelf: 'center',
    top: 175,
    height: undefined,
    aspectRatio: 1,
    padding: 10,
  },
  btnContainer: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    bottom: 0,
    marginVertical: 5,
  },
  btn: {
    margin: 2,
  },
  text: {
    textAlign: 'center',
    marginTop: 10,
    color: colors.greyText,
    fontFamily: fontFamily.argentum_sans,
    fontWeight: fontWeight[400],
    fontSize: fontSize.verbiage,
  },
  policyText: {
    textAlign: 'center',
    marginVertical: 10,
    color: colors.white,
    fontFamily: fontFamily.argentum_sans,
    fontWeight: fontWeight[400],
    fontSize: fontSize.verbiage,
  },
});
