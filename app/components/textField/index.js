import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  Platform,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {SvgXml} from 'react-native-svg';

import {
  fontFamily,
  fontSize,
  fontWeight,
} from '../../constants/fontDecorations';
import {theme} from '../../theme';

import moment from 'moment';
import {screenWidth} from '../../constants';
import Ionicons from 'react-native-vector-icons/Entypo';

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

  const showHide = () => {
    props.updateShowHidePassword();
  };

  return (
    <>
      {props.type === 'search' ? (
        <View>
          <View
            style={{
              flexDirection: 'row',
              width: props.inputWidth,
              backgroundColor: theme.colors.white,
              height: 0.12 * screenWidth,
              borderRadius: props.inputWidth,
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingRight: 5,
            }}>
            <View
              style={{
                width: '85%',
                flexDirection: 'row',
                height: 0.12 * screenWidth,
                alignItems: 'center',
              }}>
              {props.searchIcon && (
                <View style={{marginLeft: 15, marginRight: 2, width: '10%'}}>
                  <SvgXml width="22" height="22" xml={props.searchIcon} />
                </View>
              )}
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                name="Search"
                value={props.value}
                onChangeText={props.onChangeText}
                placeholder={props.placeholder}
                placeholderTextColor={theme.colors.greyText}
                keyboardType={props.keyboardType}
                onFocus={() => setOnFocus(true)}
                onBlur={() => setOnFocus(false)}
                style={[
                  {
                    width: '82%',
                    height: 0.12 * screenWidth,
                    fontFamily: fontFamily.argentum_sans,
                    fontSize: fontSize.verbiage_19,
                    fontWeight: fontWeight[400],
                  },
                ]}
              />
            </View>
            {props.filterIcon && (
              <TouchableOpacity onPress={props.filterIconPress}>
                <SvgXml
                  width={props.filterIconW ? props.filterIconW : '34'}
                  height={props.filterIconH ? props.filterIconH : '34'}
                  xml={props.filterIcon}
                  style={props.filterIconStyle}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      ) : (
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
              height: 0.12 * screenWidth,
              borderWidth: 1,
              borderColor: props.borderColor,
              borderRadius: props.inputWidth,
              backgroundColor: theme.colors.white,
              color: theme.colors.black,
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
              secureTextEntry={props.secureTextEntry ? true : false}
              keyboardType={props.keyboardType}
              editable={props.editable}
              maxLength={props.maxLength}
              onFocus={() => setOnFocus(true)}
              onBlur={() => setOnFocus(false)}
              style={{
                width: '85%',
                height: 0.12 * screenWidth,
                fontFamily: fontFamily.argentum_sans,
                fontSize: fontSize.verbiage_medium,
                fontWeight: fontWeight[400],
                paddingLeft: 15,
                paddingRight: 20,
                color: theme.colors.black,
              }}
            />
            {props.showHidePassIcon ? (
              <TouchableOpacity
                style={styles.showPasswordBtn}
                onPress={() => showHide()}>
                {props.secureTextEntry ? (
                  <Ionicons name="eye" size={22} style={styles.Feather} />
                ) : (
                  <Ionicons
                    name="eye-with-line"
                    size={22}
                    style={styles.Feather}
                  />
                )}
              </TouchableOpacity>
            ) : null}
            {props.icon && <SvgXml width="24" height="24 " xml={props.icon} />}
          </View>
        </View>
      )}
    </>
  );
};

export default TextField;

const styles = StyleSheet.create({
  Feather: {
    color: theme.colors.secondaryBlack,
  },
  showPasswordBtn: {
    right: 3,
    height: 0.12 * screenWidth,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
