import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Video from 'react-native-video';
import dummyVideo from '../assets/videos/dummyVideo.mp4';
import {screenHeight, screenWidth} from '../constants';
import {StyleSheet} from 'react-native';
import {theme} from '../theme';
import Images from '../constants/Images';
import {fontFamily, fontSize, fontWeight} from '../constants/fontDecorations';
import {SvgXml} from 'react-native-svg';
import {svgImages} from '../helpers';
import {Commons} from '../utils';
import AppFlatlist from '../components/appFlatlist';
function Detail({navigation}) {
  const videoPlayer = React.useRef(null);
  const [paused, setPaused] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);
  const [data, setData] = React.useState(Commons.favorites);

  const togglePlaying = () => {};
  function secondsToTime(time) {
    return time / 60 + ':' + (((time % 60 < 10 ? '0' : '') * time) % 60);
  }

  const navigateBack = () => {
    navigation.goBack();
  };

  const flatListItemSeparator = () => {
    return <View style={styles.listItemSeperator} />;
  };
  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          height: screenHeight / 2.5,
          width: screenWidth,
          backgroundColor: theme.colors.black,
        }}>
        <TouchableOpacity
          onPress={navigateBack}
          style={{position: 'absolute', top: 60, left: 15, zIndex: 1}}>
          <Images.back height={28} width={28} fill={theme.colors.white} />
        </TouchableOpacity>
        <Video
          ref={ref => (videoPlayer.current = ref)}
          source={dummyVideo} // the video file
          style={styles.player}
        />
      </View>
      <View style={styles.sectionCont}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
          }}>
          <View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  marginHorizontal: 3,
                  fontFamily: fontFamily.argentum_sans,
                  fontWeight: fontWeight[500],
                  fontSize: fontSize.verbiage_22,
                  color: theme.colors.black,
                  marginTop: 15,
                }}>
                Backhand Techniques
              </Text>
              <Images.info height={24} width={24} style={{marginTop: 15}} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 5,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: 10,
                }}>
                <Images.clock height={20} width={20} />
                <Text
                  style={{
                    marginRight: 3,
                    fontFamily: fontFamily.argentum_sans,
                    fontWeight: fontWeight[400],
                    fontSize: fontSize.verbiage,
                    color: theme.colors.greyText,
                  }}>
                  10 Mins
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Images.fire height={20} width={20} />
                <Text
                  style={{
                    marginHorizontal: 3,
                    fontFamily: fontFamily.argentum_sans,
                    fontWeight: fontWeight[400],
                    fontSize: fontSize.verbiage,
                    color: theme.colors.greyText,
                  }}>
                  Technique
                </Text>
              </View>
            </View>
          </View>
          <Images.like height={50} width={50} />
        </View>
        <View style={{marginTop: 10, paddingHorizontal: 15}}>
          <Text
            style={{
              textAlign: 'justify',
              fontFamily: fontFamily.argentum_sans,
              fontWeight: fontWeight[400],
              fontSize: fontSize.verbiage,
              color: theme.colors.greyText,
            }}
            numberOfLines={3}>
            Is simply dummy text of the printing and typesetting industry. Lorem
            Ipsum has been the industry's standard dummy text. Is simply dummy
            text of the printing and typesetting industry. Lorem Ipsum has been
            the industry's standard dummy text.
          </Text>
        </View>
        <View
          style={{
            height: 1,
            width: screenWidth,
            backgroundColor: theme.colors.greyText,
            marginTop: 20,
            marginBottom: 15,
          }}
        />
        <Text
          style={{
            fontFamily: fontFamily.argentum_sans,
            fontWeight: fontWeight[500],
            fontSize: fontSize.verbiage_20,
            color: theme.colors.black,
            paddingHorizontal: 15,
          }}>
          Videos You May Like
        </Text>
        <AppFlatlist
          style={{
            marginTop: 15,
            marginBottom: 10,
          }}
          data={data}
          ListFooterComponent={<View />}
          ItemSeparatorComponent={flatListItemSeparator}
          height={screenHeight}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={{
                paddingHorizontal: 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: 20,
                marginVertical: 5,
              }}
              onPress={() => {}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../assets/images/post1.png')}
                  style={{
                    width: 95,
                    height: 75,
                    borderRadius: 15,
                  }}
                />
                <View style={{paddingHorizontal: 10, width: 0.5 * screenWidth}}>
                  <Text
                    style={{
                      fontFamily: fontFamily.argentum_sans,
                      fontSize: fontSize.verbiage_16,
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                    }}
                    numberOfLines={1}>
                    {`${item.title}`}
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    {item.time && (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginVertical: 5,
                          marginRight: 7,
                        }}>
                        <Images.clock height={20} width={20} />
                        <Text
                          style={{
                            fontFamily: fontFamily.argentum_sans,
                            fontSize: fontSize.verbiage,
                          }}>{`${item.time}`}</Text>
                      </View>
                    )}
                    {item.technique && (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginVertical: 5,
                        }}>
                        <Images.fire height={20} width={20} />
                        <Text
                          style={{
                            fontFamily: fontFamily.argentum_sans,
                            fontSize: fontSize.verbiage,
                          }}>{`${item.technique}`}</Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>
              <TouchableOpacity>
                <Image
                  source={require('../assets/images/emptyHeart.png')}
                  style={{
                    width: 50,
                    height: 50,
                    marginHorizontal: 3,
                    marginBottom: 15,
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

export default Detail;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: theme.colors.whisper,
  },
  sectionCont: {
    width: '100%',
  },
  controls: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: 48,
    left: 0,
    bottom: 0,
    right: 0,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  player: {
    width: '100%',
    height: '100%',
  },
  listItemSeperator: {
    height: 1,
    width: screenWidth * 0.92,
    backgroundColor: theme.colors.gray1,
    marginHorizontal: 15,
    marginVertical: 5,
  },
});
