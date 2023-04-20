import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {screenHeight, screenWidth} from '../../constants';
import {svgImages} from '../../helpers';
import {
  fontFamily,
  fontSize,
  fontWeight,
} from '../../constants/fontDecorations';
import Button from '../button';
import {theme} from '../../theme';
import {SvgXml} from 'react-native-svg';
import {TextInput} from 'react-native';
import {FlatList} from 'react-native';
import Commons from '../../utils/Commons';
import AppFlatlist from '../appFlatlist';
const FiltersBottomSheet = props => {
  const [sports, setSports] = useState(Commons.sports);

  return (
    <BottomSheetModalProvider>
      {/* this bottom sheet refer to payment methods */}
      <View style={styles.containerStyle}>
        <BottomSheetModal
          ref={props.bottomSheetRef}
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
                marginTop: 0.1 * screenWidth,
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
            <View>
              <Text
                style={{
                  fontFamily: fontFamily.argentum_sans,
                  fontWeight: fontWeight[500],
                  fontSize: fontSize.verbiage_22,
                  color: theme.colors.secondaryBlack,
                  marginHorizontal: 15,
                  marginVertical: 10,
                }}>
                Sports
              </Text>
              <AppFlatlist
                horizontal
                style={{width: screenWidth, paddingHorizontal: 10}}
                ListFooterComponent={<View />}
                data={sports}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    style={{
                      height: 0.1 * screenWidth,
                      borderRadius: 0.1 * screenWidth,
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingHorizontal: 20,
                      marginHorizontal: 5,
                      borderWidth: 1,
                      borderColor: theme.colors.gray1,
                      backgroundColor: item.selected
                        ? theme.colors.secondaryBlack
                        : theme.colors.transparent,
                    }}
                    onPress={() => {
                      sports.map((itm, i) => {
                        sports[i].selected = itm.id === sports[index].id;
                      });
                      setSports([...sports]);
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                      }}>
                      <Text
                        style={{
                          fontFamily: fontFamily.argentum_sans,
                          marginRight: 5,
                          color: item.selected
                            ? theme.colors.white
                            : theme.colors.black,
                        }}>
                        {item.title}
                      </Text>
                      {item.selected && (
                        <MaterialIcons
                          name={'check'}
                          size={22}
                          color={theme.colors.white}
                          style={styles.icon}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

export default FiltersBottomSheet;
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
    fontWeight: fontWeight[500],
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
    marginTop: 25,
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  listContentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  bottomSheetTitle: {
    color: theme.colors.secondaryBlack,
    fontFamily: fontFamily.argentum_sans,
    fontSize: fontSize.bottom_sheet_title,
  },
});
