import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {screens} from '../config';

import {useDispatch} from 'react-redux';
import {useNavigationState} from '@react-navigation/native';

import {updateActiveTabAction} from '../components/bottom-tab/activeTab/activeTab.actions';
import {Challenges} from '../screens';

const MainStack = createStackNavigator();

const MainNavigator = ({props}) => {
  const dispatch = useDispatch();
  let obj = {
    screen: '',
  };

  const tabsStacks = ['CHallenges', 'Workouts', 'Excerices', 'Community'];
  useNavigationState(state => {
    try {
      let currentRouteName =
        state?.routes[0]?.state?.routes?.slice(-1)[0]?.name;
      if (tabsStacks?.includes(currentRouteName)) {
        dispatch(updateActiveTabAction(`${currentRouteName}`));
      }

      if (currentRouteName) {
        if (currentRouteName && currentRouteName != obj.screen) {
          //Pixel Page View
          obj.screen = currentRouteName;
        }
      } else {
        //Pixel Page View
        if (obj.screen === '') {
          obj.screen = 'Challenges';
        }
      }
    } catch (error) {
      console.log('Error', error);
    }
  });

  return (
    <MainStack.Navigator
      headerMode="none"
      initialRouteName={screens.challenges}>
      <MainStack.Screen
        name={screens.challenges}
        component={Challenges}
        options={{gestureEnabled: false}}
      />
      {/* // screens are able to swipe back */}
    </MainStack.Navigator>
  );
};
export default MainNavigator;
