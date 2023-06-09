import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {screenHeight, screenWidth} from '../../constants';
import {theme} from '../../theme';
import {
  fontFamily,
  fontSize,
  fontWeight,
} from '../../constants/fontDecorations';
import {SvgXml, SvgUri} from 'react-native-svg';
import {svgImages} from '../../helpers';
function DropDown(props) {
  const searchRef = useRef();
  const [search, setSearch] = useState('');
  const [isEnable, setIsEnable] = useState(false);
  const [data, setData] = useState(props.data);

  useEffect(() => {
    setIsEnable(false);
  }, []);

  const onSearch = search => {
    if (search !== '') {
      let tempData = data.filter(item => {
        return item.title.toLowerCase().indexOf(search.toLowerCase()) > -1;
      });
      setData(tempData);
    } else {
      setData(props.data);
    }
  };

  return (
    <View>
      {!isEnable && (
        <TouchableOpacity
          onPress={() => {
            setIsEnable(!isEnable);
          }}
          style={[
            styles.dropDownView,
            {
              width: props.width,
              height: 0.12 * screenWidth,
              borderColor: props.borderColor,
              borderRadius: props.width,
              borderWidth: props.borderWidth ? props.borderWidth : 1,
              backgroundColor: theme.colors.white,
            },
          ]}>
          {props.type === 'Country' ? (
            <View style={styles.dropDownTitleView}>
              {props.selectedItem?.image && (
                <SvgUri width="24" height="24" uri={props.selectedItem.image} />
              )}
              <Text style={styles.dropDownTitle}>
                {props.selectedItem ? props.selectedItem : props.title}
              </Text>
            </View>
          ) : (
            <View style={styles.dropDownTitleView}>
              <Text style={styles.dropDownTitle}>
                {props.selectedItem ? props.selectedItem : props.title}
              </Text>
            </View>
          )}
          {props.icon && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {props.type === 'Duration' && (
                <Text
                  style={{
                    fontSize: fontSize.verbiage_16,
                    fontFamily: fontFamily.argentum_sans,
                    fontWeight: fontWeight[400],
                  }}>
                  Mins
                </Text>
              )}
              <SvgXml width="24" height="24" xml={svgImages.caretDown} />
            </View>
          )}
        </TouchableOpacity>
      )}
      {isEnable && (
        <View
          style={[
            styles.dropDownContainerView,
            {
              width: props.width,
              borderRadius: (0.12 * screenWidth) / 3,
            },
          ]}>
          <TouchableOpacity onPress={() => setIsEnable(!isEnable)}>
            <View
              style={[
                styles.dropDownContainerTitleView,
                {
                  width: props.width,
                  height: 0.12 * screenWidth,
                },
              ]}>
              <Text style={styles.dropDownContainerTitle}>
                {props.dropDownTitle ? props.dropDownTitle : 'Choose Option'}
              </Text>
              {props.icon && (
                <View style={{paddingRight: 6}}>
                  <SvgXml width="20" height="20" xml={svgImages.carretUp} />
                </View>
              )}
            </View>
          </TouchableOpacity>
          <View
            style={[
              styles.dropDownContainerDivider,
              {
                width: 0.9 * props.width,
              },
            ]}
          />
          {(props.type === 'Country' || props.type === 'Exercise') && (
            <View style={styles.searchInputContainer}>
              <Ionicons
                name={'ios-search'}
                size={24}
                color={theme.colors.primary}
                style={styles.searchIcon}
              />
              <TextInput
                {...props}
                value={search}
                ref={searchRef}
                onChangeText={txt => {
                  onSearch(txt);
                  setSearch(txt);
                }}
                style={styles.searchInput}
                placeholder="Search"
              />
            </View>
          )}
          <View style={[styles.flatListView, props.flatListView]}>
            <FlatList
              data={data}
              showsVerticalScrollIndicator={false}
              style={props.dropDownListStyle}
              renderItem={({item, index}) => {
                return (
                  <View
                    style={[
                      styles.listOptionMainRow,
                      {
                        width: props.width * 0.9,
                      },
                    ]}>
                    <TouchableOpacity
                      style={styles.listOptionSecRow}
                      onPress={() => {
                        props.onPressItem(item);
                        setIsEnable(!isEnable);
                        onSearch('');
                        setSearch('');
                      }}>
                      {props.type === 'Country' ? (
                        <View style={styles.listOptionIconView}>
                          {item?.image && (
                            <SvgUri width="24" height="24" uri={item.image} />
                          )}
                          <Text style={styles.listOptionTitle}>
                            {item.title}
                          </Text>
                        </View>
                      ) : (
                        <Text style={styles.listOptionTitle}>{item.title}</Text>
                      )}
                      {item.title == props.selectedItem && (
                        <MaterialIcons
                          name={'check'}
                          size={16}
                          color={theme.colors.success}
                          style={styles.icon}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
}

export default DropDown;

const styles = StyleSheet.create({
  dropDownView: {
    flexDirection: 'row',
    borderWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 15,
  },
  dropDownTitleView: {
    width: '85%',
    paddingLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropDownTitle: {
    fontFamily: fontFamily.argentum_sans,
    fontSize: fontSize.verbiage_medium,
    fontWeight: fontWeight[400],
    paddingRight: 20,
    paddingLeft: 5,
  },
  dropDownContainerView: {
    borderWidth: 1,
    borderColor: theme.colors.greyText,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
  },
  dropDownContainerTitle: {
    width: '85%',
    fontFamily: fontFamily.argentum_sans,
    fontSize: fontSize.verbiage_medium,
    fontWeight: fontWeight[400],
    paddingLeft: 15,
    paddingRight: 20,
  },
  dropDownContainerTitleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 15,
  },
  dropDownContainerDivider: {
    height: 0.75,
    backgroundColor: theme.colors.greyText,
    marginBottom: 10,
  },
  flatListView: {
    marginBottom: 10,
    // minHeight: 0.35 * screenWidth,
  },
  listOptionMainRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  listOptionSecRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  listOptionIconView: {
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  listOptionTitle: {
    fontSize: fontSize.verbiage_16,
    fontFamily: fontFamily.argentum_sans,
    fontWeight: fontWeight[400],
    paddingLeft: 5,
  },
  searchInputContainer: {
    width: '90%',
    height: 0.11 * screenWidth,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.75,
    borderColor: theme.colors.greyText,
    borderRadius: screenHeight * 0.14,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  // searchInput: {
  //   flex: 1,
  // },
});
