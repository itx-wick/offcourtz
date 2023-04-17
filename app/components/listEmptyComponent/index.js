import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {screenHeight} from '../../constants';
import {svgImages} from '../../helpers';
import {SvgXml} from 'react-native-svg';
import {fontFamily, fontSize} from '../../constants/fontDecorations';
import {theme} from '../../theme';

function ListEmptyComponent({message}) {
  return (
    <View
      style={{
        height: screenHeight / 1.75,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <SvgXml
        xml={svgImages.smileyXEyes}
        width={150}
        height={150}
        style={{marginVertical: 20}}
      />
      <Text
        style={{
          fontFamily: fontFamily.argentum_sans,
          fontSize: fontSize.verbiage_medium,
          color: theme.colors.greyText,
        }}>
        {message}
      </Text>
    </View>
  );
}

export default ListEmptyComponent;

const styles = StyleSheet.create({});
