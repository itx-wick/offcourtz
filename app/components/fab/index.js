import {TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';

const FAB = props => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <SvgXml xml={props.icon} />
    </TouchableOpacity>
  );
};

export default FAB;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    position: 'absolute',
    bottom: -10,
    right: 5,
  },
});
