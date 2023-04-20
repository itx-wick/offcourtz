import React, {useState, useRef} from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {View, Text} from 'react-native';
import {theme} from '../../theme';
import {
  fontFamily,
  fontSize,
  fontWeight,
} from '../../constants/fontDecorations';
import Modal from 'react-native-modal';
import userPlaceholder from '../../assets/images/user.jpeg';
import {screenHeight, screenWidth} from '../../constants';
import {svgImages} from '../../helpers';
import {screens} from '../../config';
import {SvgXml} from 'react-native-svg';
import Button from '../../components/button';
import {Commons} from '../../utils';
import {TextInput} from 'react-native-gesture-handler';
import {FlatList} from 'react-native';
import {Image} from 'react-native';
function CreateNewGroup({navigation}) {
  const searchRef = useRef();
  const [search, setSearch] = useState('');
  const [data, setData] = useState(Commons.friendsData);
  const [selectedItem, setSelectedItem] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  function handleSelection(e) {
    setSelectedItem(e);
  }

  const onSearch = search => {
    if (search !== '') {
      let tempData = data.filter(item => {
        return item.title.toLowerCase().indexOf(search.toLowerCase()) > -1;
      });
      setData(tempData);
    } else {
      setData(Commons.friendsData);
    }
  };

  const renderListItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          data[index].selected = !item.selected;
          setData([...data]);
        }}
        style={styles.listItem}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={userPlaceholder} style={styles.userImage} />
          <Text style={styles.listItemTitle}>{item.title}</Text>
        </View>
        <SvgXml
          xml={
            item.selected
              ? svgImages.activeCheckIcon
              : svgImages.inActiveCheckIcon
          }
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
          <Text style={styles.headerTitle}>Create New Group</Text>
        </View>
        <View style={styles.underlineView} />
      </View>

      {!modalVisible && (
        <>
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
                  Group Name
                </Text>
                <TextInput
                  width={0.92 * screenWidth}
                  height={0.12 * screenWidth}
                  borderWidth={2}
                  borderColor={theme.colors.gray1}
                  borderRadius={0.12 * screenWidth}
                  placeholderTextColor={theme.colors.greyText}
                  placeholder="England Tennis Group"
                  style={{
                    paddingHorizontal: 15,
                    fontFamily: fontFamily.argentum_sans,
                    fontSize: fontSize.verbiage,
                    color: theme.colors.greyText,
                  }}
                />
              </View>
              <View
                style={[
                  styles.underlineView,
                  {width: 0.92 * screenWidth, marginVertical: 20},
                ]}
              />
              <View>
                <Text
                  style={{
                    fontFamily: fontFamily.argentum_sans,
                    fontSize: fontSize.verbiage_20,
                    fontWeight: fontWeight[700],
                    color: theme.colors.black,
                  }}>
                  Add Participants
                </Text>
                <View style={styles.searchInputContainer}>
                  <Ionicons
                    name={'ios-search'}
                    size={24}
                    color={theme.colors.primary}
                    style={styles.searchIcon}
                  />
                  <TextInput
                    value={search}
                    ref={searchRef}
                    onChangeText={txt => {
                      onSearch(txt);
                      setSearch(txt);
                    }}
                    style={styles.searchInput}
                    placeholder="Search Participants"
                    placeholderTextColor={theme.colors.greyText}
                  />
                </View>
                <FlatList
                  data={data}
                  showsVerticalScrollIndicator={false}
                  ListFooterComponent={<View style={{height: 10}} />}
                  keyExtractor={item => item.id}
                  contentContainerStyle={styles.listContentContainer}
                  ItemSeparatorComponent={flatListItemSeparator}
                  renderItem={renderListItem}
                  style={{height: 0.5 * screenWidth}}
                />
              </View>
            </View>
          </ScrollView>
          <View
            style={{
              width: screenWidth,
              alignItems: 'center',
            }}>
            <Button
              title={'CREATE GROUP'}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
              btnWidth={screenWidth * 0.92}
              btnHeight={0.14 * screenWidth}
              titleColor={theme.colors.white}
              backgroundColor={theme.colors.primary}
              btnStyle={{
                position: 'absolute',
                bottom: 15,
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
              Group Created
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
              Your have successfully created the group!
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

export default CreateNewGroup;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: theme.colors.whisper,
  },
  headerMainContainer: {
    width: screenWidth,
    alignItems: 'center',
    marginTop: 0.14 * screenWidth,
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
  searchInputContainer: {
    width: screenWidth * 0.92,
    height: 0.12 * screenWidth,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.gray1,
    borderRadius: screenHeight * 0.14,
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: theme.colors.white,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: fontSize.verbiage_medium,
    fontFamily: fontFamily.argentum_sans,
    fontWeight: fontWeight[500],
  },
  userImage: {
    width: 0.12 * screenWidth,
    height: 0.12 * screenWidth,
    borderRadius: 0.12 * screenWidth,
    borderWidth: 2,
    marginRight: 10,
    resizeMode: 'contain',
    borderColor: theme.colors.gray1,
  },
  listItem: {
    flexDirection: 'row',
    width: screenWidth * 0.92,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingVertical: 10,
  },
  listItemTitle: {
    fontFamily: fontFamily.argentum_sans,
    fontSize: fontSize.verbiage_medium,
    color: theme.colors.black,
    textTransform: 'capitalize',
  },
  listContentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
