import { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  FlatList,
  TextInput,
  BackHandler,
} from 'react-native';

import { useDispatch, useStore } from 'react-redux';
import { RootState } from 'store/index';
import { activate } from 'store/drawer';

import { inventoryAdd } from 'store/inventories';

import type { RootStackScreenProps } from 'navigation/types';

import { BottomSheetRefProps } from 'components/BottomSheet';

import MyBackground from 'components/custom/MyBackground';
import MyTopBar from 'components/custom/MyTopBar';
import MyPressableIcon from 'components/custom/MyPressableIcon';
import MyAddButton from 'components/custom/MyAddButton';
import InventoryBottomSheet from 'components/inventory/InventoryBottomSheet';

import InventoryList from 'components/inventory/InventoryList';

const MainScreen = ({ route, navigation }: RootStackScreenProps<'Main'>) => {
  const dispatch = useDispatch();

  const [bottomSheetInventoryId, setBottomSheetInventoryId] = useState('');
  const bottomSheetRef = useRef<BottomSheetRefProps>(null);
  const editNameRef = useRef<TextInput>(null);

  const store = useStore<RootState>();

  return (
    <MyBackground>
      <MyTopBar backButton={false} title="">
        <MyPressableIcon
          onPress={() => {
            navigation.navigate('Drawer');
            dispatch(activate());
          }}
          set="MaterialCommunityIcons"
          name="menu"
          size={30}
        />
      </MyTopBar>
      <View style={{ alignItems: 'center' }}></View>

      <InventoryList
        bottomSheetRef={bottomSheetRef}
        setBottomSheetInventoryId={setBottomSheetInventoryId}
      />

      <InventoryBottomSheet
        inventoryId={bottomSheetInventoryId}
        bottomSheetRef={bottomSheetRef}
        editNameRef={editNameRef}
      />

      <MyAddButton
        onPress={() => {
          dispatch(inventoryAdd());

          const newInventoryId = Object.keys(
            store.getState().invetoriesReducer,
          )[0];
          setBottomSheetInventoryId(newInventoryId);

          bottomSheetRef.current?.activate();
          editNameRef.current?.focus();
        }}
      />
    </MyBackground>
  );
};

export default MainScreen;
