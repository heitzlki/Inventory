import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { PortalHost, PortalProvider } from '@gorhom/portal';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { store, persistor } from 'store/index';
import Navigation from 'navigation/index';
import Drawer from 'components/Drawer';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PortalProvider>
          <Navigation />
        </PortalProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
