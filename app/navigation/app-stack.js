import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {screens} from '../config';
import {AppState} from 'react-native';
import {useDispatch} from 'react-redux';
import {useNavigationState} from '@react-navigation/native';

import {
  Challenges,
  Community,
  CreateChallenge,
  CreateNewGroup,
  CreateNewPost,
  CustomWorkout,
  Detail,
  EditGroup,
  Exercises,
  Favorites,
  FriendRequests,
  GroupRequests,
  ManageCommunity,
  ManageGroups,
  Notifications,
  Workouts,
  challengeRequest,
} from '../screens';
import {updateActiveTabAction} from '../redux/reducers/activeTabSlice';

const MainStack = createStackNavigator();

const MainNavigator = ({props}) => {
  const dispatch = useDispatch();
  let obj = {
    screen: '',
  };

  React.useEffect(() => {
    dispatch(updateActiveTabAction(`Challenges`));
  }, []);

  const tabsStacks = ['Challenges', 'Workouts', 'Exercises', 'Community'];
  useNavigationState(state => {
    try {
      let currentRouteName =
        state?.routes[0]?.state?.routes?.slice(-1)[0]?.name;
      if (tabsStacks?.includes(currentRouteName)) {
        dispatch(updateActiveTabAction(`${currentRouteName}`));
      }
      if (currentRouteName === 'Challenges') {
        console.log('Hot');
        dispatch(updateActiveTabAction(`Challenges`));
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
      <MainStack.Screen
        name={screens.workouts}
        component={Workouts}
        options={{gestureEnabled: false}}
      />
      <MainStack.Screen
        name={screens.exercises}
        component={Exercises}
        options={{gestureEnabled: false}}
      />
      <MainStack.Screen
        name={screens.community}
        component={Community}
        options={{gestureEnabled: false}}
      />
      <MainStack.Screen
        name={screens.createChallenge}
        component={CreateChallenge}
        options={{gestureEnabled: false}}
      />
      <MainStack.Screen
        name={screens.createNewPost}
        component={CreateNewPost}
        options={{gestureEnabled: false}}
      />
      <MainStack.Screen
        name={screens.createNewGroup}
        component={CreateNewGroup}
        options={{gestureEnabled: false}}
      />
      <MainStack.Screen
        name={screens.manageCommunity}
        component={ManageCommunity}
        options={{gestureEnabled: false}}
      />
      <MainStack.Screen
        name={screens.manageGroups}
        component={ManageGroups}
        options={{gestureEnabled: false}}
      />
      <MainStack.Screen
        name={screens.editGroup}
        component={EditGroup}
        options={{gestureEnabled: false}}
      />
      <MainStack.Screen
        name={screens.friendRequests}
        component={FriendRequests}
        options={{gestureEnabled: false}}
      />
      <MainStack.Screen
        name={screens.groupRequests}
        component={GroupRequests}
        options={{gestureEnabled: false}}
      />
      <MainStack.Screen
        name={screens.challengeRequests}
        component={challengeRequest}
        options={{gestureEnabled: false}}
      />
      <MainStack.Screen
        name={screens.favorites}
        component={Favorites}
        options={{gestureEnabled: false}}
      />
      <MainStack.Screen
        name={screens.notifications}
        component={Notifications}
        options={{gestureEnabled: false}}
      />
      <MainStack.Screen
        name={screens.customWorkout}
        component={CustomWorkout}
        options={{gestureEnabled: false}}
      />
      <MainStack.Screen
        name={screens.detail}
        component={Detail}
        options={{gestureEnabled: false}}
      />
      {/* // screens are able to swipe back */}
    </MainStack.Navigator>
  );
};
export default MainNavigator;
