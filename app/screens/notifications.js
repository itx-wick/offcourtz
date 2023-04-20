import React, {useState, useRef} from 'react';
import {Image, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {View, Text} from 'react-native';
import {theme} from '../theme';
import {fontFamily, fontSize} from '../constants/fontDecorations';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {screenHeight, screenWidth} from '../constants';
import userPlaceholder from '../assets/images/user.jpeg';
import {Commons} from '../utils';
import {svgImages} from '../helpers';
import {screens} from '../config';
import {SvgXml} from 'react-native-svg';
import {FlatList} from 'react-native';
import ListEmptyComponent from '../components/listEmptyComponent';
import RequestListItem from '../components/requestListItem';
import NotificationListItem from '../components/notificationListItem';
function Notifications({navigation}) {
  const [dataList, setDataList] = useState(Commons.notifications);
  const navigateBack = () => {
    navigation.goBack();
  };

  const flatListItemSeparator = () => {
    return <View style={styles.listItemSeperator} />;
  };

  const listEmptyComponent = () => {
    return <ListEmptyComponent message={'No notifications found'} />;
  };

  const renderItem = ({item, index}) => {
    return <NotificationListItem item={item} index={index} />;
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
          <Text style={styles.headerTitle}>Notifications</Text>
        </View>
        <View style={styles.underlineView} />
      </View>

      <View style={styles.secondaryCont}>
        <FlatList
          data={dataList}
          keyExtractor={(e, i) => i.toString()}
          renderItem={renderItem}
          ItemSeparatorComponent={flatListItemSeparator}
          ListEmptyComponent={listEmptyComponent}
          style={styles.flatListStyle}
        />
      </View>
    </View>
  );
}

export default Notifications;

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
  userImage: {
    width: 0.12 * screenWidth,
    height: 0.12 * screenWidth,
    borderRadius: 0.12 * screenWidth,
    borderWidth: 2,
    marginRight: 10,
    resizeMode: 'contain',
    borderColor: theme.colors.gray1,
  },
  searchInputContainer: {
    width: screenWidth * 0.92,
    height: 0.12 * screenWidth,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.75,
    borderColor: theme.colors.gray1,
    borderRadius: 0.12 * screenWidth,
    backgroundColor: theme.colors.white,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontFamily: fontFamily.argentum_sans,
    fontSize: fontSize.verbiage,
    paddingRight: 15,
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
  listItemSeperator: {
    height: 1,
    width: screenWidth * 0.72,
    alignSelf: 'flex-end',
    backgroundColor: theme.colors.gray1,
    marginRight: 15,
  },
});
