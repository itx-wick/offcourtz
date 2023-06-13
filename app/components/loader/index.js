import React from 'react';
import {View} from 'react-native';
import {UIActivityIndicator} from 'react-native-indicators';

import {theme} from '../../theme';

const Loader = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00000040',
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
      }}>
      <View
        style={{
          width: 60,
          height: 60,
          borderRadius: 10,
          backgroundColor: '#FFFFFF',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {/* <AnimatedLoader
          visible={true}
          overlayColor="rgba(255,255,255,0.75)"
          source={require('../../assets/anim/loader.json')}
          animationStyle={{width: 200, height: 150}}
          speed={1}>
          <Text
            style={{
              fontFamily: fontFamily.argentum_sans,
              fontSize: fontSize.verbiage_20,
              fontWeight: fontWeight[700],
              color: theme.colors.black,
              marginTop: -35,
            }}>
            Processing
          </Text>
        </AnimatedLoader> */}
        <UIActivityIndicator
          color={theme.colors.primary}
          size={30}
          animationDuration={400}
        />
      </View>
    </View>
  );
};

export default Loader;
