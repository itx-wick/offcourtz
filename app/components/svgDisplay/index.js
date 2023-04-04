import React from 'react';
import {StyleSheet, View} from 'react-native';
import {withTheme} from 'react-native-paper';
import {SvgUri} from 'react-native-svg';
import {
  fontFamily,
  fontSize,
  fontWeight,
  textColors,
} from '../../constants/fontDecorations';
import {screenHeight, screenWidth} from '../../constants';

const SvgDisplay = props => {
  return (
    <View style={styles.container}>
      <SvgUri
        uri={props.svgUri}
        style={{
          alignSelf: 'center',
        }}
        width={props.width}
        height={props.height}
      />
    </View>
  );
};
export default withTheme(SvgDisplay);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth,
    paddingVertical: 20,
  },
  verbiageStyle: {
    textAlign: 'center',
    color: textColors.black,
    fontFamily: fontFamily.pt_sans,
    fontWeight: fontWeight[700],
    fontSize: fontSize.verbiage_empty_screen,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 0.03 * screenHeight,
    width: 0.6 * screenWidth,
  },
});
