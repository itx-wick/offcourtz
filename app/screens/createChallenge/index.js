import React, {useState, useEffect, useMemo, useRef} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
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
import FriendsBottomSheetModalView from '../../components/bottomSheetModalView';
import GroupsBottomSheetModalView from '../../components/bottomSheetModalView';
import userPlaceholder from '../../assets/images/user.jpeg';
import {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {Platform} from 'react-native';
import {TextInput} from 'react-native';
import TextField from '../../components/textField';
import DropDown from '../../components/dropDownView';
const {colors} = theme;

const CreateChallenge = ({route, navigation}) => {
  const friendsModalRef = useRef(null);
  const groupsModalRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(0);
  const snapPoints = useMemo(() => ['100%', '100%'], []);

  const [selectedItem, setSelectedItem] = React.useState({});
  const [bottomSheetTitle, setBottomSheetTitle] = useState('');
  const [step1, setStep1] = useState('');
  const [step2, setStep2] = useState('');
  const [step3, setStep3] = useState('');
  const [step4, setStep4] = useState('');
  const [step5, setStep5] = useState('');
  const [step1Data, setStep1Data] = useState(Commons.step1Data);
  const [step2Data, setStep2Data] = useState(Commons.step2Data);
  const [step3Data, setStep3Data] = useState(Commons.step3Data);
  const [step4Data, setStep4Data] = useState(Commons.step4Data);
  const [step5Data, setStep5Data] = useState(Commons.step5Data);
  const [groups, setGroups] = useState(Commons.groupsData);
  const [friends, setFriends] = useState(Commons.friendsData);
  const [selected, setSelected] = useState(new Date().toISOString());

  function handleSelection(e) {
    setSelectedItem(e);
  }

  const backdropComponent = backdropProps => (
    <BottomSheetBackdrop {...backdropProps} enableTouchThrough={true} />
  );

  function dismissGroupsSheetModal() {
    groupsModalRef.current?.dismiss();
  }

  function dismissFriendsSheetModal() {
    friendsModalRef.current?.dismiss();
  }

  useEffect(() => {
    setSelected(Commons.calculateDateFromObj(new Date()));
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
          step1Data.map((itm, i) => {
            step1Data[i].selected = itm.key === step1Data[index].key;
          });
          setStep1(step1Data.find(obj => obj.selected == true).title);
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
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const step2ListRenderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          step2Data.map((itm, i) => {
            step2Data[i].selected = itm.id === step2Data[index].id;
          });
          setStep2(step2Data.find(obj => obj.selected == true).title);
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

        <Image
          source={item.image}
          style={{
            width: '30%',
            height: '100%',
          }}
        />
      </TouchableOpacity>
    );
  };

  const step3ListRenderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          step3Data.map((itm, i) => {
            step3Data[i].selected = itm.key === step3Data[index].key;
          });
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
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const step4ListRenderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          step4Data.map((itm, i) => {
            step4Data[i].selected = itm.key === step4Data[index].key;
          });
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
          {item.title}
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
          if (item.title === 'Challenge Groups') {
            setBottomSheetTitle('Groups');
            groupsModalRef.current.present();
          } else if (item.title === 'Challenge Friends') {
            setBottomSheetTitle('Friends');
            friendsModalRef.current.present();
          }
        }}
        style={styles.step5ListItem}>
        <Text style={styles.step5ListItemTitle}>{item.title}</Text>
        <SvgXml
          xml={item.selected ? svgImages.selectedRadioBtn : svgImages.radioBtn}
        />
      </TouchableOpacity>
    );
  };

  const renderListItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (bottomSheetTitle == 'Groups') {
            groups[index].selected = !item.selected;
            setGroups([...groups]);
          } else if (bottomSheetTitle == 'Friends') {
            friends[index].selected = !item.selected;
            setFriends([...friends]);
          }
        }}
        style={styles.listItem}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={userPlaceholder} style={styles.userImage} />
          <Text style={styles.listItemTitle}>{item.title}</Text>
        </View>
        <SvgXml
          xml={item.selected ? svgImages.selectedRadioBtn : svgImages.radioBtn}
        />
      </TouchableOpacity>
    );
  };

  const flatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: screenWidth * 0.9,
          backgroundColor: theme.colors.gray1,
        }}
      />
    );
  };

  function handleSelection(e, i, type) {
    let newForm = [...formVal];
    if (type === 'title') {
      newForm[i]['title'] = e.title;
      setFormVal(newForm);
    } else if (type === 'count') {
      newForm[i]['count'] = e;
      setFormVal(newForm);
    }
    console.log('Form', formVal);
  }

  const [formVal, setFormVal] = useState([{title: '', count: ''}]);

  const addNew = () => {
    setFormVal([...formVal, {exerciseName: '', duration: '', workoutName: ''}]);
  };

  const onRemove = i => {
    const newForm = [...formVal];
    newForm.splice(i, 1);
    setFormVal(newForm);
  };

  const onHandle = (e, i) => {
    let newForm = [...formVal];
    newForm[i][e.target.name] = e.target.value;
    setFormVal(newForm);
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

      <ScrollView style={{flex: 1}}>
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              width: screenWidth,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 0.06 * screenWidth,
            }}>
            <TouchableOpacity
              onPress={() => {
                // setCurrentStep(0);
              }}
              style={{
                width: 0.15 * screenWidth,
                height: 0.15 * screenWidth,
                borderRadius: 0.15 * screenWidth,
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
                height={28}
                width={28}
              />
            </TouchableOpacity>
            <View
              style={{
                width: 0.04 * screenWidth,
                height: 3,
                backgroundColor:
                  currentStep > 0 ? theme.colors.primary : theme.colors.white,
              }}
            />
            <TouchableOpacity
              onPress={() => {
                // setCurrentStep(1);
              }}
              style={{
                width: 0.15 * screenWidth,
                height: 0.15 * screenWidth,
                borderRadius: 0.15 * screenWidth,
                borderWidth: 2,
                borderColor:
                  currentStep >= 1 ? theme.colors.primary : theme.colors.gray1,
                backgroundColor:
                  currentStep > 1 ? theme.colors.primary : theme.colors.white,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <SvgXml
                xml={
                  currentStep > 1 ? svgImages.check : svgImages.tenisBallStep
                }
                height={28}
                width={28}
              />
            </TouchableOpacity>
            <View
              style={{
                width: 0.04 * screenWidth,
                height: 3,
                backgroundColor:
                  currentStep > 1 ? theme.colors.primary : theme.colors.white,
              }}
            />
            <TouchableOpacity
              onPress={() => {
                // setCurrentStep(2);
              }}
              style={{
                width: 0.15 * screenWidth,
                height: 0.15 * screenWidth,
                borderRadius: 0.15 * screenWidth,
                borderWidth: 2,
                borderColor:
                  currentStep >= 2 ? theme.colors.primary : theme.colors.gray1,
                backgroundColor:
                  currentStep > 2 ? theme.colors.primary : theme.colors.white,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <SvgXml
                xml={
                  currentStep > 2 ? svgImages.check : svgImages.lightningStep
                }
                height={28}
                width={28}
              />
            </TouchableOpacity>
            <View
              style={{
                width: 0.04 * screenWidth,
                height: 3,
                backgroundColor:
                  currentStep > 2 ? theme.colors.primary : theme.colors.white,
              }}
            />
            {/* <View
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
            /> */}
            <TouchableOpacity
              onPress={() => {
                // setCurrentStep(3);
              }}
              style={{
                width: 0.15 * screenWidth,
                height: 0.15 * screenWidth,
                borderRadius: 0.15 * screenWidth,
                borderWidth: 2,
                borderColor:
                  currentStep >= 3 ? theme.colors.primary : theme.colors.gray1,
                backgroundColor:
                  currentStep > 3 ? theme.colors.primary : theme.colors.white,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <SvgXml
                xml={currentStep > 3 ? svgImages.check : svgImages.userStep}
                height={28}
                width={28}
              />
            </TouchableOpacity>
            <View
              style={{
                width: 0.05 * screenWidth,
                height: 3,
                backgroundColor:
                  currentStep > 3 ? theme.colors.primary : theme.colors.white,
              }}
            />
            <TouchableOpacity
              onPress={() => {
                // setCurrentStep(4);
              }}
              style={{
                width: 0.15 * screenWidth,
                height: 0.15 * screenWidth,
                borderRadius: 0.15 * screenWidth,
                borderWidth: 2,
                borderColor:
                  currentStep >= 4 ? theme.colors.primary : theme.colors.gray1,
                backgroundColor:
                  currentStep > 4 ? theme.colors.primary : theme.colors.white,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <SvgXml
                xml={currentStep > 4 ? svgImages.check : svgImages.clockStep}
                height={28}
                width={28}
              />
            </TouchableOpacity>
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
              {console.log('Hell', step2 !== 'Custom\nChallenge')}
              {step2 !== 'Custom\nChallenge' ? (
                <>
                  <Text style={styles.sectionTitle}>
                    {'What is the challenge?'}
                  </Text>
                  {formVal.map((item, i) => (
                    <View>
                      {formVal.length > 1 && (
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginTop: 10,
                          }}>
                          <Text
                            style={{
                              fontFamily: fontFamily.argentum_sans,
                              fontSize: fontSize.verbiage_20,
                              fontWeight: fontWeight[500],
                            }}>{`Specification ${i + 1}`}</Text>
                          <TouchableOpacity onPress={() => onRemove(i)}>
                            <Image
                              source={require('../../assets/images/delete.png')}
                              style={{
                                width: 50,
                                height: 50,
                                marginHorizontal: 3,
                              }}
                              resizeMode="contain"
                            />
                          </TouchableOpacity>
                        </View>
                      )}
                      <View
                        style={{
                          width: 0.9 * screenWidth,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginTop: formVal.length == 1 ? 20 : 0,
                        }}>
                        <View style={{marginTop: -20}}>
                          <TextField
                            inputWidth={0.19 * screenWidth}
                            height={0.12 * screenWidth}
                            borderColor={theme.colors.greyText}
                            borderRadius={0.4 * screenWidth}
                            value={item.count}
                            onChangeText={e => {
                              handleSelection(e, i, 'count');
                            }}
                            placeholder={'00'}
                            // paddingHorizontal={10}
                            keyboardType={'number-pad'}
                            type={'text'}
                            inputStyle={{
                              textAlign: 'center',
                              marginRight: 5,
                            }}
                          />
                        </View>
                        <View style={{marginVertical: 5}}>
                          <DropDown
                            width={0.7 * screenWidth}
                            height={0.12 * screenWidth}
                            // borderWidth={1}
                            borderColor={theme.colors.greyText}
                            borderRadius={0.12 * screenWidth}
                            icon={svgImages.caretDown}
                            title={'Select Specification'}
                            type={'Country'}
                            data={Commons.step3Data}
                            selectedItem={item.title}
                            onPressItem={e => {
                              handleSelection(e, i, 'title');
                            }}
                            dropDownListStyle={{
                              height: 0.25 * screenWidth,
                              flexGrow: 0,
                            }}
                          />
                        </View>
                      </View>
                    </View>
                  ))}
                  <View style={{marginTop: 10}}>
                    <TouchableOpacity
                      onPress={addNew}
                      style={{
                        width: 0.9 * screenWidth,
                        height: 0.12 * screenWidth,
                        borderColor: theme.colors.greyText,
                        borderRadius: 0.4 * screenWidth,
                        borderWidth: 2,
                        marginVertical: 15,
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        backgroundColor: theme.colors.black,
                      }}>
                      <SvgXml width="22" height="22" xml={svgImages.plus2} />
                      <Text
                        style={{
                          fontFamily: fontFamily.argentum_sans,
                          fontSize: fontSize.verbiage_large,
                          color: 'white',
                          fontWeight: fontWeight[500],
                          marginHorizontal: 5,
                        }}>
                        ADD NEW SPECIFICATION
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <>
                  <Text style={styles.sectionTitle}>
                    {'What are the custom\nchallenge specification?'}
                  </Text>

                  <View style={{marginTop: 15}}>
                    <Text
                      style={{
                        fontFamily: fontFamily.argentum_sans,
                        fontSize: fontSize.verbiage_medium,
                        fontWeight: fontWeight[500],
                        marginVertical: 5,
                        color: theme.colors.greyText,
                      }}>
                      Add Favorites
                    </Text>
                    <DropDown
                      width={0.92 * screenWidth}
                      // height={0.12 * screenWidth}
                      // borderWidth={1}
                      borderColor={theme.colors.greyText}
                      borderRadius={0.12 * screenWidth}
                      icon={svgImages.caretDown}
                      title={'Add From Favorite'}
                      type={'Country'}
                      data={Commons.step4Data}
                      selectedItem={selectedItem.title}
                      onPressItem={handleSelection}
                      dropDownListStyle={{
                        height: 0.25 * screenWidth,
                      }}
                      flatListView={{
                        height: 0.25 * screenWidth,
                      }}
                    />
                  </View>
                  <View style={{marginTop: 10}}>
                    <Text
                      style={{
                        fontFamily: fontFamily.argentum_sans,
                        fontSize: fontSize.verbiage_medium,
                        fontWeight: fontWeight[300],
                        marginVertical: 5,
                        color: theme.colors.greyText,
                      }}>
                      Description
                    </Text>
                    <TextInput
                      style={{
                        width: 0.92 * screenWidth,
                        height: 0.25 * screenWidth,
                        borderWidth: 2,
                        borderColor: theme.colors.gray1,
                        borderRadius: 15,
                        fontFamily: fontFamily.argentum_sans,
                        fontSize: fontSize.verbiage,
                        color: theme.colors.black,
                        fontWeight: fontWeight[400],
                        paddingTop: 15,
                        paddingHorizontal: 15,
                        backgroundColor: theme.colors.white,
                        textAlignVertical: 'top',
                      }}
                      multiline
                      placeholderTextColor={theme.colors.greyText}
                      placeholder="Write Custom Challenge..."
                    />
                  </View>
                </>
              )}
              {/* <FlatList
              data={step3Data}
              numColumns={2}
              renderItem={step3ListRenderItem}
              keyExtractor={item => item.key}
              contentContainerStyle={styles.contentContainer}
            /> */}
            </View>
          )}

          {/* {currentStep === 3 && (
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
          )} */}

          {currentStep === 3 && (
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

          {currentStep === 4 && (
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
      </ScrollView>

      <View style={styles.btnMainView}>
        <Button
          title={
            currentStep == 4
              ? 'CREATE CHALLENGE'
              : currentStep == 3
              ? 'DONE'
              : 'NEXT'
          }
          onPress={() => {
            if (currentStep === 0) {
              setCurrentStep(currentStep + 1);
            } else if (currentStep === 4) {
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
      <GroupsBottomSheetModalView
        backdropComponent={backdropComponent}
        dismissSheetModal={dismissGroupsSheetModal}
        renderListItem={renderListItem}
        flatListItemSeparator={flatListItemSeparator}
        onDismissHandler={() => {}}
        onClickDone={() => {
          groupsModalRef.current?.dismiss();
        }}
        bottomSheetModalRef={groupsModalRef}
        snapPoints={snapPoints}
        data={groups}
        title={'Challenge Groups'}
        titleStyle={styles.bottomSheetTitle}
        peoples={true}
        closeIcon={true}
        paymentClick={() => {
          dismissGroupsSheetModal();
        }}
      />
      <FriendsBottomSheetModalView
        backdropComponent={backdropComponent}
        dismissSheetModal={dismissFriendsSheetModal}
        renderListItem={renderListItem}
        flatListItemSeparator={flatListItemSeparator}
        onDismissHandler={() => {}}
        onClickDone={() => {
          friendsModalRef.current?.dismiss();
        }}
        bottomSheetModalRef={friendsModalRef}
        snapPoints={snapPoints}
        data={friends}
        title={'Challenge Friends'}
        titleStyle={styles.bottomSheetTitle}
        peoples={true}
        closeIcon={true}
        paymentClick={() => {
          dismissFriendsSheetModal();
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
    marginTop: Platform.OS === 'ios' ? 0.12 * screenWidth : 0.04 * screenWidth,
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
    height: 0.3 * screenWidth,
    width: 0.92 * screenWidth,
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
  listItem: {
    backgroundColor: theme.colors.white,
    flexDirection: 'row',
    width: screenWidth * 0.9,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    paddingRight: 10,
    paddingVertical: 10,
    margin: 5,
  },
  listItemTitle: {
    fontFamily: fontFamily.argentum_sans,
    fontSize: fontSize.verbiage_medium,
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
  userImage: {
    width: 0.12 * screenWidth,
    height: 0.12 * screenWidth,
    borderRadius: 0.12 * screenWidth,
    borderWidth: 2,
    marginRight: 10,
    resizeMode: 'contain',
    borderColor: theme.colors.greyText,
  },
});
