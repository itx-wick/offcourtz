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
import {Commons} from '../../utils';
import {svgImages} from '../../helpers';
import {screens} from '../../config';
import {SvgXml} from 'react-native-svg';
import {FlatList} from 'react-native';
function ManageGroups({navigation}) {
  const searchRef = useRef();
  const [search, setSearch] = useState('');
  const [isEnable, setIsEnable] = useState(false);
  const [data, setData] = useState(Commons.groupsData);

  const onSearch = search => {
    if (search !== '') {
      let tempData = data.filter(item => {
        return item.title.toLowerCase().indexOf(search.toLowerCase()) > -1;
      });
      setData(tempData);
    } else {
      setData(Commons.groupsData);
    }
  };

  const renderListItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          data[index].selected = !item.selected;
          setData([...data]);
        }}
        style={styles.listItem}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={userPlaceholder} style={styles.userImage} />
          <Text style={styles.listItemTitle}>{item.title}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => navigation.navigate(screens.editGroup)}>
            <Image
              source={require('../../assets/images/edit.png')}
              style={{width: 50, height: 50, marginHorizontal: 3}}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../../assets/images/delete.png')}
              style={{width: 50, height: 50, marginHorizontal: 3}}
              resizeMode="contain"
            />
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
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerMainContainer}>
        <View style={styles.headContainer}>
          <TouchableOpacity
            onPress={navigateBack}
            style={{position: 'absolute', left: 15}}>
            <SvgXml width="36" height="36 " xml={svgImages.back} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Manage Groups</Text>
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
            placeholder="Search Groups"
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
          renderItem={renderListItem}
          style={{height: screenHeight}}
        />
      </View>
    </View>
  );
}

export default ManageGroups;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: theme.colors.whisper,
  },
  headerMainContainer: {
    width: screenWidth,
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 0.12 * screenWidth : 0.06 * screenWidth,
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
});
