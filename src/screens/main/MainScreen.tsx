import { useRef, useState } from 'react';
import { View, Text, Pressable, FlatList } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/index';
import { activate } from 'store/drawer';

import { inventoryyAdd, inventoryyDelete } from 'store/inventories';

import type { RootStackScreenProps } from 'navigation/types';

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import BottomSheet, { BottomSheetRefProps } from 'components/BottomSheet';

const MainScreen = ({ route, navigation }: RootStackScreenProps<'Main'>) => {
  const inventories = useSelector(
    (state: RootState) => state.inveturiesReducer,
  );
  // const drawer = useSelector((state: RootState) => state.drawerReducer);
  const dispatch = useDispatch();

  const bottomSheetRef = useRef<BottomSheetRefProps>(null);

  const [bottomSheetInventoryId, setBottomSheetInventoryId] = useState('');

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
      }}>
      <View style={{ flex: 1, backgroundColor: '#36393f' }}>
        <View
          style={{
            position: 'absolute',
            zIndex: 2,
            top: 0,
            width: '100%',
            height: 58,

            backgroundColor: '#292B2F',
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            justifyContent: 'center',
          }}>
          <View>
            <Pressable
              style={{ left: 10 }}
              onPress={() => {
                navigation.navigate('Drawer');
                dispatch(activate());
              }}>
              <MaterialCommunityIcon name="menu" size={30} color="#DCDDDE" />
            </Pressable>
          </View>
        </View>

        <View style={{ flex: 1, paddingTop: 58, justifyContent: 'center' }}>
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
                    inventoryyId: inventories[item].id,
                  })
                }>
                <View
                  style={{
                    left: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <MaterialCommunityIcon
                    name="archive"
                    size={24}
                    color="#c1d3fe"
                  />
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
        </View>

        <Pressable
          style={{
            position: 'absolute',
            alignSelf: 'flex-end',
            bottom: 20,
            right: 20,
            alignItems: 'center',
            justifyContent: 'center',
            width: 60,
            height: 60,
            borderRadius: 15,
            backgroundColor: '#202225',
          }}
          onPress={() => dispatch(inventoryyAdd())}>
          <MaterialCommunityIcon name="plus" size={40} color="#DCDDDE" />
        </Pressable>

        <BottomSheet ref={bottomSheetRef}>
          <Pressable
            style={{
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',

              borderRadius: 15,

              height: 34,
              width: '95%',
              backgroundColor: '#2f3136',
            }}
            onPress={() => {
              dispatch(
                inventoryyDelete({ inventoryyId: bottomSheetInventoryId }),
              );
              bottomSheetRef?.current?.activate();
            }}>
            <MaterialCommunityIcon
              name="trash-can-outline"
              size={25}
              color="#DCDDDE"
            />
          </Pressable>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default MainScreen;
