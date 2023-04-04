import {
  Animated,
  View,
  useWindowDimensions,
  StyleSheet,
  Platform,
} from 'react-native';

import React from 'react';
import lightTheme from '../../theme/light-theme';

const Paginator = ({data, scrollX}) => {
  const {width} = useWindowDimensions();
  return (
    <View style={styles.paginatorViewCont}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [7, 7, 7],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            style={[styles.sliderDot, {width: dotWidth, opacity}]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
};

export default Paginator;

const styles = StyleSheet.create({
  sliderDot: {
    height: 7,
    borderRadius: 7,
    backgroundColor: lightTheme.colors.white,
    marginHorizontal: 3,
  },
  paginatorViewCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
});
