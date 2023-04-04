import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { screens } from '../config';
import { GetStarted, Login, Welcome } from '../screens';

const AuthStack = createStackNavigator();

function AuthNavigator() {
  return (
    <AuthStack.Navigator
      headerMode="none">
      <AuthStack.Screen name={screens.welcome} component={Welcome} />
      <AuthStack.Screen name={screens.getStarted} component={GetStarted} />
      <AuthStack.Screen name={screens.login} component={Login} />
    </AuthStack.Navigator>
  );
}
export default AuthNavigator;
