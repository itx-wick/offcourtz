import React from 'react';
import {
  ImageBackground,
  Platform,
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
import DropDown from '../../../components/dropDownView';
import {countries} from '../../../utils/utils';
import {Commons} from '../../../utils';
const {colors} = theme;

const Signup = ({navigation}) => {
  const [selectedItem, setSelectedItem] = React.useState({});
  function handleSelection(e) {
    setSelectedItem(e);
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
            <TextField
              inputWidth={0.45 * screenWidth}
              height={0.12 * screenWidth}
              borderColor={theme.colors.greyText}
              borderRadius={0.4 * screenWidth}
              onChangeText={e => {
                console.log(e);
              }}
              title={'First Name'}
              placeholder={'John'}
              paddingHorizontal={10}
              type={'text'}
            />
            <TextField
              inputWidth={0.45 * screenWidth}
              height={0.12 * screenWidth}
              borderColor={theme.colors.greyText}
              borderRadius={0.4 * screenWidth}
              onChangeText={e => {
                console.log(e);
              }}
              title={'Last Name'}
              placeholder={'Doe'}
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
              onChangeText={e => {
                console.log(e);
              }}
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
              icon={svgImages.calendarBlank}
              onChangeText={e => {
                console.log(e);
              }}
              title={'Date of Birth'}
              placeholder={'01/07/1990'}
              paddingHorizontal={10}
              editable={false}
              type={'text'}
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
              Counrty
            </Text>
            <DropDown
              width={0.92 * screenWidth}
              // height={0.12 * screenWidth}
              // borderWidth={1}
              borderColor={theme.colors.greyText}
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
          <View style={{marginTop: 10}}>
            <TextField
              inputWidth={0.92 * screenWidth}
              height={0.12 * screenWidth}
              borderColor={theme.colors.greyText}
              borderRadius={0.4 * screenWidth}
              onChangeText={e => {
                console.log(e);
              }}
              icon={svgImages.eye}
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
              marginBottom: Platform.OS === 'ios' ? 100 : 75,
            }}>
            <View style={{flexDirection: 'row'}}>
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
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{height: 50}}>
                <SvgXml width="60" height="60" xml={svgImages.smiley} />
              </View>
              <Button
                title={'ADD'}
                iconHeight={16}
                iconWidth={16}
                icon={svgImages.plus}
                onPress={() => navigation.navigate(screens.login)}
                btnWidth={screenWidth * 0.25}
                btnHeight={40}
                titleColor={colors.white}
                backgroundColor={colors.secondaryBlack}
              />
            </ImageBackground>
          </View>
        </View>
      </ScrollView>
      <View style={{width: screenWidth, alignItems: 'center'}}>
        <Button
          title={'CREATE ACCOUNT'}
          onPress={() => navigation.navigate(screens.trial)}
          btnWidth={screenWidth * 0.92}
          btnHeight={0.14 * screenWidth}
          titleColor={colors.white}
          backgroundColor={colors.primary}
          btnStyle={{
            position: 'absolute',
            bottom: Platform.OS === 'ios' ? 25 : 15,
          }}
        />
      </View>
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
