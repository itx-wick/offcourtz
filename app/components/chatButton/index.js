import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  fontFamily,
  fontSize,
  fontWeight,
} from '../../constants/fontDecorations';
import {theme} from '../../theme';

import Icon from 'react-native-vector-icons/Feather';

const ChatButton = props => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{...styles.button, ...props.style}}
        onPress={props.onClick}>
        <Icon name={props.btnIcon} size={24} color="#fff" />
        <Text style={styles.title}>{props.btnTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
  },
  title: {
    marginLeft: 5,
    color: '#fff',
    fontFamily: fontFamily.argentum_sans,
    fontSize: fontSize.verbiage_medium,
  },
  button: {
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export default ChatButton;
