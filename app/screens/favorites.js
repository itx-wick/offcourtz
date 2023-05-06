import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {View, Text} from 'react-native';
import {theme} from '../theme';
import {fontFamily, fontSize, fontWeight} from '../constants/fontDecorations';
import {screenHeight, screenWidth} from '../constants';
import {svgImages} from '../helpers';
import {screens} from '../config';
import {SvgXml} from 'react-native-svg';
import TextField from '../components/textField';
import {Commons} from '../utils';
import AppFlatlist from '../components/appFlatlist';
import Images from '../constants/images';
import {Platform} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {unlikeItem, updateFavourite} from '../redux/reducers/favouriteSlice';
function Favorites({navigation}) {
  const dispatch = useDispatch();
  const favourites = useSelector(state => state.Favourites.data);
  const searchRef = React.useRef();
  const [search, setSearch] = React.useState('');
  const [showSearch, setShowSearch] = React.useState(false);
  const [data, setData] = React.useState(favourites);

  const navigateBack = () => {
    navigation.goBack();
  };

  const onSearch = search => {
    if (search !== '') {
      let tempData = data.filter(item => {
        return item.title.toLowerCase().indexOf(search.toLowerCase()) > -1;
      });
      setData(tempData);
    } else {
      setData(Commons.favorites);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerMainContainer}>
        <View style={showSearch ? styles.headContainer2 : styles.headContainer}>
          {showSearch ? (
            <>
              <TouchableOpacity
                onPress={navigateBack}
                style={{
                  width: '10%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <SvgXml
                  width={0.1 * screenWidth}
                  height={0.1 * screenWidth}
                  xml={svgImages.back}
                />
              </TouchableOpacity>
              <View style={{width: '90%', alignItems: 'flex-end'}}>
                <TextField
                  inputWidth={0.8 * screenWidth}
                  height={0.1 * screenWidth}
                  borderColor={theme.colors.greyText}
                  borderRadius={0.4 * screenWidth}
                  searchIcon={svgImages.searchIcon}
                  filterIcon={svgImages.x}
                  filterIconH={22}
                  filterIconW={22}
                  filterIconStyle={{
                    marginRight: 7,
                  }}
                  filterIconPress={() => {
                    setShowSearch(!showSearch);
                  }}
                  value={search}
                  ref={searchRef}
                  onChangeText={txt => {
                    onSearch(txt);
                    setSearch(txt);
                  }}
                  placeholder={'Search'}
                  showPassword={false}
                  paddingHorizontal={10}
                  type={'search'}
                />
              </View>
            </>
          ) : (
            <>
              <TouchableOpacity
                onPress={navigateBack}
                style={{position: 'absolute', left: 15}}>
                <SvgXml
                  width={0.1 * screenWidth}
                  height={0.1 * screenWidth}
                  xml={svgImages.back}
                />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Favorites</Text>
              <TouchableOpacity
                onPress={() => setShowSearch(!showSearch)}
                style={{position: 'absolute', right: 15}}>
                <SvgXml
                  width={0.1 * screenWidth}
                  height={0.1 * screenWidth}
                  xml={svgImages.searchIcon2}
                />
              </TouchableOpacity>
            </>
          )}
        </View>
        <View style={styles.underlineView} />
      </View>
      <View>
        <Text style={styles.screenTitle}>{`${data.length} Videos`}</Text>
      </View>
      <AppFlatlist
        style={{
          marginTop: 15,
          marginBottom: 10,
        }}
        data={data}
        ListFooterComponent={<View />}
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
                const newData = data.filter(itm => itm.id !== item.id);
                setData(newData);
                dispatch(unlikeItem(item));
              }}>
              <Images.like height={40} width={40} />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default Favorites;

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
  headContainer2: {
    flexDirection: 'row',
    height: 0.12 * screenWidth,
    // marginTop: 0.005 * screenHeight,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: screenWidth,
    paddingHorizontal: 15,
  },
  headerTitle: {
    fontFamily: fontFamily.argentum_sans,
    fontWeight: '500',
    fontSize: fontSize.verbiage_20,
    color: theme.colors.secondaryBlack,
    marginTop: 2,
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
  screenTitle: {
    fontFamily: fontFamily.argentum_sans,
    fontWeight: 'bold',
    fontSize: fontSize.verbiage_24,
    color: theme.colors.greyText,
    paddingHorizontal: 15,
    marginTop: 10,
  },
});
