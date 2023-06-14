import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SvgXml} from 'react-native-svg';

import {svgImages} from '../../helpers';
import {theme} from '../../theme';
import AppFlatList from '../../components/appFlatlist';
import {screenHeight, screenWidth} from '../../constants';
import {fontFamily, fontSize} from '../../constants/fontDecorations';
import TextField from '../../components/textField';
import {Commons} from '../../utils';
import {END_POINTS, screens} from '../../config';
import {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import FiltersBottomSheet from '../../components/filtersBottomSheet';
import ApiService from '../../services/ApiService';
import {useDispatch, useSelector} from 'react-redux';
import {myFriends} from '../../redux/reducers/authSlice';
function Challenges({navigation}) {
  const dispatch = useDispatch();
  const authToken = useSelector(state => state.Auth.token);
  const filtersRef = React.useRef(null);
  const snapPoints = React.useMemo(() => ['100%', '100%'], []);
  const [isFilter, setIsFilter] = React.useState(false);
  const [filter, setFilter] = React.useState({});

  const getMyFriends = async () => {
    await ApiService.get(END_POINTS.myFriends, authToken)
      .then(res => {
        let newArray = res.data[0].friends.map(obj => {
          return {...obj, selected: false};
        });
        dispatch(myFriends(newArray));
        console.log('My Friends', res.data[0].friends);
      })
      .catch(err => {
        console.log('promise error', err);
      });
  };

  React.useState(() => {
    setFilter(Commons.workoutsFilter[0]);
    getMyFriends();
  }, []);

  const backdropComponent = backdropProps => (
    <BottomSheetBackdrop {...backdropProps} enableTouchThrough={true} />
  );

  function dismissFilters() {
    setIsFilter(!isFilter);
    filtersRef.current?.dismiss();
  }

  function showFilters() {
    setIsFilter(!isFilter);
    filtersRef.current?.present();
  }
  const headerComponent = item => {
    return (
      <TouchableOpacity
        style={{
          height: 0.3 * screenWidth,
          width: 0.92 * screenWidth,
          paddingHorizontal: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: `#FFEBD4`,
          marginHorizontal: 15,
          borderRadius: 20,
          marginVertical: 5,
        }}
        onPress={() => {
          navigation.navigate(screens.createChallenge);
        }}>
        <View>
          <Text
            style={{
              fontFamily: fontFamily.argentum_sans,
              fontSize: fontSize.verbiage_24,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              color: theme.colors.black,
            }}>{`Challenge\nThe World`}</Text>
          {item.time && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 5,
              }}>
              <SvgXml xml={svgImages.clock} style={{marginRight: 5}} />
              <Text
                style={{
                  fontFamily: fontFamily.argentum_sans,
                  fontSize: fontSize.verbiage_medium,
                  color: theme.colors.black,
                }}>{`${item.time}`}</Text>
            </View>
          )}
        </View>
        <Image
          source={require('../../assets/images/image1.png')}
          style={{
            width: '30%',
            height: '100%',
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerMainContainer}>
        <View style={styles.headContainer}>
          <TouchableOpacity
            style={{
              width: '10%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <SvgXml
              width={0.12 * screenWidth}
              height={0.12 * screenWidth}
              xml={svgImages.logoIcon}
            />
          </TouchableOpacity>
          <View style={{width: '90%', alignItems: 'flex-end'}}>
            <TextField
              inputWidth={0.8 * screenWidth}
              height={0.12 * screenWidth}
              borderColor={theme.colors.greyText}
              borderRadius={0.4 * screenWidth}
              searchIcon={svgImages.searchIcon}
              filterIcon={svgImages.filterIcon}
              onChangeText={e => {
                console.log(e);
              }}
              placeholder={'Search'}
              showPassword={false}
              paddingHorizontal={10}
              type={'search'}
              filterIconPress={showFilters}
            />
          </View>
        </View>
      </View>
      <View style={styles.headSeperator} />
      <View>
        <Text style={styles.screenTitle}>Challenges</Text>
      </View>
      <AppFlatList
        style={{
          marginTop: 15,
          marginBottom: 10,
        }}
        data={Commons.challenges}
        ListHeaderComponent={headerComponent}
        ListFooterComponent={<View />}
        height={screenHeight}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={{
              height: 0.3 * screenWidth,
              width: 0.92 * screenWidth,
              paddingHorizontal: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: `${item.bgColor}`,
              marginHorizontal: 15,
              borderRadius: 20,
              marginVertical: 5,
            }}
            onPress={() => {
              navigation.navigate(screens.detail, {
                from: `${item.title} Challenge`,
              });
            }}>
            <View>
              <Text
                style={{
                  fontFamily: fontFamily.argentum_sans,
                  fontSize: fontSize.verbiage_24,
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  color: theme.colors.black,
                }}>{`${item.title}`}</Text>
              {item.time && (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 5,
                  }}>
                  <SvgXml xml={svgImages.clock} style={{marginRight: 5}} />
                  <Text
                    style={{
                      fontFamily: fontFamily.argentum_sans,
                      fontSize: fontSize.verbiage_medium,
                      color: theme.colors.black,
                    }}>{`${item.time}`}</Text>
                </View>
              )}
            </View>
            <Image
              source={item.image}
              style={{
                width: '30%',
                height: '100%',
              }}
            />
          </TouchableOpacity>
        )}
      />

      <FiltersBottomSheet
        backdropComponent={backdropComponent}
        dismissSheetModal={dismissFilters}
        onDismissHandler={() => {}}
        bottomSheetRef={filtersRef}
        snapPoints={snapPoints}
        title={'Filters'}
        titleStyle={styles.bottomSheetTitle}
        closeIcon={true}
      />
    </View>
  );
}
export default Challenges;

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
    marginTop: 0.01 * screenHeight,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: screenWidth,
    paddingHorizontal: 15,
  },
  headSeperator: {
    height: 2,
    width: screenWidth,
    backgroundColor: theme.colors.gray1,
    marginVertical: 15,
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
