import React from 'react';
import {View, Text, Image, StyleSheet, Platform} from 'react-native';
import {useToast} from 'react-native-toast-notifications';
import {
  fontFamily,
  fontSize,
  fontWeight,
} from '../../constants/fontDecorations';
import {theme} from '../../theme';
import {screenWidth} from '../../constants';
import {svgImages} from '../../helpers';
import userPlaceholder from '../../assets/images/user.jpeg';
import {setLoader} from '../../redux/reducers/commonSlice';
import ApiService from '../../services/ApiService';
import {END_POINTS, screens} from '../../config';
import {SvgXml} from 'react-native-svg';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import moment from 'moment/moment';
import {useDispatch, useSelector} from 'react-redux';
function Post({item, index}) {
  const toast = useToast();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.Auth.user);
  const authToken = useSelector(state => state.Auth.token);
  const myFriends = useSelector(state => state.Auth.friends);
  const [isExist, setIsExist] = React.useState(false);

  React.useEffect(() => {
    console.log(item);
    const exist = myFriends.some(obj => obj?._id === item.user._id);
    setIsExist(exist);
  }, [myFriends]);

  const showToast = (type, msg, duration) => {
    toast.show(msg, {
      type: type,
      placement: 'bottom',
      duration: duration,
      offset: 30,
      animationType: 'zoom-in',
    });
  };

  const reqSent = async id => {
    try {
      let body = {
        receiver: id,
      };
      dispatch(setLoader(true));
      await ApiService.post(END_POINTS.sentReq, body, authToken)
        .then(res => {
          console.log('Response', JSON.stringify(res, null, 2));
          dispatch(setLoader(false));
        })
        .catch(err => {
          dispatch(setLoader(false));
          showToast('normal', err, 3000);
          console.log('promise error', err);
        });
    } catch (error) {
      showToast('normal', error, 3000);
      console.log('try/catch', error);
    }
  };

  return (
    <View
      style={{
        backgroundColor: theme.colors.white,
        marginTop: 5,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          position: 'absolute',
          top: 15,
          right: 15,
        }}>
        {/* {!isExist && auth?._id !== item.user._id && ( */}
        <TouchableOpacity
          onPress={() => {
            console.log('Item', item._id);
            // reqSent(item._id);
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 5,
              marginHorizontal: 10,
            }}>
            <SvgXml xml={svgImages.userCirclePlus} />
            <Text
              style={{
                fontFamily: fontFamily.argentum_sans,
                fontSize: fontSize.verbiage_14,
                fontWeight: fontWeight[400],
                color: theme.colors.black,
                marginHorizontal: 3,
              }}>
              Add as friend
            </Text>
          </View>
        </TouchableOpacity>
        {/* )} */}
        <SvgXml xml={svgImages.threeDots} />
      </View>
      <View style={{padding: 15}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={item.user.image ? {uri: item.user.image} : userPlaceholder}
            style={styles.userImage}
          />
          <View>
            <Text
              style={{
                fontFamily: fontFamily.argentum_sans,
                fontSize: fontSize.verbiage_20,
                color: theme.colors.black,
              }}>
              {item.user.firstName}
            </Text>
            <Text
              style={{
                fontFamily: fontFamily.argentum_sans,
                fontSize: fontSize.verbiage_14,
                color: theme.colors.greyText,
                marginVertical: 3,
                textTransform: 'capitalize',
              }}>
              {moment(item.createdAt).fromNow()}
            </Text>
          </View>
        </View>
        <Text
          style={{
            fontFamily: fontFamily.argentum_sans,
            fontSize: fontSize.verbiage_18,
            fontWeight: fontWeight[300],
            marginTop: 15,
            marginBottom: 10,
            color: theme.colors.black,
          }}>
          {item.caption}
        </Text>
        {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 2,
            }}>
            <SvgXml
              xml={svgImages.clockIcon}
              style={{marginRight: 3}}
              stroke={theme.colors.primary}
            />
            <Text
              style={{
                fontFamily: fontFamily.argentum_sans,
                fontSize: fontSize.verbiage,
                fontWeight: fontWeight[400],
                color: theme.colors.greyText,
              }}>
              {item.playTime}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 2,
              marginHorizontal: 5,
            }}>
            <SvgXml xml={svgImages.fire} style={{marginRight: 3}} />
            <Text
              style={{
                fontFamily: fontFamily.argentum_sans,
                fontSize: fontSize.verbiage,
                fontWeight: fontWeight[400],
                color: theme.colors.greyText,
              }}>
              {item.playTechnique}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 2,
              marginHorizontal: 5,
            }}>
            <SvgXml xml={svgImages.tenisBallIcon} style={{marginRight: 3}} />
            <Text
              style={{
                fontFamily: fontFamily.argentum_sans,
                fontSize: fontSize.verbiage,
                fontWeight: fontWeight[400],
                color: theme.colors.greyText,
              }}>
              {item.playCount}
            </Text>
          </View>
        </View> */}
      </View>
      <Image
        source={{uri: item.image}}
        style={{width: screenWidth, height: 0.7 * screenWidth}}
      />
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: theme.colors.white,
          padding: Platform.OS === 'ios' ? 15 : 10,
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: fontFamily.argentum_sans,
            color: theme.colors.greyText,
          }}>
          {`${item.likes.length} Likes`}
        </Text>
        <SvgXml
          xml={svgImages.smallDot}
          style={{height: 10, width: 10, marginHorizontal: 10}}
        />
        <Text
          style={{
            fontFamily: fontFamily.argentum_sans,
            color: theme.colors.greyText,
          }}>{`${item.comments.length} Comments`}</Text>
      </View>
      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: theme.colors.gray1,
          paddingTop: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 15,
          }}>
          <View style={{alignItems: 'center', marginRight: 30}}>
            <Image
              source={require('../../assets/images/thumbsUp.png')}
              style={{height: 24, width: 24}}
            />
            <Text
              style={{
                fontFamily: fontFamily.argentum_sans,
                color: theme.colors.greyText,
                marginVertical: 5,
              }}>
              Like
            </Text>
          </View>
          <View style={{alignItems: 'center', marginRight: 30}}>
            <Image
              source={require('../../assets/images/chatIcon.png')}
              style={{height: 24, width: 24}}
            />
            <Text
              style={{
                fontFamily: fontFamily.argentum_sans,
                color: theme.colors.greyText,
                marginVertical: 5,
              }}>
              Comment
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('../../assets/images/shareIcon.png')}
              style={{height: 24, width: 24}}
            />
            <Text
              style={{
                fontFamily: fontFamily.argentum_sans,
                color: theme.colors.greyText,
                marginVertical: 5,
              }}>
              Share
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Image
            source={item.user.image ? {uri: item.user.image} : userPlaceholder}
            style={{
              width: 0.09 * screenWidth,
              height: 0.09 * screenWidth,
              borderRadius: 0.09 * screenWidth,
              resizeMode: 'center',
              borderColor: theme.colors.greyText,
              borderWidth: 1,
            }}
          />
          <TextInput
            style={{
              width: 0.84 * screenWidth,
              borderWidth: 1,
              borderColor: theme.colors.gray1,
              padding: Platform.OS === 'ios' ? 10 : 5,
              fontFamily: fontFamily.argentum_sans,
              fontSize: fontSize.verbiage_14,
              fontWeight: fontWeight[400],
              borderRadius: 5,
              color: theme.colors.black,
            }}
            placeholder="Leave your comment here..."
            placeholderTextColor={theme.colors.greyText}
          />
        </View>
      </View>
    </View>
  );
}

export default Post;

const styles = StyleSheet.create({
  userImage: {
    width: 0.12 * screenWidth,
    height: 0.12 * screenWidth,
    borderRadius: 0.12 * screenWidth,
    marginRight: 10,
    resizeMode: 'contain',
    borderColor: theme.colors.greyText,
    borderWidth: 1,
  },
});
