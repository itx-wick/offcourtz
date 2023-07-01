import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native';

import {theme} from '../../theme';
import {
  fontFamily,
  fontSize,
  fontWeight,
} from '../../constants/fontDecorations';

const Input = props => {
  return (
    <View style={{...props.style}}>
      <TextInput
        value={props.value}
        secureTextEntry={props.secureText}
        style={styles.input}
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#BAB7C3',
    borderRadius: 30,
    paddingHorizontal: 16,
    color: theme.colors.black,
    fontFamily: fontFamily.argentum_sans,
    fontSize: fontSize.verbiage_medium,
    fontWeight: fontWeight[400],
  },
});

export default Input;
