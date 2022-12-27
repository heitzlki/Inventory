import { Stack } from 'navigation/Navigator';

import MainScreen from 'screens/main/MainScreen';
import InventoryScreen from 'screens/inventories/InventoryScreen';
import SettingsScreen from 'screens/settings/SettingsScreen';
import SearchItemScreen from 'screens/inventories/SearchItemScreen';
import AmountInputScreen from 'screens/inventories/AmountInputScreen';
import CatalogScreen from 'screens/catalog/CatalogScreen';
import Drawer from 'components/Drawer';

const AppStack = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false, animation: 'none' }}
    initialRouteName={'Main'}>
    <Stack.Screen name="Main" component={MainScreen} />
    <Stack.Screen name="Inventory" component={InventoryScreen} />
    <Stack.Screen name="Settings" component={SettingsScreen} />
    <Stack.Screen name="SearchItem" component={SearchItemScreen} />
    <Stack.Screen name="AmountInput" component={AmountInputScreen} />
    <Stack.Screen name="Catalog" component={CatalogScreen} />
    <Stack.Screen
      name="Drawer"
      options={{ presentation: 'transparentModal' }}
      component={Drawer}
    />
  </Stack.Navigator>
);

export default AppStack;
