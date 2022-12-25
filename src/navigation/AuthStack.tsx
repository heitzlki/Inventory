import { Stack } from 'navigation/Navigator';

import WelcomeScreen from 'screens/entry/EntryScreen';
import SignUpScreen from 'screens/auth/SignUpScreen';
import SignInScreen from 'screens/auth/SignInScreen';

import { RootStackScreenProps } from './types';

const EntryScreen = ({ navigation }: RootStackScreenProps<'Entry'>) => <></>;

const AuthStack = () => (
  <Stack.Navigator initialRouteName="Entry">
    <Stack.Screen name="Entry" component={EntryScreen} />
    <Stack.Screen name="SignIn" component={SignInScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
  </Stack.Navigator>
);

export default AuthStack;
