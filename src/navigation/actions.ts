import {
  CommonActions,
  createNavigationContainerRef,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type { NavigationContainerRef } from '@react-navigation/native';

import type {
  RootStackParamList,
  RootStackScreenProps,
  AppTabScreenProps,
  AppTabParamList,
} from 'navigation/types';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

// TODO: Add Type checking (https://reactnavigation.org/docs/navigating-without-navigation-prop/)
// params: NavigatorScreenParams<RootStackParamList[keyof RootStackParamList]['screen']>,
export const navigate = (name: keyof RootStackParamList, params: any) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
};

export const navigateAndReset = (routes = [], index = 0) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes,
      }),
    );
  }
};

export const navigateAndSimpleReset = (name: string, index = 0) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes: [{ name }],
      }),
    );
  }
};
