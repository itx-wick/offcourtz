import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
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
import Commons from '../../utils/Commons';
import AppFlatlist from '../appFlatlist';
const FiltersBottomSheet = props => {
  const [sports, setSports] = useState(Commons.sports);
  const [gameTypes, setGameTypes] = useState(Commons.gameType);
  const [objectives, setObjectives] = useState(Commons.objectives);
  const [situations, setSituations] = useState(Commons.situation);
  const [shots, setShots] = useState(Commons.shots);
  const [abilities, setAbilities] = useState(Commons.abilities);
  const [physicalQualities, setPhysicalQualities] = useState(
    Commons.physicalQualities,
  );

  const clearFilters = () => {
    sports.map((itm, i) => {
      sports[i].selected = false;
    });
    setSports([...sports]);
    gameTypes.map((itm, i) => {
      gameTypes[i].selected = false;
    });
    setGameTypes([...gameTypes]);
    objectives.map((itm, i) => {
      objectives[i].selected = false;
    });
    setObjectives([...objectives]);
    situations.map((itm, i) => {
      situations[i].selected = false;
    });
    setSituations([...situations]);
    shots.map((itm, i) => {
      shots[i].selected = false;
    });
    setShots([...shots]);
    abilities.map((itm, i) => {
      abilities[i].selected = false;
    });
    setAbilities([...abilities]);
    physicalQualities.map((itm, i) => {
      physicalQualities[i].selected = false;
    });
    setPhysicalQualities([...physicalQualities]);
  };

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
            <ScrollView
              horizontal={false}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{width: screenWidth}}>
              <View style={styles.secondaryCont}>
                <View style={{marginTop: 10}}>
                  <Text
                    style={{
                      fontFamily: fontFamily.argentum_sans,
                      fontWeight: fontWeight[500],
                      fontSize: fontSize.verbiage_22,
                      color: theme.colors.secondaryBlack,
                      marginVertical: 10,
                    }}>
                    Sports
                  </Text>
                  <AppFlatlist
                    horizontal
                    style={{width: screenWidth}}
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
                <View style={{marginTop: 15}}>
                  <Text
                    style={{
                      fontFamily: fontFamily.argentum_sans,
                      fontWeight: fontWeight[500],
                      fontSize: fontSize.verbiage_22,
                      color: theme.colors.secondaryBlack,
                      marginVertical: 10,
                    }}>
                    Game Type
                  </Text>
                  <AppFlatlist
                    horizontal
                    style={{width: screenWidth}}
                    ListFooterComponent={<View />}
                    data={gameTypes}
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
                          gameTypes.map((itm, i) => {
                            gameTypes[i].selected =
                              itm.id === gameTypes[index].id;
                          });
                          setGameTypes([...gameTypes]);
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
                <View style={{marginTop: 15}}>
                  <Text
                    style={{
                      fontFamily: fontFamily.argentum_sans,
                      fontWeight: fontWeight[500],
                      fontSize: fontSize.verbiage_22,
                      color: theme.colors.secondaryBlack,
                      marginVertical: 10,
                    }}>
                    Objectives
                  </Text>
                  <AppFlatlist
                    horizontal
                    style={{width: screenWidth}}
                    ListFooterComponent={
                      <View style={{paddingHorizontal: 15}} />
                    }
                    data={objectives}
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
                          objectives.map((itm, i) => {
                            objectives[i].selected =
                              itm.id === objectives[index].id;
                          });
                          setObjectives([...objectives]);
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
                <View style={{marginTop: 15}}>
                  <Text
                    style={{
                      fontFamily: fontFamily.argentum_sans,
                      fontWeight: fontWeight[500],
                      fontSize: fontSize.verbiage_22,
                      color: theme.colors.secondaryBlack,
                      marginVertical: 10,
                    }}>
                    Situations
                  </Text>
                  <AppFlatlist
                    horizontal
                    style={{width: screenWidth}}
                    ListFooterComponent={
                      <View style={{paddingHorizontal: 15}} />
                    }
                    data={situations}
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
                          situations.map((itm, i) => {
                            situations[i].selected =
                              itm.id === situations[index].id;
                          });
                          setSituations([...situations]);
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
                <View style={{marginTop: 15}}>
                  <Text
                    style={{
                      fontFamily: fontFamily.argentum_sans,
                      fontWeight: fontWeight[500],
                      fontSize: fontSize.verbiage_22,
                      color: theme.colors.secondaryBlack,
                      marginVertical: 10,
                    }}>
                    Shots
                  </Text>
                  <AppFlatlist
                    horizontal
                    style={{width: screenWidth}}
                    ListFooterComponent={
                      <View style={{paddingHorizontal: 15}} />
                    }
                    data={shots}
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
                          shots.map((itm, i) => {
                            shots[i].selected = itm.id === shots[index].id;
                          });
                          setShots([...shots]);
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
                <View style={{marginTop: 15}}>
                  <Text
                    style={{
                      fontFamily: fontFamily.argentum_sans,
                      fontWeight: fontWeight[500],
                      fontSize: fontSize.verbiage_22,
                      color: theme.colors.secondaryBlack,
                      marginVertical: 10,
                    }}>
                    Abilities
                  </Text>
                  <AppFlatlist
                    horizontal
                    style={{width: screenWidth}}
                    ListFooterComponent={
                      <View style={{paddingHorizontal: 15}} />
                    }
                    data={abilities}
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
                          abilities.map((itm, i) => {
                            abilities[i].selected =
                              itm.id === abilities[index].id;
                          });
                          setAbilities([...abilities]);
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
                <View style={{marginTop: 15}}>
                  <Text
                    style={{
                      fontFamily: fontFamily.argentum_sans,
                      fontWeight: fontWeight[500],
                      fontSize: fontSize.verbiage_22,
                      color: theme.colors.secondaryBlack,
                      marginVertical: 10,
                    }}>
                    Physical Qualities
                  </Text>
                  <AppFlatlist
                    horizontal
                    style={{width: screenWidth}}
                    ListFooterComponent={
                      <View style={{paddingHorizontal: 15}} />
                    }
                    data={physicalQualities}
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
                          physicalQualities.map((itm, i) => {
                            physicalQualities[i].selected =
                              itm.id === physicalQualities[index].id;
                          });
                          setPhysicalQualities([...physicalQualities]);
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
                <View style={{marginTop: 15}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 15,
                      marginBottom: 25,
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Button
                      title={'SHOW RESULTS'}
                      onPress={() => props.dismissSheetModal()}
                      btnWidth={screenWidth * 0.45}
                      btnHeight={0.12 * screenWidth}
                      titleColor={theme.colors.white}
                      backgroundColor={theme.colors.primary}
                    />
                    <Button
                      title={'CLEAR FILTERS'}
                      onPress={() => {
                        clearFilters();
                      }}
                      btnWidth={screenWidth * 0.45}
                      btnHeight={0.12 * screenWidth}
                      titleColor={theme.colors.secondaryBlack}
                      borderWidth={1}
                      borderColor={theme.colors.secondaryBlack}
                      backgroundColor={theme.colors.transparent}
                    />
                  </View>
                </View>
              </View>
            </ScrollView>
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
  secondaryCont: {
    width: '100%',
    paddingHorizontal: 15,
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
