import React from 'react';
import {View, Text, TouchableOpacity, Image, Platform} from 'react-native';
import Video from 'react-native-video';
import dummyVideo from '../assets/videos/dummyVideo.mp4';
import {screenHeight, screenWidth} from '../constants';
import {StyleSheet} from 'react-native';
import {theme} from '../theme';
import Images from '../constants/images';
import {fontFamily, fontSize, fontWeight} from '../constants/fontDecorations';
import {SvgXml} from 'react-native-svg';
import {svgImages} from '../helpers';
import {Commons} from '../utils';
import AppFlatlist from '../components/appFlatlist';
import {useDispatch, useSelector} from 'react-redux';
import {likeItem, updateFavourite} from '../redux/reducers/favouriteSlice';
function Detail({route, navigation}) {
  const dispatch = useDispatch();
  const from = route.params?.from;
  const favourites = useSelector(state => state.Favourites.favourites);
  const videoPlayer = React.useRef(null);
  const [paused, setPaused] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);
  const [isLiked, setIsLiked] = React.useState(false);
  const [isItemLiked, setIsItemLiked] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [data, setData] = React.useState(Commons.favorites);

  const togglePlaying = () => {};
  function secondsToTime(time) {
    return time / 60 + ':' + (((time % 60 < 10 ? '0' : '') * time) % 60);
  }

  const navigateBack = () => {
    navigation.goBack();
  };

  const handleSelectItem = id => {
    const newSelectedItems = [...selectedItems];
    const index = newSelectedItems.indexOf(id);
    if (index === -1) {
      newSelectedItems.push(id);
    } else {
      newSelectedItems.splice(index, 1);
    }
    setSelectedItems(newSelectedItems);
  };

  const flatListItemSeparator = () => {
    return <View style={styles.listItemSeperator} />;
  };

  function checkLastWord(str) {
    // Split the string into an array of words
    var words = str.split(' ');

    // Get the last word in the array
    var lastWord = words[words.length - 1];

    // Return the last word
    return lastWord;
  }

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
          style={{
            position: 'absolute',
            top: Platform.OS === 'ios' ? 60 : 25,
            left: 15,
            zIndex: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={require('../assets/images/back.png')}
            style={{width: 28, height: 28}}
          />
          <Text
            style={{
              marginLeft: 5,
              fontFamily: fontFamily.argentum_sans,
              fontWeight: fontWeight[400],
              fontSize: fontSize.verbiage,
              color: theme.colors.white,
            }}>
            {from}
          </Text>
        </TouchableOpacity>

        <Video
          ref={ref => (videoPlayer.current = ref)}
          source={dummyVideo} // the video file
          style={styles.player}
          fullscreen={true}
          resizeMode="cover"
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
                {from} Technique
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
          <TouchableOpacity
            onPress={() => {
              setIsLiked(!isLiked);
              dispatch(
                likeItem({
                  id: 1,
                  title: 'Backhand Techniques',
                  time: '10 Mins',
                  technique: 'Technique',
                }),
              );
            }}>
            {isLiked ? (
              <Images.like height={40} width={40} />
            ) : (
              <Images.unlike height={40} width={40} />
            )}
          </TouchableOpacity>
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
          {checkLastWord(from) === 'Challenge'
            ? 'Videos You May Like'
            : 'More Videos'}
        </Text>
        <AppFlatlist
          style={{
            marginTop: 15,
            marginBottom: 10,
          }}
          data={data}
          ListFooterComponent={<View style={{height: 0.25 * screenHeight}} />}
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
              <TouchableOpacity
                onPress={() => {
                  setIsItemLiked(!isItemLiked);
                  handleSelectItem(item.id);
                  dispatch(likeItem(item));
                }}>
                {selectedItems.includes(item.id) ? (
                  <Images.like height={40} width={40} />
                ) : (
                  <Images.unlike height={40} width={40} />
                )}
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
    width: screenWidth,
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
