import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import BottomTab from '../components/bottom-tab/bottom-tab';
import {screens} from '../config';
import AppStack from './app-stack';

const BottomTabStack = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <BottomTabStack.Navigator
      headerMode="none"
      tabBar={props => <BottomTab {...props} />}>
      <BottomTabStack.Screen
        options={{headerShown: false}}
        name={screens.appStack}
        component={AppStack}
      />
    </BottomTabStack.Navigator>
  );
}
