import React from 'react';
import {Image, Platform, StyleSheet, TouchableOpacity} from 'react-native';
import {View, Text} from 'react-native';
import {theme} from '../../theme';
import {
  fontFamily,
  fontSize,
  fontWeight,
} from '../../constants/fontDecorations';
import {screenWidth} from '../../constants';
import {svgImages} from '../../helpers';
import {screens} from '../../config';
import {logout} from '../../redux/reducers/authSlice';
import {SvgXml} from 'react-native-svg';
import {useDispatch, useSelector} from 'react-redux';
import {Commons} from '../../utils';
function ManageCommunity({navigation}) {
  const dispatch = useDispatch();

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
          <Text style={styles.headerTitle}>Manage Community</Text>
          <TouchableOpacity
            onPress={() => {
              dispatch(logout());
              Commons.reset(navigation, screens.authStack);
            }}
            style={{position: 'absolute', right: 15}}>
            <SvgXml width="34" height="34 " xml={svgImages.logout} />
          </TouchableOpacity>
        </View>
        <View style={styles.underlineView} />
      </View>
      <View style={styles.secondaryCont}>
        <TouchableOpacity
          onPress={() => navigation.navigate(screens.myFriends)}
          style={{
            width: 0.92 * screenWidth,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 15,
            paddingRight: 5,
            borderBottomWidth: 2,
            borderBottomColor: theme.colors.gray1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/images/users.png')}
              style={{height: 32, width: 32}}
            />
            <Text
              style={{
                fontFamily: fontFamily.argentum_sans,
                fontSize: fontSize.verbiage_20,
                fontWeight: fontWeight[400],
                marginHorizontal: 10,
              }}>
              My Friends
            </Text>
          </View>
          <Image
            source={require('../../assets/images/caretRight.png')}
            style={{height: 22, width: 22}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(screens.manageGroups)}
          style={{
            width: 0.92 * screenWidth,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 15,
            paddingRight: 5,
            borderBottomWidth: 2,
            borderBottomColor: theme.colors.gray1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/images/users.png')}
              style={{height: 32, width: 32}}
            />
            <Text
              style={{
                fontFamily: fontFamily.argentum_sans,
                fontSize: fontSize.verbiage_20,
                fontWeight: fontWeight[400],
                marginHorizontal: 10,
              }}>
              Manage Groups
            </Text>
          </View>
          <Image
            source={require('../../assets/images/caretRight.png')}
            style={{height: 22, width: 22}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(screens.friendRequests)}
          style={{
            width: 0.92 * screenWidth,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 15,
            paddingRight: 5,
            borderBottomWidth: 2,
            borderBottomColor: theme.colors.gray1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/images/friendReq.png')}
              style={{height: 32, width: 32}}
            />
            <Text
              style={{
                fontFamily: fontFamily.argentum_sans,
                fontSize: fontSize.verbiage_20,
                fontWeight: fontWeight[400],
                marginHorizontal: 10,
              }}>
              Friend/Group Requests
            </Text>
          </View>
          <Image
            source={require('../../assets/images/caretRight.png')}
            style={{height: 22, width: 22}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(screens.challengeRequests)}
          style={{
            width: 0.92 * screenWidth,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 15,
            paddingRight: 5,
            borderBottomWidth: 2,
            borderBottomColor: theme.colors.gray1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/images/flame.png')}
              style={{height: 32, width: 32}}
            />
            <Text
              style={{
                fontFamily: fontFamily.argentum_sans,
                fontSize: fontSize.verbiage_20,
                fontWeight: fontWeight[400],
                marginHorizontal: 10,
              }}>
              Challenges Requests
            </Text>
          </View>
          <Image
            source={require('../../assets/images/caretRight.png')}
            style={{height: 22, width: 22}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ManageCommunity;

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
