import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {svgImages} from '../../helpers';
import {theme} from '../../theme';
import {
  fontFamily,
  fontSize,
  fontWeight,
} from '../../constants/fontDecorations';
import {screenWidth} from '../../constants';
import TextField from '../textField';
function Header(props) {
  return (
    <SafeAreaView>
      <View style={styles.headerMainContainer}>
        <View
          style={[
            props.searchBar ? styles.headSearchContainer : styles.headContainer,
          ]}>
          {props.backIcon ? (
            <TouchableOpacity
              // onPress={props.backIconPress}
              style={{position: 'absolute', left: 15}}>
              <SvgXml width="36" height="36 " xml={svgImages.back} />
            </TouchableOpacity>
          ) : (
            <SvgXml
              width={0.12 * screenWidth}
              height={0.12 * screenWidth}
              xml={svgImages.logoIcon}
            />
          )}
          {props.headerTitle && (
            <Text style={styles.headerTitle}>{props.headerTitle}</Text>
          )}
          {props.searchBar && (
            <View style={{alignItems: 'flex-end'}}>
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
              />
            </View>
          )}
          {props.searchBar && (
            <TouchableOpacity
              onPress={props.backIconPress}
              style={{position: 'absolute', left: 15}}>
              <SvgXml width="36" height="36 " xml={svgImages.back} />
            </TouchableOpacity>
          )}
          {props.logout && (
            <TouchableOpacity
              onPress={props.logoutPress}
              style={{position: 'absolute', left: 15}}>
              <SvgXml width="36" height="36 " xml={svgImages.logout} />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.underlineView} />
      </View>
    </SafeAreaView>
  );
}

export default Header;

const styles = StyleSheet.create({
  headerMainContainer: {
    width: screenWidth,
    alignItems: 'center',
  },
  headContainer: {
    flexDirection: 'row',
    height: 0.12 * screenWidth,
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth,
    // paddingHorizontal: 15,
    marginTop: 10,
  },
  headSearchContainer: {
    flexDirection: 'row',
    height: 0.12 * screenWidth,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: screenWidth,
    paddingHorizontal: 12,
    marginTop: 10,
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
});
