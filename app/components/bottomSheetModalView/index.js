import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {screenHeight, screenWidth} from '../../constants';
import {svgImages} from '../../helpers';
import {
  fontFamily,
  fontSize,
  fontWeight,
} from '../../constants/fontDecorations';
import Button from '../button';
import {theme} from '../../theme';
import {Commons} from '../../utils';
import {SvgXml} from 'react-native-svg';
import {TextInput} from 'react-native';
import {FlatList} from 'react-native';
const BottomSheetModalView = props => {
  const searchRef = React.useRef();
  const bottomSheetModalRef = React.useRef(null);
  const [search, setSearch] = React.useState('');
  const [data, setData] = React.useState(Commons.countries);
  return (
    <BottomSheetModalProvider>
      {/* this bottom sheet refer to payment methods */}
      <View style={styles.containerStyle}>
        <BottomSheetModal
          ref={props.paymentMethodRef}
          onDismiss={() => props.onDismissHandler()}
          index={1}
          snapPoints={props.snapPoints}
          backdropComponent={props.backdropComponent}>
          <View style={styles.bottomSheetModalViewCont}>
            <View
              style={{
                width: screenWidth,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
              }}>
              <Text
                style={
                  props.titleStyle
                    ? props.titleStyle
                    : styles.paymentMethodTitle
                }>
                {props.title}
              </Text>
              {props.closeIcon && (
                <TouchableOpacity
                  onPress={() => props.dismissSheetModal()}
                  style={{position: 'absolute', right: 25}}>
                  <SvgXml xml={svgImages.x} />
                </TouchableOpacity>
              )}
            </View>
            {props.subTitle && (
              <Text style={styles.paymentMethodDesc}>{props.subTitle}</Text>
            )}
            {props.isPayment && (
              <View style={styles.paymentBtnsContainer}>
                <Button
                  title={'PAY WITH GOOGLE PLAYSTORE'}
                  iconHeight={17}
                  iconWidth={17}
                  icon={svgImages.googlePlay}
                  iconBG={true}
                  onPress={props.paymentClick}
                  btnWidth={screenWidth * 0.9}
                  backgroundColor={theme.colors.primary}
                  iconBGStyle={[
                    styles.paymentIconView,
                    {
                      backgroundColor: 'rgba(255, 255, 255, 0.5)',
                      paddingLeft: 4,
                    },
                  ]}
                  titleStyle={styles.paymentBtnTitle}
                  btnStyle={styles.paymentBtn}
                />
                <Button
                  title={'PAY WITH APPLE STORE'}
                  onPress={props.paymentClick}
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
            )}
            {!props.isPayment && (
              <>
                <View style={styles.searchInputContainer}>
                  <Ionicons
                    name={'ios-search'}
                    size={24}
                    color={theme.colors.primary}
                    style={styles.searchIcon}
                  />
                  <TextInput
                    {...props}
                    value={search}
                    ref={searchRef}
                    onChangeText={txt => {
                      setSearch(txt);
                    }}
                    style={styles.searchInput}
                    placeholder="Search Groups"
                    placeholderTextColor={theme.colors.greyText}
                  />
                </View>
                <FlatList
                  data={Commons.countries}
                  showsVerticalScrollIndicator={false}
                  ListFooterComponent={<View style={{height: 10}} />}
                  contentContainerStyle={{
                    width: screenWidth,
                    marginHorizontal: 20,
                  }}
                  renderItem={({item, index}) => {
                    return <Text>{item.title}</Text>;
                  }}
                />
              </>
            )}
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
  searchInputContainer: {
    width: screenWidth * 0.9,
    height: 0.11 * screenWidth,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: theme.colors.greyText,
    borderRadius: screenHeight * 0.14,
    paddingHorizontal: 10,
    marginVertical: 25,
  },
  searchIcon: {
    marginRight: 10,
  },
});
