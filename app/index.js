import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {LogBox} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {Provider as PaperProvider} from 'react-native-paper';

import AppNavigator from './navigation/root-stack';
import {theme} from './theme';

const App = () => {
  React.useEffect(() => {
    SplashScreen.hide();
    LogBox.ignoreAllLogs();
  }, []);

  return (
    <>
      <PaperProvider>
        <NavigationContainer theme={theme}>
          <AppNavigator />
        </NavigationContainer>
      </PaperProvider>
    </>
  );
};

export default App;
