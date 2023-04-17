import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import { theme } from '../../theme';
import {
  fontFamily,
  fontSize,
  fontWeight,
} from '../../constants/fontDecorations';
import userPlaceholder from '../../assets/images/userImg1.png';
import { screenWidth } from '../../constants';
import { svgImages } from '../../helpers';
import { screens } from '../../config';
import { SvgXml } from 'react-native-svg';
import { Commons } from '../../utils';
function FriendRequests({ navigation }) {
  const [listTab, setListTab] = useState(Commons.listTab);
  const [status, setStatus] = useState('Recieved');
  const [dataList, setDataList] = useState(Commons.recievedListData);
  const setStatusFilter = status => {
    setStatus(status);
  };

  useEffect(() => {
    if (status === "Recieved") {
      setDataList(Commons.recievedListData)
    } else {
      setDataList(Commons.sentListData)
    }
  }, [status])

  const navigateBack = () => {
    navigation.goBack();
  };

  const renderItem = ({ item, index }) => {
    return (
      <View key={index} style={styles.itemContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={userPlaceholder} style={styles.userImage} />
          <Text style={styles.listItemTitle}>{item.title}</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerMainContainer}>
        <View style={styles.headContainer}>
          <TouchableOpacity
            onPress={navigateBack}
            style={{ position: 'absolute', left: 15 }}>
            <SvgXml width="36" height="36 " xml={svgImages.back} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Friend Requests</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(screens.groupRequests)}
            style={{ position: 'absolute', right: 15 }}>
            <Text
              style={{
                fontFamily: fontFamily.argentum_sans,
                fontSize: fontSize.verbiage,
                fontWeight: fontWeight[400],
                color: theme.colors.secondaryBlack,
              }}>
              Groups
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.secondaryCont}>
        <View style={styles.listTab}>
          {listTab.map(e => (
            <TouchableOpacity
              style={[
                styles.btnTab,
                status === e.status && styles.btnTabActive,
              ]}
              onPress={() => setStatusFilter(e.status)}>
              <Text style={styles.textTab}>{e.status}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <FlatList
          data={dataList}
          keyExtractor={(e, i) => i.toString()}
          renderItem={renderItem} />
      </View>
    </View>
  );
}

export default FriendRequests;

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
    marginVertical: 15,
  },
  secondaryCont: {
    width: '100%',
    paddingHorizontal: 15,
  },
  listTab: {
    width: 0.92 * screenWidth,
    flexDirection: 'row',
    backgroundColor: theme.colors.white,
    height: 0.14 * screenWidth,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0.14 * screenWidth,
    marginTop: 15,
  },
  btnTab: {
    // width: (0.92 * screenWidth) / 2.15,
    // height: 0.09 * screenWidth,
    width: '50%',
    height: 0.11 * screenWidth,
    borderRadius: 0.11 * screenWidth,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTab: {
    fontFamily: fontFamily.argentum_sans,
    fontSize: fontSize.verbiage_medium,
    fontWeight: fontWeight[400],
  },
  btnTabActive: {
    backgroundColor: theme.colors.primary,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 15
  },
  itemName: {
    fontFamily: fontFamily.argentum_sans
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
  listItemTitle: {
    fontFamily: fontFamily.argentum_sans,
    fontSize: fontSize.verbiage_medium,
    color: theme.colors.black,
    textTransform: 'capitalize',
  },
});
