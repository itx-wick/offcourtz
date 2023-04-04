import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  fontFamily,
  fontSize,
  fontWeight,
  textColors,
} from '../../constants/fontDecorations';
import {theme} from '../../theme';
import {screenWidth} from '../../constants';
const {colors} = theme;

const Button = ({
  title,
  backgroundColor,
  onPress,
  disabled,
  btnWidth,
  btnHeight,
  titleColor,
  borderColor,
  borderWidth,
  borderRadius,
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
      ]}>
      <Text
        style={[
          styles.text,
          {
            color: titleColor ? titleColor : textColors.white,
          },
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btnFullWidth: {
    justifyContent: 'center',
    width: screenWidth * 0.87,
    borderRadius: 60,
    height: 55,
  },
  text: {
    textAlign: 'center',
    fontFamily: fontFamily.argentum_sans,
    fontWeight: fontWeight[400],
    fontSize: fontSize.verbiage_empty_screen,
  },
});
