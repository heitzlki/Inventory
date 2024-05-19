import * as React from 'react';
import { StatusBar } from 'react-native';

import { RootStackParamList } from './types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useStyles } from 'hooks/useStyles';

import AppStack from 'navigation/AppStack';

export const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigator = () => {
  const { styles } = useStyles();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar
        backgroundColor={styles.colors.paletteFive}
        barStyle="dark-content"
      />
      <AppStack />
    </GestureHandlerRootView>
  );
};

export default Navigator;
