import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {screens} from '../config';
import {
  ForgotPassword,
  GetStarted,
  Login,
  Signup,
  Trial,
  Welcome,
} from '../screens';

const AuthStack = createStackNavigator();

function AuthNavigator() {
  return (
    <AuthStack.Navigator headerMode="none">
      <AuthStack.Screen name={screens.welcome} component={Welcome} />
      <AuthStack.Screen name={screens.getStarted} component={GetStarted} />
      <AuthStack.Screen name={screens.login} component={Login} />
      <AuthStack.Screen name={screens.signUp} component={Signup} />
      <AuthStack.Screen name={screens.trial} component={Trial} />
      <AuthStack.Screen
        name={screens.forgotPassword}
        component={ForgotPassword}
      />
    </AuthStack.Navigator>
  );
}

export default AuthNavigator;
