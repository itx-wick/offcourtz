import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {theme} from '../../theme';

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
    backgroundColor: theme.colors.greyText,
    marginHorizontal: 15,
    marginVertical: 5,
    borderRadius: 5,
  },
  title: {
    fontSize: 15,
    color: '#fff',
    padding: 15,
  },
});

export default ChatCard;
