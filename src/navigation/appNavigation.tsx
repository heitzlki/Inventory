import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useSelector } from 'react-redux';
import { RootState } from 'store/index';

import type { RootStackParamList } from 'navigation/types';

import InventuriesScreen from 'screens/InventuriesScreen';
import InventuryScreen from 'screens/InventuryScreen';
import SettingsScreen from 'screens/SettingsScreen';
import SignUpScreen from 'screens/SignUpScreen';
import SignInScreen from 'screens/SignInScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation = () => {
  const auth = useSelector((state: RootState) => state.authReducer);

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: 'none' }}
      initialRouteName={auth.signedIn ? 'Inventuries' : 'SignIn'}>
      {auth.signedIn ? (
        <>
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Inventury" component={InventuryScreen} />
          <Stack.Screen name="Inventuries" component={InventuriesScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigation;
