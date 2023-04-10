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
import FAB from '../../components/fab';
import {screenHeight, screenWidth} from '../../constants';
import {
  fontFamily,
  fontSize,
  fontWeight,
} from '../../constants/fontDecorations';
import {screens} from '../../config';
import TextField from '../../components/textField';
import {Commons} from '../../utils';
import AppFlatlist from '../../components/appFlatlist';
function Community({navigation}) {
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
