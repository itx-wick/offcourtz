import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { screens } from '../config';
import AuthStack from './auth-stack';
import BottomTabStack from './bottom-tab-stack';
import Loader from '../components/loader';
import { useSelector } from 'react-redux';

const RootStack = createStackNavigator();

const AppNavigator = () => {
  const isLoader = useSelector(state => state.Common.loader);
  const isLoggedIn = useSelector(state => state.Auth.isLoggedIn);
  return (
    <>
      <RootStack.Navigator
        headerMode="none"
        initialRouteName={isLoggedIn ? screens.bottomTabStack : screens.authStack}>
        <RootStack.Screen name={screens.authStack} component={AuthStack} />
        <RootStack.Screen
          name={screens.bottomTabStack}
          component={BottomTabStack}
        />
      </RootStack.Navigator>

      {isLoader ? <Loader /> : null}
    </>
  );
};

export default AppNavigator;
