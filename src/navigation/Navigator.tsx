import * as React from 'react';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from 'store/index';

import { RootStackParamList } from './types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from 'screens/HomeScreen';
import InventuryScreen from 'screens/InventuryScreen';
import SettingsScreen from 'screens/SettingsScreen';
import SearchItemScreen from 'screens/SearchItemScreen';

import WelcomeScreen from 'screens/WelcomeScreen';
import SignUpScreen from 'screens/SignUpScreen';
import SignInScreen from 'screens/SignInScreen';

export const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigator = () => {
  const auth = useSelector((state: RootState) => state.authReducer);

  return (
    <Stack.Navigator
      initialRouteName={auth.signedIn ? 'Home' : 'Welcome'}
      screenOptions={{ animation: 'none' }}>
      {auth.signedIn ? (
        <Stack.Group>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Inventury"
            component={InventuryScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen
            name="SearchItem"
            component={SearchItemScreen}
            options={{ headerShown: false }}
          />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default Navigator;
