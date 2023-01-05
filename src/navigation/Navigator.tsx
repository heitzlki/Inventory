import * as React from 'react';
import { StatusBar } from 'react-native';

import { useSelector } from 'react-redux';
import { RootState } from 'store/index';

import { RootStackParamList } from './types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

import AuthStack from 'navigation/AuthStack';
import AppStack from 'navigation/AppStack';

export const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigator = () => {
  const auth = useSelector((state: RootState) => state.authReducer);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#292B2F" barStyle="dark-content" />
      {auth.signedIn ? <AppStack /> : <AuthStack />}
    </GestureHandlerRootView>
  );
};

export default Navigator;
