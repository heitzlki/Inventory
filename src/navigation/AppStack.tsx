import { Stack } from 'navigation/Navigator';

import MainScreen from 'screens/main/MainScreen';
import InventuryScreen from 'screens/inventuries/InventuryScreen';
import SettingsScreen from 'screens/settings/SettingsScreen';
import SearchItemScreen from 'screens/inventuries/SearchItemScreen';
import AmountInputScreen from 'screens/inventuries/AmountInputScreen';
import Drawer from 'components/Drawer';

const AppStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Main" component={MainScreen} />
    <Stack.Screen name="Inventury" component={InventuryScreen} />
    <Stack.Screen name="Settings" component={SettingsScreen} />
    <Stack.Screen name="SearchItem" component={SearchItemScreen} />
    <Stack.Screen name="AmountInput" component={AmountInputScreen} />
    <Stack.Screen name="Drawer" component={Drawer} />
  </Stack.Navigator>
);

export default AppStack;
