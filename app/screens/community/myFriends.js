import React, {useState, useRef} from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {View, Text} from 'react-native';
import {theme} from '../../theme';
import {fontFamily, fontSize} from '../../constants/fontDecorations';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {screenHeight, screenWidth} from '../../constants';
import userPlaceholder from '../../assets/images/user.jpeg';
import {myFriends} from '../../redux/reducers/authSlice';
import {Commons} from '../../utils';
import {svgImages} from '../../helpers';
import {END_POINTS, screens} from '../../config';
import {SvgXml} from 'react-native-svg';
import {FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setLoader} from '../../redux/reducers/commonSlice';
import ApiService from '../../services/ApiService';
import ListEmptyComponent from '../../components/listEmptyComponent';
import FastImage from 'react-native-fast-image';

function MyFriends({navigation}) {
  const searchRef = useRef();
  const dispatch = useDispatch();
  const friends = useSelector(state => state.Auth.friends);
  const authToken = useSelector(state => state.Auth.token);
  const [search, setSearch] = useState('');
  const [isEnable, setIsEnable] = useState(false);
  const [data, setData] = useState(friends);

  React.useEffect(() => {
    dispatch(setLoader(false));
    getMyFriends();
    setData(friends);
  }, [friends]);

  const onSearch = search => {
    if (search !== '') {
      let tempData = data.filter(item => {
        return item.firstName.toLowerCase().indexOf(search.toLowerCase()) > -1;
      });
      setData(tempData);
    } else {
      setData(friends);
    }
  };

  const getMyFriends = async () => {
    await ApiService.get(END_POINTS.myFriends, authToken)
      .then(res => {
        let newArray = res.data[0].friends.map(obj => {
          return {...obj, selected: false};
        });
        dispatch(myFriends(newArray));
        dispatch(setLoader(false));
      })
      .catch(err => {
        console.log('promise error', err);
      });
  };

  const unfriendReq = async id => {
    dispatch(setLoader(true));
    await ApiService.get(END_POINTS.unfriend, authToken, id)
      .then(res => {
        getMyFriends();
      })
      .catch(err => {
        console.log('promise error', err);
        dispatch(setLoader(false));
      });
  };

  const renderListItem = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => {}} style={styles.listItem}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <FastImage
            source={item?.image ? {uri: item.image} : userPlaceholder}
            style={styles.userImage}
          />
          <Text
            style={
              styles.listItemTitle
            }>{`${item.firstName} ${item.lastName}`}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => unfriendReq(item._id)}>
            <Text style={styles.unfriendText}>Remove</Text>
          </TouchableOpacity>
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

  const navigateBack = () => {
    navigation.goBack();
  };

  const listEmptyComponent = () => {
    return <ListEmptyComponent message={'You have no friends'} />;
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
          <Text style={styles.headerTitle}>My Friends</Text>
        </View>
        <View style={styles.underlineView} />
      </View>
      <View style={styles.secondaryCont}>
        <View style={styles.searchInputContainer}>
          <Ionicons
            name={'ios-search'}
            size={24}
            color={theme.colors.primary}
            style={styles.searchIcon}
          />
          <TextInput
            value={search}
            ref={searchRef}
            onChangeText={txt => {
              onSearch(txt);
              setSearch(txt);
            }}
            style={styles.searchInput}
            placeholder="Search Friends"
            placeholderTextColor={theme.colors.greyText}
          />
        </View>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={{height: 10}} />}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContentContainer}
          ItemSeparatorComponent={flatListItemSeparator}
          ListEmptyComponent={listEmptyComponent}
          renderItem={renderListItem}
          style={{height: screenHeight}}
        />
      </View>
    </View>
  );
}

export default MyFriends;

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
  userImage: {
    width: 0.12 * screenWidth,
    height: 0.12 * screenWidth,
    borderRadius: 0.12 * screenWidth,
    borderWidth: 2,
    marginRight: 10,
    resizeMode: 'contain',
    borderColor: theme.colors.gray1,
  },
  searchInputContainer: {
    width: screenWidth * 0.92,
    height: 0.12 * screenWidth,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.75,
    borderColor: theme.colors.gray1,
    borderRadius: 0.12 * screenWidth,
    backgroundColor: theme.colors.white,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontFamily: fontFamily.argentum_sans,
    fontSize: fontSize.verbiage,
    paddingRight: 15,
  },
  listItem: {
    flexDirection: 'row',
    width: screenWidth * 0.92,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingVertical: 10,
  },
  listItemTitle: {
    fontFamily: fontFamily.argentum_sans,
    fontSize: fontSize.verbiage_medium,
    color: theme.colors.black,
    textTransform: 'capitalize',
  },
  listContentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  unfriendText: {
    fontFamily: fontFamily.argentum_sans,
    fontSize: fontSize.verbiage_14,
    color: theme.colors.black,
    paddingHorizontal: 5,
  },
});
