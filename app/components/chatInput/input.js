import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native';

import {theme} from '../../theme';

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
    fontWeight: '600',
  },
});

export default Input;
