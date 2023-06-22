import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Image, View} from 'react-native';
import {svgImages} from '../../helpers';
import {SvgXml} from 'react-native-svg';
import {theme} from '../../theme';
import {fontFamily, fontSize} from '../../constants/fontDecorations';
import userPlaceholder from '../../assets/images/userImg1.png';
import {screenWidth} from '../../constants';
import FastImage from 'react-native-fast-image';

function NotificationListItem({item, index, status}) {
  return (
    <View key={index} style={styles.itemContainer}>
      <FastImage source={userPlaceholder} style={styles.userImage} />
      <View style={styles.itemSecCont}>
        <View>
          <Text style={styles.listItemTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.listItemTime}>{item.time}</Text>
        </View>
        {item.status === 1 && (
          <Image
            source={require('../../assets/images/onlineDot.png')}
            style={{width: 12, height: 12}}
          />
        )}
        {item.status === 3 && (
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => {}}>
              <SvgXml
                xml={svgImages.cancelIcon}
                width={37}
                height={37}
                style={styles.listItemIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <SvgXml
                xml={svgImages.acceptIcon}
                width={37}
                height={37}
                style={styles.listItemIcon}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

export default NotificationListItem;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  itemSecCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '84%',
  },
  itemName: {
    fontFamily: fontFamily.argentum_sans,
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
    width: 0.5 * screenWidth,
    fontFamily: fontFamily.argentum_sans,
    fontSize: fontSize.verbiage_19,
    color: theme.colors.black,
    textTransform: 'capitalize',
  },
  listItemTime: {
    fontFamily: fontFamily.argentum_sans,
    fontSize: fontSize.verbiage_13,
    color: theme.colors.greyText,
    marginTop: 5,
  },
  listItemIcon: {
    marginHorizontal: 3,
  },
  listItemSeperator: {
    height: 1,
    width: screenWidth * 0.72,
    alignSelf: 'flex-end',
    backgroundColor: theme.colors.gray1,
    marginRight: 15,
  },
  cancelReqBtn: {
    padding: 10,
    borderWidth: 2,
    borderColor: theme.colors.gray1,
    borderRadius: 0.12 * screenWidth,
  },
  cancelReqBtnText: {
    fontFamily: fontFamily.argentum_sans,
    fontSize: fontSize.verbiage_14,
    color: theme.colors.black,
    paddingHorizontal: 5,
  },
});
