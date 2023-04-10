import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { screens } from '../config';
import AuthStack from './auth-stack';
import BottomTabStack from './bottom-tab-stack';

const RootStack = createStackNavigator();

const AppNavigator = () => {
  return (
    <>
      <RootStack.Navigator headerMode="none">
        <RootStack.Screen
          name={screens.bottomTabStack}
          component={BottomTabStack}
        />
        <RootStack.Screen name={screens.authStack} component={AuthStack} />
      </RootStack.Navigator>
    </>
  );
};

export default AppNavigator;
