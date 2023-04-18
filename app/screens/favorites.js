import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {View, Text} from 'react-native';
import {theme} from '../theme';
import {fontFamily, fontSize, fontWeight} from '../constants/fontDecorations';
import {screenWidth} from '../constants';
import {svgImages} from '../helpers';
import {screens} from '../config';
import {SvgXml} from 'react-native-svg';
function Favorites({navigation}) {
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
          <Text style={styles.headerTitle}>Fovorites</Text>
        </View>
        <View style={styles.underlineView} />
      </View>
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
    marginTop: 0.14 * screenWidth,
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
    marginTop: 2,
  },
  underlineView: {
    width: screenWidth,
    height: 1,
    backgroundColor: theme.colors.gray1,
    marginVertical: 15,
  },
  secondaryCont: {
    width: '100%',
    paddingHorizontal: 15,
  },
});
