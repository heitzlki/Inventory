import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { PortalProvider } from '@gorhom/portal';

import { store, persistor } from 'store/index';
import Navigation from 'navigation/index';

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
