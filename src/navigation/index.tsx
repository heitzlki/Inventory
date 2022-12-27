import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from 'navigation/Navigator';
import { createNavigationContainerRef } from '@react-navigation/native';
import type { RootStackParamList } from './types';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

const Navigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Navigator />
    </NavigationContainer>
  );
};

export default Navigation;
