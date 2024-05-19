import { Stack } from 'navigation/Navigator';

import EntryScreen from 'screens/entry/EntryScreen';
import SignUpScreen from 'screens/auth/SignUpScreen';
import SignInScreen from 'screens/auth/SignInScreen';

import { RootStackScreenProps } from './types';

const AuthStack = () => (
  <Stack.Navigator
    initialRouteName="Entry"
    screenOptions={{ headerShown: false, animation: 'none' }}>
    <Stack.Screen name="Entry" component={EntryScreen} />
    <Stack.Screen name="SignIn" component={SignInScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
  </Stack.Navigator>
);

export default AuthStack;
