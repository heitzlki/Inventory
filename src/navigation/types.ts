import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Inventury: { inventuryId: string };
  Settings: undefined;
  SearchItem: { inventuryId: string };

  Drawer: undefined;

  Welcome: undefined;
  SignIn: undefined;
  SignUp: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
