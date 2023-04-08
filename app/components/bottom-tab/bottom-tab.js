import React from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {screens} from '../../config';
import {tabIcons} from '../../helpers';
import styles from './bottom-tab.styles';
import {theme} from '../../theme';

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
    </View>
  );
};

export default BottomTab;
