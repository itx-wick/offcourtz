import React, {useState, useRef} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {View, Text} from 'react-native';
import {theme} from '../theme';
import TextField from '../components/textField';
import {fontFamily, fontSize, fontWeight} from '../constants/fontDecorations';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {screenHeight, screenWidth} from '../constants';
import userPlaceholder from '../assets/images/user.jpeg';
import {Commons} from '../utils';
import {svgImages} from '../helpers';
import {screens} from '../config';
import {SvgXml} from 'react-native-svg';
import {FlatList} from 'react-native';
import Modal from 'react-native-modal';
import DropDown from '../components/dropDownView';
import Button from '../components/button';
import {Platform} from 'react-native';
function CustomWorkout({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);

  function handleSelection(e, i, type) {
    let newForm = [...formVal];
    if (type === 'duration') {
      newForm[i]['duration'] = e.title;
      setFormVal(newForm);
    } else if (type === 'name') {
      newForm[i]['title'] = e.title;
      setFormVal(newForm);
    } else if (type === 'workoutName') {
      newForm[i]['workoutName'] = e;
      setFormVal(newForm);
    }
    console.log('Form', formVal);
  }

  const [formVal, setFormVal] = useState([
    {title: '', duration: '', workoutName: ''},
  ]);

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

  //   const formValidation = formVal => {
  //     const data = [...formVal];
  //     var re = /\S+@\S+\.\S+/;
  //     let valid = true;
  //     for (let index = 0; index < data.length; index++) {
  //       // const element = data[index];
  //       if (data[index].name == '') {
  //         data[index].nameCheck = 'name required';
  //         data[index].nameLengthCheck = '';
  //         valid = false;
  //       } else if (data[index].name.length < 10) {
  //         data[index].nameLengthCheck = 'name should be greater than 10';
  //         data[index].nameCheck = '';
  //         valid = false;
  //       } else {
  //         data[index].nameCheck = '';
  //         data[index].nameLengthCheck = '';
  //         valid = true;
  //       }

  //       if (data[index].email == '') {
  //         data[index].emailCheck = 'email required';
  //         data[index].emailFormat = '';
  //         valid = false;
  //       } else if (!re.test(data[index].email)) {
  //         data[index].emailFormat = 'Invalid Email';
  //         data[index].emailCheck = '';
  //         valid = false;
  //       } else {
  //         data[index].emailCheck = '';
  //         data[index].emailFormat = '';
  //         valid = true;
  //       }
  //     }
  //     setFormVal(data);
  //     return valid;
  //   };

  //   const onSubmit = (e) => {
  //     e.preventDefault();
  //     console.log("submitData", formVal)
  //    const errorRes = formValidation(formVal)
  //    console.log("errorRes", errorRes)
  //    if(errorRes) {
  //     // api call
  //    }
  //    else{
  //     // error msg
  //    }
  //   }

  const navigateBack = () => {
    navigation.goBack();
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
          <Text style={styles.headerTitle}>Custom Workout</Text>
        </View>
        <View style={styles.underlineView} />
      </View>

      {!modalVisible && (
        <>
          <ScrollView>
            <View style={styles.secondaryCont}>
              {formVal.map((item, i) => (
                <View>
                  {formVal.length > 1 && (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: 15,
                      }}>
                      <Text
                        style={{
                          fontFamily: fontFamily.argentum_sans,
                          fontSize: fontSize.verbiage_20,
                          fontWeight: fontWeight[500],
                        }}>{`Exercise ${i + 1}`}</Text>
                      <TouchableOpacity onPress={() => onRemove(i)}>
                        <Image
                          source={require('../assets/images/delete.png')}
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
                  <View style={{marginTop: 10}}>
                    <Text
                      style={{
                        fontFamily: fontFamily.argentum_sans,
                        fontSize: fontSize.verbiage_medium,
                        fontWeight: fontWeight[500],
                        marginVertical: 5,
                        color: theme.colors.greyText,
                      }}>
                      Exercise Name
                    </Text>
                    <DropDown
                      width={0.92 * screenWidth}
                      height={0.12 * screenWidth}
                      // borderWidth={1}
                      borderColor={theme.colors.greyText}
                      borderRadius={0.12 * screenWidth}
                      icon={svgImages.caretDown}
                      title={'Choose Exercise'}
                      type={'Exercise'}
                      data={Commons.exercises}
                      selectedItem={item.title}
                      onPressItem={e => {
                        handleSelection(e, i, 'name');
                      }}
                      dropDownListStyle={{
                        maxHeight: 0.25 * screenWidth,
                      }}
                      flatListView={{
                        maxHeight: 0.25 * screenWidth,
                      }}
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
                      Exercise Duration
                    </Text>
                    <DropDown
                      width={0.92 * screenWidth}
                      height={0.12 * screenWidth}
                      // borderWidth={1}
                      borderColor={theme.colors.greyText}
                      borderRadius={0.12 * screenWidth}
                      icon={svgImages.caretDown}
                      title={'Choose Duration'}
                      type={'Duration'}
                      data={Commons.durations}
                      selectedItem={item.duration}
                      onPressItem={e => {
                        handleSelection(e, i, 'duration');
                      }}
                      dropDownListStyle={{
                        maxHeight: 0.25 * screenWidth,
                      }}
                      flatListView={{
                        maxHeight: 0.25 * screenWidth,
                      }}
                    />
                  </View>
                  <View style={{marginTop: 10}}>
                    <TextField
                      inputWidth={0.92 * screenWidth}
                      height={0.12 * screenWidth}
                      borderColor={theme.colors.greyText}
                      borderRadius={0.4 * screenWidth}
                      value={item.workoutName}
                      onChangeText={e => {
                        // handleSelection(e, i, 'workoutName');
                      }}
                      title={'Workout Name'}
                      placeholder={'Workout Name'}
                      paddingHorizontal={10}
                      type={'text'}
                    />
                  </View>
                </View>
              ))}
              <View style={{marginTop: 10}}>
                <TouchableOpacity
                  onPress={addNew}
                  style={{
                    width: 0.92 * screenWidth,
                    height: 0.12 * screenWidth,
                    borderColor: theme.colors.greyText,
                    borderRadius: 0.4 * screenWidth,
                    borderWidth: 2,
                    marginVertical: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    backgroundColor: theme.colors.white,
                  }}>
                  <SvgXml width="22" height="22" xml={svgImages.plus2} />
                  <Text
                    style={{
                      fontFamily: fontFamily.argentum_sans,
                      fontSize: fontSize.verbiage_large,
                      fontWeight: fontWeight[500],
                      marginHorizontal: 5,
                    }}>
                    ADD NEW EXERCISE
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{marginTop: 10, marginBottom: 100}}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontFamily: fontFamily.argentum_sans,
                      fontSize: fontSize.verbiage_large,
                      fontWeight: '500',
                      marginVertical: 5,
                      color: theme.colors.black,
                    }}>
                    Upload Workout Thumbnail
                  </Text>
                </View>
                <ImageBackground
                  style={{
                    height: 0.4 * screenWidth,
                    borderWidth: 1,
                    borderColor: theme.colors.greyText,
                    borderRadius: 15,
                    marginTop: 5,
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    backgroundColor: theme.colors.white,
                  }}>
                  <View style={{height: 50}}>
                    <SvgXml width="90" height="90" xml={svgImages.smiley} />
                  </View>
                  <Button
                    title={'ADD'}
                    iconHeight={16}
                    iconWidth={16}
                    icon={svgImages.plus}
                    onPress={() => {}}
                    btnWidth={screenWidth * 0.25}
                    btnHeight={40}
                    titleColor={theme.colors.white}
                    backgroundColor={theme.colors.secondaryBlack}
                  />
                </ImageBackground>
              </View>
            </View>
          </ScrollView>
          <View style={{width: screenWidth, alignItems: 'center'}}>
            <Button
              title={'CREATE CUSTOM WORKOUT'}
              onPress={() => setModalVisible(!modalVisible)}
              btnWidth={screenWidth * 0.92}
              btnHeight={0.14 * screenWidth}
              titleColor={theme.colors.white}
              backgroundColor={theme.colors.primary}
              btnStyle={{
                position: 'absolute',
                bottom: 25,
              }}
            />
          </View>
        </>
      )}

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
              Custom Workout Created
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
              Your have successfully created workout!
            </Text>
            <View style={{marginVertical: 5}}>
              <Button
                title={'SHARE WITH YOUR FRIENDS'}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  navigateBack();
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
    </View>
  );
}

export default CustomWorkout;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: theme.colors.whisper,
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
    fontSize: fontSize.verbiage_20,
    color: theme.colors.secondaryBlack,
  },
  underlineView: {
    width: screenWidth,
    height: 1,
    backgroundColor: theme.colors.gray1,
    marginVertical: 10,
  },
  secondaryCont: {
    width: '100%',
    paddingHorizontal: 15,
  },
});
