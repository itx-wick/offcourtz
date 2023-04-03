import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import AppNavigator from './navigation/root-stack';
import {theme} from './theme';

const App = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <NavigationContainer theme={theme}>
          <AppNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
