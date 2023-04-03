import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {screens} from '../config';
import Login from '../screens/auth/login/Login';

const AuthStack = createStackNavigator();

function AuthNavigator() {
  return (
    <AuthStack.Navigator headerMode="none">
      <AuthStack.Screen name={screens.login} component={Login} />
    </AuthStack.Navigator>
  );
}
export default AuthNavigator;
