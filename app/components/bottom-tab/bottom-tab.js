import React from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {screens} from '../../config';
import {tabIcons} from '../../helpers';
import styles from './bottom-tab.styles';
import {theme} from '../../theme';
import {screenWidth} from '../../constants';

const BottomTab = props => {
  const tabActive = useSelector(state => state.ActiveTab.activeTab);

  const activeTabTextColor = theme.colors.activeTabColor;

  const pressHandler = goTo => {
    props.navigation.navigate(goTo);
  };

  return (
    <View style={[styles.container, {zIndex: 0}]}>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => pressHandler(screens.challenges)}>
        <View
          style={{
            height: 3,
            width: 0.08 * screenWidth,
            backgroundColor:
              tabActive === 'Challenges'
                ? theme.colors.secondaryBlack
                : theme.colors.transparent,
            marginBottom: 5,
          }}
        />
        {tabActive === 'Challenges'
          ? tabIcons.activeChallenge
          : tabIcons.challenge}
        {tabActive === 'Challenges' ? (
          <Text style={[styles.tabText, {color: activeTabTextColor}]}>
            Challenges
          </Text>
        ) : (
          <Text style={styles.tabText}>Challenges</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => pressHandler(screens.workouts)}>
        <View
          style={{
            height: 3,
            width: 0.08 * screenWidth,
            backgroundColor:
              tabActive === 'Workouts'
                ? theme.colors.secondaryBlack
                : theme.colors.transparent,
            marginBottom: 5,
          }}
        />
        {tabActive === 'Workouts' ? tabIcons.activeWorkout : tabIcons.workout}
        {tabActive === 'Workouts' ? (
          <Text style={[styles.tabText, {color: activeTabTextColor}]}>
            Workouts
          </Text>
        ) : (
          <Text style={styles.tabText}>Workouts</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => pressHandler(screens.exercises)}>
        <View
          style={{
            height: 3,
            width: 0.08 * screenWidth,
            backgroundColor:
              tabActive === 'Exercises'
                ? theme.colors.secondaryBlack
                : theme.colors.transparent,
            marginBottom: 5,
          }}
        />
        {tabActive === 'Exercises'
          ? tabIcons.activeExercise
          : tabIcons.exercise}
        {tabActive === 'Exercises' ? (
          <Text style={[styles.tabText, {color: activeTabTextColor}]}>
            Exercises
          </Text>
        ) : (
          <Text style={styles.tabText}>Exercises</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => pressHandler(screens.community)}>
        <View
          style={{
            height: 3,
            width: 0.08 * screenWidth,
            backgroundColor:
              tabActive === 'Community'
                ? theme.colors.secondaryBlack
                : theme.colors.transparent,
            marginBottom: 5,
          }}
        />
        {tabActive === 'Community'
          ? tabIcons.activeCommunity
          : tabIcons.community}
        {tabActive === 'Community' ? (
          <Text style={[styles.tabText, {color: activeTabTextColor}]}>
            Community
          </Text>
        ) : (
          <Text style={styles.tabText}>Community</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default BottomTab;
