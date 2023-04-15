import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {
  fontFamily,
  fontSize,
  fontWeight,
} from '../../constants/fontDecorations';
import {theme} from '../../theme';
import {screenWidth} from '../../constants';
import {svgImages} from '../../helpers';
import {SvgXml} from 'react-native-svg';
import {TextInput} from 'react-native-gesture-handler';
function Post({item, index}) {
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
        <SvgXml xml={svgImages.threeDots} />
      </View>
      {/* <TouchableOpacity
        style={{
          position: 'absolute',
          width: 0.08 * screenWidth,
          height: 0.08 * screenWidth,
          alignItems: 'flex-end',
          top: 15,
          right: 20,
        }}>
        <SvgXml xml={svgImages.threeDots} />
      </TouchableOpacity> */}
      <View style={{padding: 15}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={item.userImage} style={styles.userImage} />
          <View>
            <Text
              style={{
                fontFamily: fontFamily.argentum_sans,
                fontSize: fontSize.verbiage_20,
              }}>
              {item.name}
            </Text>
            <Text
              style={{
                fontFamily: fontFamily.argentum_sans,
                fontSize: fontSize.verbiage_14,
                color: theme.colors.greyText,
                marginVertical: 3,
              }}>
              {item.postTime}
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
          }}>
          {item.desc}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
        </View>
      </View>
      <Image
        source={item.image}
        style={{width: screenWidth, height: 0.7 * screenWidth}}
      />
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: theme.colors.white,
          padding: 15,
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: fontFamily.argentum_sans,
            color: theme.colors.greyText,
          }}>{`${item.likes} Likes`}</Text>
        <SvgXml
          xml={svgImages.smallDot}
          style={{height: 10, width: 10, marginHorizontal: 10}}
        />
        <Text
          style={{
            fontFamily: fontFamily.argentum_sans,
            color: theme.colors.greyText,
          }}>{`${item.comments} Comments`}</Text>
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
          <Image source={item.userImage} />
          <TextInput
            style={{
              width: 0.82 * screenWidth,
              borderWidth: 1,
              borderColor: theme.colors.gray1,
              padding: 10,
              fontFamily: fontFamily.argentum_sans,
              fontSize: fontSize.verbiage_14,
              fontWeight: fontWeight[400],
              borderRadius: 5,
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
  },
});
