import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';

import {screenWidth} from '../../constants';
import {svgImages} from '../../helpers';
import {
  fontFamily,
  fontSize,
  fontWeight,
} from '../../constants/fontDecorations';
import Button from '../button';
import {theme} from '../../theme';
const BottomSheetModalView = ({
  paymentMethodRef,
  onDismissHandler,
  backdropComponent,
  snapPoints,
}) => {
  return (
    <BottomSheetModalProvider>
      {/* this bottom sheet refer to payment methods */}
      <View style={styles.containerStyle}>
        <BottomSheetModal
          onDismiss={() => onDismissHandler()}
          ref={paymentMethodRef}
          index={1}
          snapPoints={snapPoints}
          backdropComponent={backdropComponent}>
          <View style={styles.bottomSheetModalViewCont}>
            <Text style={styles.paymentMethodTitle}>Payment Method</Text>
            <Text style={styles.paymentMethodDesc}>
              Select payment method to continue
            </Text>
            <View style={styles.paymentBtnsContainer}>
              <Button
                title={'PAY WITH GOOGLE PLAYSTORE'}
                iconHeight={17}
                iconWidth={17}
                icon={svgImages.googlePlay}
                iconBG={true}
                onPress={() => {}}
                btnWidth={screenWidth * 0.9}
                backgroundColor={theme.colors.primary}
                iconBGStyle={[
                  styles.paymentIconView,
                  {backgroundColor: 'rgba(255, 255, 255, 0.5)', paddingLeft: 4},
                ]}
                titleStyle={styles.paymentBtnTitle}
                btnStyle={styles.paymentBtn}
              />
              <Button
                title={'PAY WITH APPLE STORE'}
                onPress={() => {}}
                btnWidth={screenWidth * 0.9}
                iconHeight={17}
                iconWidth={17}
                icon={svgImages.apple}
                iconBG={true}
                borderWidth={1}
                titleColor={theme.colors.black}
                backgroundColor={theme.colors.white}
                iconBGStyle={styles.paymentIconView}
                titleStyle={styles.paymentBtnTitle}
                btnStyle={styles.paymentBtn}
              />
            </View>
          </View>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

export default BottomSheetModalView;
const styles = StyleSheet.create({
  containerStyle: {opacity: 0.5},
  bottomSheetModalViewCont: {
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    width: screenWidth,
    height: '100%',
  },
  paymentMethodTitle: {
    color: theme.colors.secondaryBlack,
    fontFamily: fontFamily.argentum_sans,
    fontWeight: fontWeight[700],
    fontSize: fontSize.bottom_sheet_title,
    marginTop: 20,
  },
  paymentBtnTitle: {
    fontSize: fontSize.verbiage_16,
    fontWeight: fontWeight[400],
    paddingHorizontal: 5,
  },
  paymentMethodDesc: {
    color: theme.colors.greyText,
    fontFamily: fontFamily.argentum_sans,
    fontWeight: fontWeight[400],
    fontSize: fontSize.verbiage_large,
    marginTop: 10,
  },
  paymentBtnsContainer: {
    position: 'absolute',
    bottom: 50,
  },
  paymentBtn: {
    marginTop: 10,
    height: screenWidth * 0.14,
  },
  paymentIconView: {
    width: 30,
    height: 30,
    borderRadius: 39,
    backgroundColor: theme.colors.secondaryBlack,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 2,
  },
});
