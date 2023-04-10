import React, { useState, useEffect, useReducer } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList
} from 'react-native';
import { Chip } from 'react-native-elements';
import { SvgXml } from 'react-native-svg';
import SelectableChips from 'react-native-chip/SelectableChips'

import { svgImages } from '../../helpers';
import { theme } from '../../theme';
import Button from '../../components/button';
import { screenWidth } from '../../constants';
import {
  fontFamily,
  fontSize,
  fontWeight,
} from '../../constants/fontDecorations';
const { colors } = theme;

const CreateChallenge = ({ route, navigation }) => {
  const [currentStep, setCurrentStep] = useState(0);
  // const [state, dispatch] = useReducer(reducer, initialState)

  const data = [
    { key: '1', label: 'Chip 1' },
    { key: '2', label: 'Chip 2' },
    { key: '3', label: 'Chip 3' },
    { key: '4', label: 'Chip 4' },
    { key: '5', label: 'Chip 5' },
    { key: '6', label: 'Chip 6' },
    { key: '7', label: 'Chip 7' },
    { key: '8', label: 'Chip 8' },
    { key: '9', label: 'Chip 9' },
  ];

  const ChipsList = () => {
    return (
      <FlatList
        data={data}
        numColumns={3}
        renderItem={({ item }) => (
          <Chip
            title={item.label}
            containerStyle={styles.chipContainer}
          />
        )}
        keyExtractor={item => item.key}
        contentContainerStyle={styles.contentContainer}
      />
    );
  };

  useEffect(() => {
    setCurrentStep(0)
  }, [])

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerMainContainer}>
        <View style={styles.headContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ position: 'absolute', left: 15 }}>
            <SvgXml width="36" height="36 " xml={svgImages.back} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Challenge</Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ width: screenWidth, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 0.06 * screenWidth }}>
          <View
            style={{
              width: 0.12 * screenWidth,
              height: 0.12 * screenWidth,
              borderRadius: 0.12 * screenWidth,
              borderWidth: 2,
              borderColor: currentStep >= 0 ? theme.colors.primary : theme.colors.gray1,
              backgroundColor: currentStep > 0 ? theme.colors.primary : theme.colors.white,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <SvgXml xml={currentStep > 0 ? svgImages.check : svgImages.baloonStep} />
          </View>
          <View
            style={{
              width: 0.04 * screenWidth,
              height: 3,
              backgroundColor: currentStep > 0 ? theme.colors.primary : theme.colors.white,
            }} />
          <View
            style={{
              width: 0.12 * screenWidth,
              height: 0.12 * screenWidth,
              borderRadius: 0.12 * screenWidth,
              borderWidth: 2,
              borderColor: currentStep >= 1 ? theme.colors.primary : theme.colors.gray1,
              backgroundColor: currentStep > 1 ? theme.colors.primary : theme.colors.white,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <SvgXml xml={currentStep > 1 ? svgImages.check : svgImages.tenisBallStep} />
          </View>
          <View
            style={{
              width: 0.04 * screenWidth,
              height: 3,
              backgroundColor: currentStep > 1 ? theme.colors.primary : theme.colors.white,
            }} />
          <View
            style={{
              width: 0.12 * screenWidth,
              height: 0.12 * screenWidth,
              borderRadius: 0.12 * screenWidth,
              borderWidth: 2,
              borderColor: currentStep >= 2 ? theme.colors.primary : theme.colors.gray1,
              backgroundColor: currentStep > 2 ? theme.colors.primary : theme.colors.white,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <SvgXml xml={currentStep > 2 ? svgImages.check : svgImages.lightningStep} />
          </View>
          <View
            style={{
              width: 0.04 * screenWidth,
              height: 3,
              backgroundColor: currentStep > 2 ? theme.colors.primary : theme.colors.white,
            }} />
          <View
            style={{
              width: 0.12 * screenWidth,
              height: 0.12 * screenWidth,
              borderRadius: 0.12 * screenWidth,
              borderWidth: 2,
              borderColor: currentStep >= 3 ? theme.colors.primary : theme.colors.gray1,
              backgroundColor: currentStep > 3 ? theme.colors.primary : theme.colors.white,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <SvgXml xml={currentStep > 3 ? svgImages.check : svgImages.fireStep} />
          </View>
          <View
            style={{
              width: 0.04 * screenWidth,
              height: 3,
              backgroundColor: currentStep > 3 ? theme.colors.primary : theme.colors.white,
            }} />
          <View
            style={{
              width: 0.12 * screenWidth,
              height: 0.12 * screenWidth,
              borderRadius: 0.12 * screenWidth,
              borderWidth: 2,
              borderColor: currentStep >= 4 ? theme.colors.primary : theme.colors.gray1,
              backgroundColor: currentStep > 4 ? theme.colors.primary : theme.colors.white,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <SvgXml xml={currentStep > 4 ? svgImages.check : svgImages.userStep} />
          </View>
          <View
            style={{
              width: 0.04 * screenWidth,
              height: 3,
              backgroundColor: currentStep > 4 ? theme.colors.primary : theme.colors.white,
            }} />
          <View
            style={{
              width: 0.12 * screenWidth,
              height: 0.12 * screenWidth,
              borderRadius: 0.12 * screenWidth,
              borderWidth: 2,
              borderColor: currentStep >= 5 ? theme.colors.primary : theme.colors.gray1,
              backgroundColor: currentStep > 5 ? theme.colors.primary : theme.colors.white,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <SvgXml xml={currentStep > 5 ? svgImages.check : svgImages.clockStep} />
          </View>
        </View>
        {
          currentStep == 0 && <View style={{ width: screenWidth, alignItems: 'center' }}>

          </View>
        }
      </View>
      <View style={{ width: screenWidth, alignItems: 'center' }}>
        <Button
          title={currentStep == 5 ? 'CREATE CHALLENGE' : currentStep == 4 ? 'DONE' : 'NEXT'}
          onPress={() => {
            if (currentStep == 0) {
              setCurrentStep(currentStep + 1)
            } else if (currentStep == 5) {
              navigation.goBack()
            } else {
              setCurrentStep(currentStep + 1)
            }
          }}
          btnWidth={screenWidth * 0.9}
          btnHeight={0.13 * screenWidth}
          titleColor={colors.white}
          titleStyle={{
            fontFamily: fontFamily.argentum_sans,
            fontWeight: '500',
            fontSize: fontSize.verbiage_16,
            color: colors.white,
          }}
          backgroundColor={colors.primary}
          btnStyle={{
            position: 'absolute',
            bottom: 15,
          }}
        />
      </View>
    </View >
  );
};

export default CreateChallenge;

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
    height: 0.12 * screenWidth,
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth,
  },
  headerTitle: {
    fontFamily: fontFamily.argentum_sans,
    fontWeight: '500',
    fontSize: fontSize.verbiage_18,
    color: colors.secondaryBlack,
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
  stepContainer: {
    alignItems: 'center',
  },
  step: {
    backgroundColor: '#ffffff',
    borderColor: '#999999',
    borderWidth: 2,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentStep: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  finishedStep: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  stepLabel: {
    marginTop: 5,
    fontSize: 12,
    color: '#999999',
    textAlign: 'center',
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  chipContainer: {
    marginHorizontal: 8,
    marginVertical: 4,
  },
});
