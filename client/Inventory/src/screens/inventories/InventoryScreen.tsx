import { useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  FlatList,
  Pressable,
  TextInput,
} from 'react-native';
import type { RootStackScreenProps } from 'navigation/types';

import { useSelector, useDispatch } from 'react-redux';
import { inventoryItemSetAmount, inventoryItemDelete } from 'store/inventories';
import { RootState } from 'store/index';

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import MyBackground from 'components/custom/MyBackground';

import { useFormatCreateAndShareXlsx } from 'hooks/useFormatCreateShareXlsx/useFormatCreateShareXlsx';

const InventoryScreen = ({
  route,
  navigation,
}: RootStackScreenProps<'Inventory'>) => {
  const inventoryId = route.params.inventoryId;

  const inventories = useSelector(
    (state: RootState) => state.invetoriesReducer,
  );
  const dispatch = useDispatch();

  const formatCreateAndShare = useFormatCreateAndShareXlsx(inventoryId);

  return (
    <MyBackground>
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
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', left: 10 }}>
          <Pressable style={{}} onPress={() => navigation.goBack()}>
            <MaterialCommunityIcon
              name="keyboard-backspace"
              size={26}
              color="#DCDDDE"
            />
          </Pressable>
          <Text
            style={{
              color: '#DCDDDE',
              fontWeight: '500',
              fontSize: 16,
              left: 4,
            }}>
            {inventories[inventoryId].name}
          </Text>
        </View>
        <View
          style={{
            position: 'absolute',
            right: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Pressable style={{}} onPress={() => formatCreateAndShare()}>
            <MaterialIcon name="ios-share" size={26} color="#DCDDDE" />
          </Pressable>
        </View>
      </View>

      <View style={{ flex: 1, paddingTop: 58, justifyContent: 'center' }}>
        <FlatList
          contentContainerStyle={{
            alignItems: 'center',
            paddingBottom: 84,
          }}
          data={Object.keys(inventories[inventoryId].items)}
          renderItem={({ item, index }) => (
            <Pressable
              key={item}
              style={{
                height: 50,
                minWidth: '95%',
                backgroundColor: '#2f3136',
                marginVertical: 4,
                borderRadius: 8,

                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  left: 0,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Pressable
                  style={{ marginLeft: 4 }}
                  onPress={() =>
                    dispatch(inventoryItemDelete({ inventoryId, itemId: item }))
                  }>
                  <MaterialCommunityIcon
                    name="trash-can-outline"
                    size={24}
                    color="#DCDDDE"
                  />
                </Pressable>
                <Text
                  style={{
                    color: '#DCDDDE',
                    fontWeight: '500',
                    fontSize: 16,
                    marginLeft: 4,
                  }}>
                  {inventories[inventoryId].items[item].name}
                </Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  right: 0,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Pressable
                  style={{
                    flex: 1,
                    padding: 5,
                    margin: 5,
                    backgroundColor: '#292B2F',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 8,
                  }}
                  onPress={() => {
                    dispatch(
                      inventoryItemSetAmount({
                        inventoryId,
                        itemId: inventories[inventoryId].items[item].id,
                        newAmount: eval(
                          `${inventories[inventoryId].items[item].amount} + 1`,
                        ).toString(),
                      }),
                    );
                  }}>
                  <MaterialCommunityIcon
                    name="plus"
                    size={21}
                    color="#DCDDDE"
                  />
                </Pressable>
                <Pressable
                  style={{
                    flex: 1,
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    backgroundColor: '#202225',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 8,
                  }}
                  onPress={() => {
                    navigation.navigate('AmountInput', {
                      inventoryId,
                      itemId: inventories[inventoryId].items[item].id,
                    });
                  }}>
                  <Text
                    style={{
                      color: '#DCDDDE',
                      fontWeight: '500',
                      fontSize: 16,
                    }}>
                    {inventories[inventoryId].items[item].amount}
                  </Text>
                </Pressable>
                <Pressable
                  style={{
                    flex: 1,
                    padding: 5,
                    margin: 5,
                    backgroundColor: '#292B2F',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 8,
                  }}
                  onPress={() => {
                    dispatch(
                      inventoryItemSetAmount({
                        inventoryId,
                        itemId: inventories[inventoryId].items[item].id,
                        newAmount: eval(
                          `${inventories[inventoryId].items[item].amount} - 1`,
                        ).toString(),
                      }),
                    );
                  }}>
                  <MaterialCommunityIcon
                    name="minus"
                    size={21}
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
        onPress={() => navigation.navigate('SearchItem', { inventoryId })}>
        <MaterialCommunityIcon name="plus" size={40} color="#DCDDDE" />
      </Pressable>
    </MyBackground>
  );
};

export default InventoryScreen;