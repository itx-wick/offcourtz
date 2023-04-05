import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {
  fontFamily,
  fontSize,
  fontWeight,
  textColors,
} from '../../constants/fontDecorations';
import {screenWidth} from '../../constants';

import {theme} from '../../theme';
const {colors} = theme;

const Button = ({
  title,
  onPress,
  disabled,
  btnWidth,
  btnHeight,
  btnStyle,
  titleColor,
  titleStyle,
  borderColor,
  borderWidth,
  borderRadius,
  icon,
  iconBG,
  iconBGStyle,
  iconHeight,
  iconWidth,
  backgroundColor,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled ? true : false}
      onPress={() => onPress()}
      style={[
        styles.btnFullWidth,
        {
          backgroundColor: backgroundColor ? backgroundColor : colors.primary,
        },
        borderColor && {borderColor: borderColor},
        borderWidth && {borderWidth: borderWidth},
        borderRadius && {borderRadius: borderRadius},
        btnWidth && {width: btnWidth},
        btnHeight && {height: btnHeight},
        btnStyle,
      ]}>
      {icon &&
        (iconBG ? (
          <View style={iconBGStyle}>
            <SvgXml width={iconWidth} height={iconHeight} xml={icon} />
          </View>
        ) : (
          <SvgXml width={iconWidth} height={iconHeight} xml={icon} />
        ))}
      <Text
        style={[
          styles.text,
          {
            color: titleColor ? titleColor : textColors.white,
          },
          titleStyle,
        ]}>
        {icon ? ` ${title}` : `${title}`}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btnFullWidth: {
    justifyContent: 'center',
    width: screenWidth * 0.9,
    borderRadius: 60,
    height: 0.14 * screenWidth,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontFamily: fontFamily.argentum_sans,
    fontSize: fontSize.verbiage_empty_screen,
  },
});
