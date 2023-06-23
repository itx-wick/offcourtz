import React, {useRef, useMemo, useState} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SvgXml} from 'react-native-svg';

import {svgImages} from '../../helpers';
import {theme} from '../../theme';
import {END_POINTS, screens} from '../../config';
import {screenHeight, screenWidth} from '../../constants';
import {fontFamily, fontSize} from '../../constants/fontDecorations';
import {setCommunityPosts} from '../../redux/reducers/communitySlice';
import {Commons} from '../../utils';
import AppFlatlist from '../../components/appFlatlist';
import Post from '../../components/communityPost';
import FAB from '../../components/fab';
import BottomSheetModalView from '../../components/bottomSheetModalView';
import {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import ApiService from '../../services/ApiService';
import {useDispatch, useSelector} from 'react-redux';
import ListEmptyComponent from '../../components/listEmptyComponent';
function Community({navigation}) {
  const dispatch = useDispatch();
  const authToken = useSelector(state => state.Auth.token);
  const user = useSelector(state => state.Auth.user);
  const allPosts = useSelector(state => state.Community.posts);
  const bottomSheetModalRef = React.useRef(null);
  const snapPoints = useMemo(() => ['23%', '23%'], []);
  const [postsList, setPostsList] = useState(allPosts);
  const [data, setData] = useState(Commons.communityModalData);
  const [IsEnable, setIsEnable] = useState(false);
  const [filter, setFilter] = React.useState(Commons.communityFilter[0]);

  const getAllPosts = async () => {
    let params = `?isGlobal=${filter.title === 'Global' ? true : false}`;
    await ApiService.getByParams(END_POINTS.fetchAllPosts, authToken, params)
      .then(res => {
        let newArray = res.data.map(obj => {
          const exist = obj?.likes.some(ob => ob?._id === user._id);
          return {...obj, isLiked: exist ? true : false};
        });
        setPostsList(newArray);
        dispatch(setCommunityPosts(res));
      })
      .catch(err => {
        console.log('promise error', err);
      });
  };

  React.useEffect(() => {
    setPostsList(allPosts);
  }, [allPosts]);

  React.useEffect(() => {
    getAllPosts();
  }, [filter]);

  const backdropComponent = backdropProps => (
    <BottomSheetBackdrop {...backdropProps} enableTouchThrough={true} />
  );

  function dismissBottomSheetModal() {
    bottomSheetModalRef.current?.dismiss();
  }

  const onDismissHandler = () => {
    !IsEnable && setIsEnable(true);
  };

  const renderListItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          dismissBottomSheetModal();
          if (index === 0) {
            navigation.navigate(screens.createNewPost);
          } else {
            navigation.navigate(screens.createNewGroup);
          }
        }}
        style={{
          width: 0.9 * screenWidth,
          paddingVertical: 15,
          marginBottom: Platform.OS === 'ios' ? 10 : 0,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <SvgXml
            xml={index === 0 ? svgImages.plusCircleIcon : svgImages.usersIcon}
          />
          <Text
            style={{
              fontFamily: fontFamily.argentum_sans,
              fontSize: fontSize.verbiage_20,
              paddingHorizontal: 10,
              color: theme.colors.black,
            }}>
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const flatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: screenWidth * 0.9,
          backgroundColor: theme.colors.gray1,
        }}
      />
    );
  };

  const listEmptyComponent = () => {
    return <ListEmptyComponent message={'Not Found Anything'} />;
  };

  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.headerMainContainer}>
          <View style={styles.headContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate(screens.manageCommunity)}
              style={{
                width: '10%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <SvgXml
                width={0.12 * screenWidth}
                height={0.12 * screenWidth}
                xml={svgImages.settingIcon}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontFamily: fontFamily.argentum_sans,
                fontSize: fontSize.verbiage_22,
                color: theme.colors.black,
              }}>
              Community
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(screens.notifications)}
              style={{
                width: '10%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <SvgXml
                width={0.12 * screenWidth}
                height={0.12 * screenWidth}
                xml={svgImages.notification}
              />
            </TouchableOpacity>
          </View>
        </View>
        <AppFlatlist
          horizontal
          style={{
            width: screenWidth,
            padding: 10,
            marginTop: 20,
            backgroundColor: theme.colors.white,
          }}
          ListFooterComponent={<View style={{paddingHorizontal: 10}} />}
          data={Commons.communityFilter}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                height: 0.1 * screenWidth,
                borderRadius: 0.1 * screenWidth,
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 15,
                marginHorizontal: 5,
                borderColor: theme.colors.gray1,
                backgroundColor:
                  item.title === filter.title
                    ? theme.colors.primary
                    : theme.colors.transparent,
              }}
              onPress={() => {
                setFilter(item);
              }}>
              <SvgXml xml={svgImages.smallLogoIcon} style={{marginRight: 5}} />
              <Text
                style={{
                  fontFamily: fontFamily.argentum_sans,
                  color: theme.colors.black,
                }}>
                {item.title}
              </Text>
            </TouchableOpacity>
          )}
        />
        <AppFlatlist
          data={postsList}
          ListFooterComponent={<View style={{height: 0.66 * screenWidth}} />}
          ListEmptyComponent={listEmptyComponent}
          height={screenHeight}
          renderItem={({item, index}) => <Post item={item} index={index} />}
        />
        <FAB
          onPress={() => {
            setIsEnable(false);
            bottomSheetModalRef.current?.present();
          }}
          icon={svgImages.add}
        />
      </View>
      <BottomSheetModalView
        backdropComponent={backdropComponent}
        dismissSheetModal={dismissBottomSheetModal}
        bottomSheetModalRef={bottomSheetModalRef}
        snapPoints={snapPoints}
        data={data}
        renderListItem={renderListItem}
        flatListItemSeparator={flatListItemSeparator}
        onDismissHandler={onDismissHandler}
        community={true}
      />
    </>
  );
}
export default Community;

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
    paddingHorizontal: 20,
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
