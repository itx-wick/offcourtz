import {Provider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {LogBox} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import AppNavigator from './navigation/root-stack';
import {theme} from './theme';
import {persistor, store} from './redux/store';

const App = () => {
  React.useEffect(() => {
    SplashScreen.hide();
    LogBox.ignoreAllLogs();
  }, []);
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <PaperProvider>
            <NavigationContainer theme={theme}>
              <AppNavigator />
            </NavigationContainer>
          </PaperProvider>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
