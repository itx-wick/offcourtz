import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SvgXml} from 'react-native-svg';

import {svgImages} from '../../helpers';
import {theme} from '../../theme';
import {screenHeight, screenWidth} from '../../constants';
import {fontFamily, fontSize} from '../../constants/fontDecorations';
import {Commons} from '../../utils';
import AppFlatlist from '../../components/appFlatlist';
import Post from '../../components/communityPost';
function Community({navigation}) {
  const [filter, setFilter] = React.useState({});
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerMainContainer}>
        <View style={styles.headContainer}>
          <TouchableOpacity
            onPress={() => {}}
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
            }}>
            Community
          </Text>
          <TouchableOpacity
            onPress={() => {}}
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
                item.value === filter.value
                  ? theme.colors.primary
                  : theme.colors.transparent,
            }}
            onPress={() => {
              setFilter(item);
            }}>
            <SvgXml xml={svgImages.smallLogoIcon} style={{marginRight: 5}} />
            <Text style={{fontFamily: fontFamily.argentum_sans}}>
              {item.value}
            </Text>
          </TouchableOpacity>
        )}
      />
      <AppFlatlist
        data={Commons.communityData}
        ListFooterComponent={<View style={{height: 0.66 * screenWidth}} />}
        height={screenHeight}
        renderItem={({item, index}) => <Post item={item} index={index} />}
      />
    </View>
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
    marginTop: 0.12 * screenWidth,
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
