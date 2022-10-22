import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './appNavigation';

const Navigation = () => {
  return (
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
  );
};

export default Navigation;
