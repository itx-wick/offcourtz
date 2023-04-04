import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SvgXml} from 'react-native-svg';

import {svgImages} from '../../../helpers';
import {theme} from '../../../theme';
import Button from '../../../components/button';
import {screenHeight, screenWidth} from '../../../constants';
import {
  fontFamily,
  fontSize,
  fontWeight,
} from '../../../constants/fontDecorations';
import {screens} from '../../../config';
import TextField from '../../../components/textField';
const {colors} = theme;

const ForgotPassword = ({navigation}) => {
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
              title={'Email'}
              placeholder={'name@example.com'}
              paddingHorizontal={10}
              type={'text'}
            />
          </View>
          <View style={{marginTop: 15}}>
            <Button
              title={'RESET PASSWORD'}
              onPress={() => {}}
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
    marginTop: 0.12 * screenWidth,
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
    marginVertical: 15,
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
