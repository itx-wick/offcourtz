import React, {useState} from 'react';
import {
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {View, Text} from 'react-native';
import {theme} from '../../theme';
import {
  fontFamily,
  fontSize,
  fontWeight,
} from '../../constants/fontDecorations';
import Modal from 'react-native-modal';
import DropDown from '../../components/dropDownView';
import {screenWidth} from '../../constants';
import {svgImages} from '../../helpers';
import {screens} from '../../config';
import {SvgXml} from 'react-native-svg';
import Button from '../../components/button';
import {Commons} from '../../utils';
import {TextInput} from 'react-native-gesture-handler';
function CreateNewPost({navigation}) {
  const [selectedItem, setSelectedItem] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  function handleSelection(e) {
    setSelectedItem(e);
  }
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
          <Text style={styles.headerTitle}>Create New Post</Text>
        </View>
        <View style={styles.underlineView} />
      </View>
      {!modalVisible && (
        <ScrollView>
          <View style={styles.secondaryCont}>
            <View style={{marginTop: 15}}>
              <ImageBackground
                style={{
                  height: 0.45 * screenWidth,
                  borderWidth: 2,
                  borderColor: theme.colors.gray1,
                  borderRadius: 15,
                  marginTop: 5,
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                }}>
                <View style={{height: 50}}>
                  <SvgXml
                    width="60"
                    height="60"
                    xml={svgImages.imagePlaceHolder}
                  />
                </View>
                <Button
                  title={'ADD PHOTO'}
                  iconHeight={16}
                  iconWidth={16}
                  icon={svgImages.plus}
                  onPress={() => navigation.navigate(screens.login)}
                  btnWidth={screenWidth * 0.4}
                  btnHeight={45}
                  titleColor={theme.colors.white}
                  backgroundColor={theme.colors.secondaryBlack}
                />
              </ImageBackground>
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
                Post To
              </Text>
              <DropDown
                width={0.92 * screenWidth}
                height={0.12 * screenWidth}
                borderWidth={2}
                borderColor={theme.colors.gray1}
                borderRadius={0.12 * screenWidth}
                icon={svgImages.caretDown}
                title={'Choose '}
                type={'Post'}
                data={Commons.communityFilter}
                selectedItem={selectedItem.title}
                onPressItem={handleSelection}
                dropDownListStyle={{
                  maxHeight: 0.15 * screenWidth,
                }}
                flatListView={{
                  maxHeight: 0.15 * screenWidth,
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
                Caption
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
                }}
                multiline
                placeholderTextColor={theme.colors.greyText}
                placeholder="Write a caption..."
              />
            </View>
            <View
              style={{
                width: 0.92 * screenWidth,
                alignItems: 'center',
                marginTop: 15,
              }}>
              <Button
                title={'CREATE POST'}
                onPress={() => setModalVisible(!modalVisible)}
                btnWidth={screenWidth * 0.92}
                btnHeight={0.14 * screenWidth}
                titleColor={theme.colors.white}
                backgroundColor={theme.colors.primary}
              />
            </View>
          </View>
        </ScrollView>
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
              Post Created
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
              Your have successfully created the post!
            </Text>
            <View style={{marginVertical: 5}}>
              <Button
                title={'DONE'}
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

export default CreateNewPost;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: theme.colors.whisper,
  },
  headerMainContainer: {
    width: screenWidth,
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 0.12 * screenWidth : 0.06 * screenWidth,
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
