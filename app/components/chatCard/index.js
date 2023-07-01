import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {theme} from '../../theme';
import {
  fontFamily,
  fontSize,
  fontWeight,
} from '../../constants/fontDecorations';

const ChatCard = props => {
  return (
    <View
      style={{
        ...styles.container,
        alignSelf: props.selfMessage ? 'flex-end' : 'flex-start',
      }}>
      <Text style={styles.title}>{props.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.black,
    marginHorizontal: 15,
    marginVertical: 5,
    borderRadius: 50,
  },
  title: {
    fontFamily: fontFamily.argentum_sans,
    fontSize: fontSize.verbiage_medium,
    fontWeight: fontWeight[400],
    color: '#fff',
    padding: 15,
  },
});

export default ChatCard;
