import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignUpScreen from 'screens/SignUpScreen';
import SignInScreen from 'screens/SignInScreen';
import WelcomeScreen from 'screens/WelcomeScreen';

import type { StartupNavParamList } from 'navigation/types';

const StartupStack = createNativeStackNavigator<StartupNavParamList>();

const StartupNav = () => {
  return (
    <StartupStack.Navigator initialRouteName="Welcome">
      <StartupStack.Screen name="SignIn" component={SignInScreen} />
      <StartupStack.Screen name="SignUp" component={SignUpScreen} />
      <StartupStack.Screen name="Welcome" component={WelcomeScreen} />
    </StartupStack.Navigator>
  );
};

export default StartupNav;
