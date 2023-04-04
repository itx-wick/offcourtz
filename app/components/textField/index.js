import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View, TextInput, Platform} from 'react-native';
// import {TextInput} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {SvgXml} from 'react-native-svg';

import {
  fontFamily,
  fontSize,
  fontWeight,
  screenHeight,
  screenWidth,
} from '../../constants/fontDecorations';
import {theme} from '../../theme';
import {TimeDatePicker, Modes} from 'react-native-time-date-picker';

import moment from 'moment';

const TextField = props => {
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [onFocus, setOnFocus] = useState(false);

  useEffect(() => {
    setError(props.errorInput);
  }, [props.errorInput]);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <View>
      <Text
        style={{
          fontFamily: fontFamily.argentum_sans,
          fontSize: fontSize.verbiage_medium,
          fontWeight: fontWeight[500],
          marginVertical: 5,
          color: theme.colors.greyText,
        }}>
        {props.title}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          width: props.inputWidth,
          height: Platform.OS === 'ios' && props.height,
          borderWidth: 1,
          borderColor: props.borderColor,
          borderRadius: props.inputWidth,
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingRight: 15,
        }}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          name="First Name"
          value={props.value}
          onChangeText={props.onChangeText}
          placeholder={props.placeholder}
          placeholderTextColor={theme.colors.greyText}
          secureTextEntry={
            showPassword && props.type === 'password' ? true : false
          }
          keyboardType={props.keyboardType}
          editable={props.editable}
          maxLength={props.maxLength}
          onFocus={() => setOnFocus(true)}
          onBlur={() => setOnFocus(false)}
          style={{
            width: '85%',
            height: Platform.OS === 'ios' && props.height,
            fontFamily: fontFamily.argentum_sans,
            fontSize: fontSize.verbiage_medium,
            fontWeight: fontWeight[400],
            paddingLeft: 15,
            paddingRight: 20,
          }}
        />
        {props.icon && <SvgXml width="24" height="24 " xml={props.icon} />}
      </View>
    </View>
  );
};

export default TextField;
