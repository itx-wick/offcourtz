import React, {useState, useMemo, useRef, useEffect} from 'react';
import {
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Platform,
  Alert,
} from 'react-native';
import bgTrial from '../../assets/images/trial_bg.png';
import {screenHeight, screenWidth} from '../../constants';
import BottomSheetModalView from '../../components/bottomSheetModalView';

import ApiService from '../../services/ApiService';
import {END_POINTS, SERVER_URL, screens} from '../../config';
import {theme} from '../../theme';
import Button from '../../components/button';
import {
  fontFamily,
  fontSize,
  fontWeight,
} from '../../constants/fontDecorations';
import {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import Modal from 'react-native-modal';
import {SvgXml} from 'react-native-svg';
import {svgImages} from '../../helpers';
import {Commons} from '../../utils';
import axios from 'axios';
import {useStripe} from '@stripe/stripe-react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setLoader} from '../../redux/reducers/commonSlice';

const Trial = ({navigation}) => {
  const dispatch = useDispatch();
  const authToken = useSelector(state => state.Auth.token);
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const snapPoints = useMemo(() => ['37%', '37%'], []);
  const bottomSheetModalRef = useRef(null);
  const [IsEnable, setIsEnable] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const onDismissHandler = () => {
    !IsEnable && setIsEnable(true);
  };
  const backdropComponent = backdropProps => (
    <BottomSheetBackdrop {...backdropProps} enableTouchThrough={true} />
  );
  function dismissSheetModal() {
    bottomSheetModalRef.current?.dismiss();
  }

  const fetchPaymentSheetParams = async id => {
    let body = {
      priceId: id,
    };
    dispatch(setLoader(true));
    await ApiService.post(END_POINTS.subscription, body, authToken)
      .then(async response => {
        console.log(response);
        dispatch(setLoader(false));
        const {error} = await initPaymentSheet({
          paymentIntentClientSecret: response.data.clientSecret,
          allowsDelayedPaymentMethods: false,
          style: 'alwaysLight',
        });
        if (!error) {
          const {error} = await presentPaymentSheet();
          if (error) {
            Alert.alert(`${error.code}`, error.message);
          } else {
            setModalVisible(!modalVisible);
            // Alert.alert('Success', 'Your payment is confirmed!');
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
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
            <Text style={styles.sectionTitle1}>{`OFFCOUTRZ`}</Text>
            {/* <Text
              style={styles.sectionTitle1}>{`TRY\nOFFCOUTRZ\nFOR FREE`}</Text> */}
            <Text style={styles.sectionText}>
              {`Get access to all excercises, workouts, \n challenges and more`}
            </Text>
          </View>
          <View style={styles.btnsContainer}>
            <TouchableOpacity
              style={styles.btnMainView}
              onPress={() => {
                // setIsEnable(false);
                // bottomSheetModalRef.current?.present();
                fetchPaymentSheetParams('price_1NFubJJppEpHaEkXuV115O1J');
              }}>
              <Text style={styles.btnMainText}>TRY IT 3 DAYS FOR FREE</Text>
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
                // setIsEnable(false);
                // bottomSheetModalRef.current?.present();
                fetchPaymentSheetParams('price_1NFubkJppEpHaEkXtmU3ryQA');
              }}>
              <Text style={[styles.btnMainText, {color: theme.colors.black}]}>
                YEARLY SUBSCRIPTION
              </Text>
              <View style={styles.priceTextMainView}>
                <Text style={styles.btnPriceText}>€49.99</Text>
                <Text
                  style={[styles.btnPriceText2, {color: theme.colors.black}]}>
                  /YEARLY
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        <BottomSheetModalView
          backdropComponent={backdropComponent}
          dismissSheetModal={dismissSheetModal}
          onDismissHandler={onDismissHandler}
          bottomSheetModalRef={bottomSheetModalRef}
          snapPoints={snapPoints}
          title={'Payment Method'}
          titleStyle={styles.bottomSheetTitle}
          subTitle={'Select payment method to continue'}
          isPayment={true}
          paymentClick={() => {
            // setModalVisible(true);
            dismissSheetModal();
          }}
        />

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
                Success
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
                Your payment is confirmed!
              </Text>
              <View style={{marginVertical: 5}}>
                <Button
                  title={'GO TO HOME'}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    Commons.reset(navigation, screens.bottomTabStack);
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
      </ImageBackground>
    </>
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
    marginVertical: 10,
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
    bottom: Platform.OS === 'ios' ? 60 : 30,
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
