import { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  FlatList,
  TextInput,
  BackHandler,
} from 'react-native';

import { useSelector, useDispatch, useStore } from 'react-redux';
import { RootState } from 'store/index';
import { activate } from 'store/drawer';

import {
  inventoryAdd,
  inventoryDelete,
  inventoryEdit,
} from 'store/inventories';

import type { RootStackScreenProps } from 'navigation/types';

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import BottomSheet, { BottomSheetRefProps } from 'components/BottomSheet';

import MyBackground from 'components/custom/MyBackground';
import MyTopBar from 'components/custom/MyTopBar';
import MyPressableIcon from 'components/custom/MyPressableIcon';
import MyAddButton from 'components/custom/MyAddButton';
import MyBottomSheet from 'components/custom/MyBottomSheet';

const MainScreen = ({ route, navigation }: RootStackScreenProps<'Main'>) => {
  const inventories = useSelector(
    (state: RootState) => state.invetoriesReducer,
  );
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

      <FlatList
        contentContainerStyle={{
          alignItems: 'center',
          paddingBottom: 80, // Bottom space for add button
        }}
        data={Object.keys(inventories)}
        renderItem={({ item, index }) => (
          <Pressable
            key={item}
            style={{
              height: 50,
              maxWidth: '95%',
              minWidth: '95%',
              backgroundColor: '#2f3136',
              marginVertical: 4,
              borderRadius: 8,
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() =>
              navigation.navigate('Inventory', {
                inventoryId: inventories[item].id,
              })
            }>
            <View
              style={{
                left: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <MaterialCommunityIcon name="archive" size={24} color="#c1d3fe" />
              <Text
                style={{
                  color: '#DCDDDE',
                  fontWeight: '500',
                  fontSize: 16,
                  left: 4,
                }}>
                {inventories[item].name}
              </Text>
            </View>
            <View style={{ position: 'absolute', right: 0 }}>
              <Pressable
                onPress={() => {
                  bottomSheetRef?.current?.activate();

                  setBottomSheetInventoryId(item);
                }}>
                <MaterialCommunityIcon
                  name="dots-vertical"
                  size={28}
                  color="#DCDDDE"
                />
              </Pressable>
            </View>
          </Pressable>
        )}
      />

      <MyBottomSheet
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
