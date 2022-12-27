import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type AppStackParamList = {
  Main: undefined;
  Inventory: { inventoryId: string };
  Settings: undefined;
  SearchItem: { inventoryId: string };
  AmountInput: { inventoryId: string; itemId: string };
  Catalog: undefined;
  Drawer: undefined;
};

export type AuthStackParamList = {
  Entry: undefined;
  SignIn: undefined;
  SignUp: undefined;
};

export type RootStackParamList = AppStackParamList & AuthStackParamList;

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
