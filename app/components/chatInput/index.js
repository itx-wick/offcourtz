import React from 'react';
import {Text, View, StyleSheet, SafeAreaView} from 'react-native';

import Input from './input';
import Button from '../chatButton';

const ChatInput = props => {
  return (
    <View style={styles.container}>
      <Input
        value={props.msgValue}
        style={styles.input}
        onChangeText={props.onChangeText}
        placeholder="Type a message..."
      />
      <Button btnIcon="send" style={styles.button} onClick={props.onClick} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    margin: 20,
  },
  input: {
    width: '80%',
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 5,
  },
});

export default ChatInput;
