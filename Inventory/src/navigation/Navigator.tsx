import * as React from 'react';
import { StatusBar } from 'react-native';

// import { useSelector } from 'react-redux';
// import { RootState } from 'store/index';
import { useAuth } from 'hooks/useAuth';

import { RootStackParamList } from './types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useStyles } from 'hooks/useStyles';

// import AuthStack from 'navigation/AuthStack';
import AppStack from 'navigation/AppStack';
// import App from 'App';

export const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigator = () => {
  // const auth = useSelector((state: RootState) => state.authReducer);
  // const { user } = useAuth();

  const { styles } = useStyles();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar
        backgroundColor={styles.colors.paletteFive}
        barStyle="dark-content"
      />
      {/* {user ? <AppStack /> : <AuthStack />} */}
      <AppStack />
    </GestureHandlerRootView>
  );
};

export default Navigator;
