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

const MainScreen = ({ route, navigation }: RootStackScreenProps<'Main'>) => {
  const inventories = useSelector(
    (state: RootState) => state.invetoriesReducer,
  );
  // const drawer = useSelector((state: RootState) => state.drawerReducer);
  const dispatch = useDispatch();

  const bottomSheetRef = useRef<BottomSheetRefProps>(null);

  const [bottomSheetInventoryId, setBottomSheetInventoryId] = useState('');

  const editNameRef = useRef<TextInput>(null);

  const store = useStore<RootState>();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (bottomSheetRef.current?.isActive()) {
          bottomSheetRef.current?.activate();
          return true;
        } else {
          return false;
        }
      },
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  return (
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
                  inventoryId: inventories[item].id,
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
        onPress={() => {
          dispatch(inventoryAdd());

          const newInventoryId = Object.keys(
            store.getState().invetoriesReducer,
          )[0];
          setBottomSheetInventoryId(newInventoryId);

          bottomSheetRef?.current?.activate();
          editNameRef?.current?.focus();
        }}>
        <MaterialCommunityIcon name="plus" size={40} color="#DCDDDE" />
      </Pressable>

      <BottomSheet
        ref={bottomSheetRef}
        backgroundTapAction={() => editNameRef.current?.blur()}>
        <View
          style={{
            height: 42,
            width: '95%',
            backgroundColor: '#2f3136',
            marginVertical: 4,
            borderRadius: 8,

            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',

            alignSelf: 'center',
          }}>
          <TextInput
            ref={editNameRef}
            style={{
              marginLeft: 4,
              color: '#DCDDDE',
              fontWeight: '500',
              fontSize: 16,
              flex: 1,
            }}
            value={inventories[bottomSheetInventoryId]?.name || ''}
            onChangeText={text => {
              dispatch(
                inventoryEdit({
                  inventoryId: bottomSheetInventoryId,
                  name: text,
                }),
              );
            }}
            onSubmitEditing={() => {
              bottomSheetRef?.current?.activate();
            }}
          />
        </View>
        <Pressable
          style={{
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',

            borderRadius: 8,

            height: 42,
            width: '95%',
            backgroundColor: '#2f3136',
          }}
          onPress={() => {
            dispatch(inventoryDelete({ inventoryId: bottomSheetInventoryId }));
            editNameRef?.current?.blur();
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
  );
};

export default MainScreen;
