import {Provider} from 'react-redux';
import {ThemeProvider} from 'react-native-elements';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {AppState, LogBox} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {ToastProvider} from 'react-native-toast-notifications';

import AppNavigator from './navigation/root-stack';
import {theme} from './theme';
import {persistor, store} from './redux/store';
import {StripeProvider} from '@stripe/stripe-react-native';

const App = () => {
  React.useEffect(() => {
    SplashScreen.hide();
    LogBox.ignoreAllLogs();
  }, []);
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StripeProvider
            publishableKey={
              'pk_test_51NAXSiJppEpHaEkXacREtvERTqGpzcLMbP05XCXgp8rfniDZR4fsy5wNveGDS6J7oOQXVtzXOGLxPjIci12dnhhn00ydOUph1a'
            }>
            <ThemeProvider>
              <ToastProvider>
                <NavigationContainer theme={theme}>
                  <AppNavigator />
                </NavigationContainer>
              </ToastProvider>
            </ThemeProvider>
          </StripeProvider>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
