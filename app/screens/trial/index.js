import React, {useState, useMemo, useRef} from 'react';
import {
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import bgTrial from '../../assets/images/trial_bg.png';
import {screenHeight, screenWidth} from '../../constants';
import BottomSheetModalView from '../../components/bottomSheetModalView';

import {screens} from '../../config';
import {theme} from '../../theme';
import Button from '../../components/button';
import {
  fontFamily,
  fontSize,
  fontWeight,
} from '../../constants/fontDecorations';
import {BottomSheetBackdrop} from '@gorhom/bottom-sheet';

const Trial = ({navigation}) => {
  const snapPoints = useMemo(() => ['37%', '37%'], []);
  const bottomSheetModalRef = useRef(null);
  const [IsEnable, setIsEnable] = useState(true);

  const onDismissHandler = () => {
    !IsEnable && setIsEnable(true);
  };
  const backdropComponent = backdropProps => (
    <BottomSheetBackdrop {...backdropProps} enableTouchThrough={true} />
  );
  function dismissSheetModal() {
    bottomSheetModalRef.current?.dismiss();
  }

  return (
    <ImageBackground style={styles.bgCont} source={bgTrial}>
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.headerMainContainer}>
          <View style={styles.headContainer}>
            <Button
              title={'RESTORE'}
              onPress={() => navigation.navigate(screens.login)}
              btnWidth={screenWidth * 0.25}
              btnHeight={40}
              titleColor={theme.colors.black}
              backgroundColor={theme.colors.white}
            />
          </View>
          <View style={styles.underlineView} />
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle1}>{`TRY\nOFFCOUTRZ\nFOR FREE`}</Text>
          <Text style={styles.sectionText}>
            {`Get access to all excercises, workouts, \n challenges and more`}
          </Text>
        </View>
        <View style={styles.btnsContainer}>
          <TouchableOpacity
            style={styles.btnMainView}
            onPress={() => {
              setIsEnable(false);
              bottomSheetModalRef.current?.present();
            }}>
            <Text style={styles.btnMainText}>TRY IT FOR 3 DAY FREE</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.btnPriceText}>€4.99</Text>
              <Text style={styles.btnPriceText2}>/MONTHLY</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.btnMainView,
              {backgroundColor: theme.colors.white, marginTop: 10},
            ]}
            onPress={() => {
              setIsEnable(false);
              bottomSheetModalRef.current?.present();
            }}>
            <Text style={[styles.btnMainText, {color: theme.colors.black}]}>
              YEARLY SUBSCRIPTION
            </Text>
            <View style={styles.priceTextMainView}>
              <Text style={styles.btnPriceText}>€49.99</Text>
              <Text style={[styles.btnPriceText2, {color: theme.colors.black}]}>
                /YEARLY
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <BottomSheetModalView
        backdropComponent={backdropComponent}
        dismissSheetModal={() => dismissSheetModal}
        onDismissHandler={onDismissHandler}
        paymentMethodRef={bottomSheetModalRef}
        snapPoints={snapPoints}
      />
    </ImageBackground>
  );
};

export default Trial;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    width: screenWidth,
  },
  bgCont: {
    height: screenHeight,
    width: screenWidth,
  },
  headerMainContainer: {
    alignItems: 'center',
  },
  headContainer: {
    marginTop: 0.01 * screenHeight,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: screenWidth,
    paddingHorizontal: 15,
  },
  underlineView: {
    width: screenWidth * 0.9,
    height: 1.5,
    backgroundColor: theme.colors.white,
    marginVertical: 15,
  },
  sectionContainer: {
    alignItems: 'center',
  },
  sectionTitle1: {
    fontFamily: fontFamily.argentum_sans,
    fontWeight: 'bold',
    fontSize: fontSize.screen_title_medium,
    textAlign: 'center',
    color: theme.colors.white,
    marginTop: 15,
  },
  sectionText: {
    fontFamily: fontFamily.argentum_sans,
    fontSize: fontSize.verbiage_large,
    fontWeight: fontWeight[500],
    textAlign: 'center',
    color: theme.colors.white,
    marginTop: 10,
  },
  btnsContainer: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 60,
  },
  btnMainView: {
    flexDirection: 'row',
    width: screenWidth * 0.85,
    height: screenWidth * 0.14,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.primary,
    borderRadius: screenWidth * 0.12,
    paddingHorizontal: 25,
  },
  btnMainText: {
    fontFamily: fontFamily.argentum_sans,
    fontSize: fontSize.verbiage,
    fontWeight: fontWeight[500],
    textAlign: 'left',
    color: theme.colors.white,
    width: '65%',
  },
  btnPriceText: {
    fontFamily: fontFamily.argentum_sans,
    fontSize: fontSize.verbiage,
    fontWeight: fontWeight[500],
    textAlign: 'center',
    color: theme.colors.carrotOrange,
  },
  btnPriceText2: {
    fontFamily: fontFamily.argentum_sans,
    fontSize: fontSize.verbiage_small,
    fontWeight: fontWeight[500],
    textAlign: 'center',
    marginTop: 3,
    color: theme.colors.white,
  },
  priceTextMainView: {
    flexDirection: 'row',
    width: '35%',
    justifyContent: 'flex-end',
  },
});
