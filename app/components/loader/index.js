import React from 'react';
import { View } from 'react-native';
import { UIActivityIndicator } from 'react-native-indicators';
import { theme } from '../../theme';

const Loader = () => {
    return (
        <View style={{
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
            <View style={{
                width: 60,
                height: 60,
                borderRadius: 10,
                backgroundColor: '#FFFFFF',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
            }}>
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