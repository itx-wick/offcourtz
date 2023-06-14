import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Image, View} from 'react-native';
import moment from 'moment';
import {svgImages} from '../../helpers';
import {SvgXml} from 'react-native-svg';
import {theme} from '../../theme';
import {fontFamily, fontSize} from '../../constants/fontDecorations';
import userPlaceholder from '../../assets/images/userImg1.png';
import {screenWidth} from '../../constants';

function RequestListItem({item, index, status}) {
  let time = moment(item.createdAt).fromNow();
  return (
    <View key={index} style={styles.itemContainer}>
      <Image
        source={
          item.receiver.image ? {uri: item.receiver.image} : userPlaceholder
        }
        style={styles.userImage}
      />
      <View style={styles.itemSecCont}>
        <View>
          <Text style={styles.listItemTitle}>{item.receiver.firstName}</Text>
          <Text style={styles.listItemTime}>{time}</Text>
        </View>
        {status === 'Recieved' ? (
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
        ) : (
          <TouchableOpacity style={styles.cancelReqBtn}>
            <Text style={styles.cancelReqBtnText}>Cancel Request</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export default RequestListItem;

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
    fontFamily: fontFamily.argentum_sans,
    fontSize: fontSize.verbiage_19,
    color: theme.colors.black,
    textTransform: 'capitalize',
  },
  listItemTime: {
    fontFamily: fontFamily.argentum_sans,
    fontSize: fontSize.verbiage_13,
    color: theme.colors.greyText,
    textTransform: 'capitalize',
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
