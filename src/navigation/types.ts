import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { DrawerScreenProps } from '@react-navigation/drawer';

export type RootStackParamList = {
  DrawerNav: NavigatorScreenParams<DrawerNavParamList>;
  StartupNav: NavigatorScreenParams<StartupNavParamList>;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type DrawerNavParamList = {
  Home: undefined;
  Inventury: { inventuryIndex: number };
};

export type DrawerNavScreenProps<T extends keyof DrawerNavParamList> =
  CompositeScreenProps<
    DrawerScreenProps<DrawerNavParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

export type StartupNavParamList = {
  Welcome: undefined;
  SignIn: undefined;
  SignUp: undefined;
};

export type StartupNavScreenProps<T extends keyof StartupNavParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<StartupNavParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
