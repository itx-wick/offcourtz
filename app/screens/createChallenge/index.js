import React, {useState, useEffect, useMemo, useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, FlatList} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {Calendar} from 'react-native-calendars';

import {svgImages} from '../../helpers';
import {theme} from '../../theme';
import Button from '../../components/button';
import {screenHeight, screenWidth} from '../../constants';
import {
  fontFamily,
  fontSize,
  fontWeight,
} from '../../constants/fontDecorations';
import {Commons} from '../../utils';
import AppFlatlist from '../../components/appFlatlist';
import BottomSheetModalView from '../../components/bottomSheetModalView';
import {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
const {colors} = theme;

const CreateChallenge = ({route, navigation}) => {
  const bottomSheetModalRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(0);
  const snapPoints = useMemo(() => ['100%', '100%'], []);
  const [step1Data, setStep1Data] = useState(Commons.step1Data);
  const [step2Data, setStep2Data] = useState(Commons.step2Data);
  const [step3Data, setStep3Data] = useState(Commons.step3Data);
  const [step4Data, setStep4Data] = useState(Commons.step4Data);
  const [step5Data, setStep5Data] = useState(Commons.step5Data);
  const [selected, setSelected] = useState(new Date().toISOString());

  const backdropComponent = backdropProps => (
    <BottomSheetBackdrop {...backdropProps} enableTouchThrough={true} />
  );
  function dismissSheetModal() {
    bottomSheetModalRef.current?.dismiss();
  }

  useEffect(() => {
    setSelected(Commons.calculateDateFromObj(new Date()));
    setCurrentStep(4);
  }, []);

  const renderArrow = direction => {
    if (direction === 'left') {
      return <SvgXml xml={svgImages.prevIcon} />;
    } else {
      return <SvgXml xml={svgImages.nextIcon} />;
    }
  };

  const navigateBack = () => {
    if (currentStep === 0) {
      navigation.goBack();
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  const step1ListRenderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          step1Data[index].selected = !item.selected;
          setStep1Data([...step1Data]);
        }}
        style={[
          styles.chipView,
          {
            backgroundColor: item.selected
              ? theme.colors.black
              : theme.colors.white,
          },
        ]}>
        <Text
          style={[
            styles.chipText,
            {
              color: item.selected ? theme.colors.white : theme.colors.black,
            },
          ]}>
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  const step2ListRenderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          step2Data[index].selected = !item.selected;
          setStep2Data([...step2Data]);
        }}
        style={[
          styles.step2ChipView,
          {
            backgroundColor: `${item.bgColor}`,
            borderColor: item.selected
              ? theme.colors.primary
              : theme.colors.transparent,
          },
        ]}>
        <View>
          <Text style={styles.step2ChipTitle}>{`${item.title}`}</Text>
          {item.time && (
            <View style={styles.step2DescView}>
              <SvgXml xml={svgImages.clock} style={{marginRight: 5}} />
              <Text style={styles.step2Desc}>{`${item.time}`}</Text>
            </View>
          )}
        </View>
        {item.image}
      </TouchableOpacity>
    );
  };

  const step3ListRenderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          step3Data[index].selected = !item.selected;
          setStep3Data([...step3Data]);
        }}
        style={[
          styles.chipView,
          {
            backgroundColor: item.selected
              ? theme.colors.black
              : theme.colors.white,
          },
        ]}>
        <Text
          style={[
            styles.chipText,
            {
              color: item.selected ? theme.colors.white : theme.colors.black,
            },
          ]}>
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  const step4ListRenderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          step4Data[index].selected = !item.selected;
          setStep4Data([...step4Data]);
        }}
        style={[
          styles.chipView,
          {
            backgroundColor: item.selected
              ? theme.colors.black
              : theme.colors.white,
          },
        ]}>
        <Text
          style={[
            styles.chipText,
            {
              color: item.selected ? theme.colors.white : theme.colors.black,
            },
          ]}>
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  const step5ListRenderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          step5Data.map((itm, i) => {
            step5Data[i].selected = itm.key === step5Data[index].key;
          });
          setStep5Data([...step5Data]);
          if (item.label === 'Challenge Groups') {
            bottomSheetModalRef.current.present();
          } else if (item.label === 'Challenge Friends') {
          }
        }}
        style={styles.step5ListItem}>
        <Text style={styles.step5ListItemTitle}>{item.label}</Text>
        <SvgXml
          xml={item.selected ? svgImages.selectedRadioBtn : svgImages.radioBtn}
        />
      </TouchableOpacity>
    );
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
          <Text style={styles.headerTitle}>Create Challenge</Text>
        </View>
      </View>
      <View style={{flex: 1, alignItems: 'center'}}>
        <View
          style={{
            width: screenWidth,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 0.06 * screenWidth,
          }}>
          <View
            style={{
              width: 0.12 * screenWidth,
              height: 0.12 * screenWidth,
              borderRadius: 0.12 * screenWidth,
              borderWidth: 2,
              borderColor:
                currentStep >= 0 ? theme.colors.primary : theme.colors.gray1,
              backgroundColor:
                currentStep > 0 ? theme.colors.primary : theme.colors.white,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <SvgXml
              xml={currentStep > 0 ? svgImages.check : svgImages.baloonStep}
            />
          </View>
          <View
            style={{
              width: 0.04 * screenWidth,
              height: 3,
              backgroundColor:
                currentStep > 0 ? theme.colors.primary : theme.colors.white,
            }}
          />
          <View
            style={{
              width: 0.12 * screenWidth,
              height: 0.12 * screenWidth,
              borderRadius: 0.12 * screenWidth,
              borderWidth: 2,
              borderColor:
                currentStep >= 1 ? theme.colors.primary : theme.colors.gray1,
              backgroundColor:
                currentStep > 1 ? theme.colors.primary : theme.colors.white,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <SvgXml
              xml={currentStep > 1 ? svgImages.check : svgImages.tenisBallStep}
            />
          </View>
          <View
            style={{
              width: 0.04 * screenWidth,
              height: 3,
              backgroundColor:
                currentStep > 1 ? theme.colors.primary : theme.colors.white,
            }}
          />
          <View
            style={{
              width: 0.12 * screenWidth,
              height: 0.12 * screenWidth,
              borderRadius: 0.12 * screenWidth,
              borderWidth: 2,
              borderColor:
                currentStep >= 2 ? theme.colors.primary : theme.colors.gray1,
              backgroundColor:
                currentStep > 2 ? theme.colors.primary : theme.colors.white,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <SvgXml
              xml={currentStep > 2 ? svgImages.check : svgImages.lightningStep}
            />
          </View>
          <View
            style={{
              width: 0.04 * screenWidth,
              height: 3,
              backgroundColor:
                currentStep > 2 ? theme.colors.primary : theme.colors.white,
            }}
          />
          <View
            style={{
              width: 0.12 * screenWidth,
              height: 0.12 * screenWidth,
              borderRadius: 0.12 * screenWidth,
              borderWidth: 2,
              borderColor:
                currentStep >= 3 ? theme.colors.primary : theme.colors.gray1,
              backgroundColor:
                currentStep > 3 ? theme.colors.primary : theme.colors.white,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <SvgXml
              xml={currentStep > 3 ? svgImages.check : svgImages.fireStep}
            />
          </View>
          <View
            style={{
              width: 0.04 * screenWidth,
              height: 3,
              backgroundColor:
                currentStep > 3 ? theme.colors.primary : theme.colors.white,
            }}
          />
          <View
            style={{
              width: 0.12 * screenWidth,
              height: 0.12 * screenWidth,
              borderRadius: 0.12 * screenWidth,
              borderWidth: 2,
              borderColor:
                currentStep >= 4 ? theme.colors.primary : theme.colors.gray1,
              backgroundColor:
                currentStep > 4 ? theme.colors.primary : theme.colors.white,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <SvgXml
              xml={currentStep > 4 ? svgImages.check : svgImages.userStep}
            />
          </View>
          <View
            style={{
              width: 0.04 * screenWidth,
              height: 3,
              backgroundColor:
                currentStep > 4 ? theme.colors.primary : theme.colors.white,
            }}
          />
          <View
            style={{
              width: 0.12 * screenWidth,
              height: 0.12 * screenWidth,
              borderRadius: 0.12 * screenWidth,
              borderWidth: 2,
              borderColor:
                currentStep >= 5 ? theme.colors.primary : theme.colors.gray1,
              backgroundColor:
                currentStep > 5 ? theme.colors.primary : theme.colors.white,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <SvgXml
              xml={currentStep > 5 ? svgImages.check : svgImages.clockStep}
            />
          </View>
        </View>
        {currentStep === 0 && (
          <View style={styles.secContainer1}>
            <Text style={styles.sectionTitle}>
              {'How would you \n like to start'}
            </Text>
            <FlatList
              data={step1Data}
              numColumns={2}
              renderItem={step1ListRenderItem}
              keyExtractor={item => item.key}
              contentContainerStyle={styles.contentContainer}
            />
          </View>
        )}

        {currentStep === 1 && (
          <View
            style={{
              width: screenWidth,
            }}>
            <Text style={[styles.sectionTitle, {marginBottom: 15}]}>
              {'Which exercise would \n you like to compete in?'}
            </Text>
            <AppFlatlist
              data={step2Data}
              ListFooterComponent={<View />}
              height={screenHeight}
              renderItem={step2ListRenderItem}
            />
          </View>
        )}

        {currentStep === 2 && (
          <View style={styles.secContainer1}>
            <Text style={styles.sectionTitle}>{'What is the challenge?'}</Text>
            <FlatList
              data={step3Data}
              numColumns={2}
              renderItem={step3ListRenderItem}
              keyExtractor={item => item.key}
              contentContainerStyle={styles.contentContainer}
            />
          </View>
        )}

        {currentStep === 3 && (
          <View style={[styles.secContainer1]}>
            <Text style={styles.sectionTitle}>
              {'What are challenge \n specifications?'}
            </Text>
            <FlatList
              data={step4Data}
              numColumns={2}
              renderItem={step4ListRenderItem}
              keyExtractor={item => item.key}
              contentContainerStyle={styles.contentContainer}
            />
          </View>
        )}

        {currentStep === 4 && (
          <View style={styles.secContainer1}>
            <Text style={styles.sectionTitle}>
              {'Which group would you like\nto start your challenge with?'}
            </Text>
            <FlatList
              data={step5Data}
              numColumns={1}
              renderItem={step5ListRenderItem}
              keyExtractor={item => item.key}
              contentContainerStyle={styles.listContentContainer}
            />
          </View>
        )}

        {currentStep === 5 && (
          <View
            style={{
              width: screenWidth,
            }}>
            <Text style={styles.sectionTitle}>
              {'Your challenge deadline?'}
            </Text>
            <Calendar
              // markedDates={markedDate}
              onDayPress={day => {
                console.log(day.dateString);
                setSelected(day.dateString);
              }}
              markedDates={{
                [selected]: {
                  selected: true,
                  disableTouchEvent: true,
                  selectedDotColor: 'orange',
                },
              }}
              horizontal={true}
              showScrollIndicator={true}
              monthFormat={'MMMM yyyy'}
              enableSwipeMonths={true}
              renderArrow={renderArrow}
              theme={{
                backgroundColor: theme.colors.transparent,
                calendarBackground: theme.colors.transparent,
                textSectionTitleColor: theme.colors.black,
                textSectionTitleDisabledColor: theme.colors.gray1,
                selectedDayBackgroundColor: theme.colors.primary,
                selectedDayTextColor: theme.colors.white,
                todayTextColor: theme.colors.primary,
                dayTextColor: theme.colors.black,
                textDisabledColor: theme.colors.greyText,
                dotColor: theme.colors.primary,
                selectedDotColor: theme.colors.black,
                arrowColor: 'black',
                disabledArrowColor: '#d9e1e8',
                monthTextColor: theme.colors.black,
                indicatorColor: theme.colors.activeTabColor,
                textDayFontFamily: fontFamily.argentum_sans,
                textMonthFontFamily: fontFamily.argentum_sans,
                textDayHeaderFontFamily: fontFamily.argentum_sans,
                textDayFontWeight: fontWeight[400],
                textMonthFontWeight: fontWeight[500],
                textDayHeaderFontWeight: fontWeight[300],
                textDayFontSize: fontSize.verbiage_16,
                textMonthFontSize: fontSize.verbiage_22,
                textDayHeaderFontSize: fontSize.verbiage_16,
              }}
              style={{
                marginTop: 0.06 * screenWidth,
                backgroundColor: theme.colors.transparent,
              }}
            />
          </View>
        )}
      </View>
      <View style={styles.btnMainView}>
        <Button
          title={
            currentStep == 5
              ? 'CREATE CHALLENGE'
              : currentStep == 4
              ? 'DONE'
              : 'NEXT'
          }
          onPress={() => {
            if (currentStep === 0) {
              setCurrentStep(currentStep + 1);
            } else if (currentStep === 5) {
              navigation.goBack();
            } else {
              setCurrentStep(currentStep + 1);
            }
          }}
          btnWidth={screenWidth * 0.9}
          btnHeight={0.13 * screenWidth}
          titleColor={colors.white}
          titleStyle={styles.btnTitleStyle}
          backgroundColor={colors.primary}
          btnStyle={styles.btnStyle}
        />
      </View>
      <BottomSheetModalView
        backdropComponent={backdropComponent}
        dismissSheetModal={dismissSheetModal}
        onDismissHandler={() => {}}
        paymentMethodRef={bottomSheetModalRef}
        snapPoints={snapPoints}
        title={'Challenge Groups'}
        titleStyle={styles.bottomSheetTitle}
        isPayment={false}
        closeIcon={true}
        paymentClick={() => {
          dismissSheetModal();
        }}
      />
    </View>
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
  secContainer1: {
    width: screenWidth,
    alignItems: 'center',
  },
  sectionTitle: {
    fontFamily: fontFamily.argentum_sans,
    fontSize: fontSize.verbiage_22,
    fontWeight: fontWeight[500],
    marginTop: 0.1 * screenWidth,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  chipView: {
    height: 0.1 * screenWidth,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0.1 * screenWidth,
    paddingHorizontal: 20,
    margin: 5,
  },
  step2ChipView: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    marginHorizontal: 15,
    borderRadius: 20,
    marginVertical: 5,
  },
  step2ChipTitle: {
    fontFamily: fontFamily.argentum_sans,
    fontSize: fontSize.verbiage_24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  step2DescView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  step2Desc: {
    fontFamily: fontFamily.argentum_sans,
    fontSize: fontSize.verbiage_medium,
  },
  chipText: {
    fontFamily: fontFamily.argentum_sans,
    fontSize: fontFamily._14,
    textTransform: 'capitalize',
  },
  step5ListItem: {
    backgroundColor: theme.colors.white,
    flexDirection: 'row',
    width: screenWidth * 0.9,
    height: 0.14 * screenWidth,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    paddingHorizontal: 15,
    margin: 5,
  },
  step5ListItemTitle: {
    fontFamily: fontFamily.argentum_sans,
    fontSize: fontFamily._14,
    color: theme.colors.black,
    textTransform: 'capitalize',
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginVertical: 0.04 * screenWidth,
  },
  listContentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginVertical: 0.04 * screenWidth,
  },
  chipContainer: {
    marginHorizontal: 8,
    marginVertical: 4,
  },
  btnMainView: {
    width: screenWidth,
    alignItems: 'center',
  },
  btnTitleStyle: {
    fontFamily: fontFamily.argentum_sans,
    fontWeight: '500',
    fontSize: fontSize.verbiage_16,
    color: colors.white,
  },
  btnStyle: {
    position: 'absolute',
    bottom: 15,
  },
  bottomSheetTitle: {
    color: theme.colors.secondaryBlack,
    fontFamily: fontFamily.argentum_sans,
    fontSize: fontSize.bottom_sheet_title,
  },
});