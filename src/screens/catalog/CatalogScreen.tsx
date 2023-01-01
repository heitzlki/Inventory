import { useRef, useState } from 'react';
import { View, Text, Pressable, FlatList } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/index';
import { activate } from 'store/drawer';

import { catalogProductAdd } from 'store/catalog';

import type { RootStackScreenProps } from 'navigation/types';

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import BottomSheet, { BottomSheetRefProps } from 'components/BottomSheet';

const CatalogScreen = ({
  route,
  navigation,
}: RootStackScreenProps<'Catalog'>) => {
  const catalog = useSelector((state: RootState) => state.catalogReducer);
  // const drawer = useSelector((state: RootState) => state.drawerReducer);
  const dispatch = useDispatch();

  const bottomSheetRef = useRef<BottomSheetRefProps>(null);

  const [bottomSheetProductId, setBottomSheetProductId] = useState('');

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
            Catalog
          </Text>
        </View>
      </View>

      <View style={{ flex: 1, paddingTop: 58, justifyContent: 'center' }}>
        <FlatList
          contentContainerStyle={{
            alignItems: 'center',
            paddingBottom: 64, // Bottom space for add button
          }}
          data={Object.keys(catalog)}
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
              onPress={() => {
                setBottomSheetProductId(item);
                bottomSheetRef?.current?.activate();
              }}>
              <View
                style={{
                  left: 0,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#DCDDDE',
                    fontWeight: '500',
                    fontSize: 16,
                    left: 14,
                  }}>
                  {catalog[item].name}
                </Text>
              </View>
              <Pressable
                style={{
                  position: 'absolute',
                  right: 0,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={() => {
                  // dispatch(
                  //   inventoryItemSetAmount({
                  //     inventoryId,
                  //     itemId: inventories[inventoryId].items[item].id,
                  //     newAmount: eval(
                  //       `${inventories[inventoryId].items[item].amount} + 1`,
                  //     ).toString(),
                  //   }),
                  // );
                }}>
                <View
                  style={{
                    flex: 1,
                    padding: 5,
                    margin: 5,
                    backgroundColor: '#292B2F',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 8,
                  }}>
                  <MaterialCommunityIcon
                    name="plus"
                    size={21}
                    color="#DCDDDE"
                  />
                </View>
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
                    // navigation.navigate('AmountInput', {
                    //   inventoryId,
                    //   itemId: inventories[inventoryId].items[item].id,
                    // });
                  }}>
                  <Text
                    style={{
                      color: '#DCDDDE',
                      fontWeight: '500',
                      fontSize: 16,
                    }}>
                    {/* {inventories[inventoryId].items[item].amount} */}
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
                    // dispatch(
                    //   inventoryItemSetAmount({
                    //     inventoryId,
                    //     itemId: inventories[inventoryId].items[item].id,
                    //     newAmount: eval(
                    //       `${inventories[inventoryId].items[item].amount} - 1`,
                    //     ).toString(),
                    //   }),
                    // );
                  }}>
                  <MaterialCommunityIcon
                    name="minus"
                    size={21}
                    color="#DCDDDE"
                  />
                </Pressable>
              </Pressable>
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
          dispatch(
            catalogProductAdd({
              name: `Prod ${Object.keys(catalog).length + 1}`,
              defaultAmount: '0',
              unit: 'g',
            }),
          );
        }}>
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
            // dispatch(inventoryDelete({ inventoryId: bottomSheetItemId }));
            bottomSheetRef?.current?.activate();
          }}>
          {/* <MaterialCommunityIcon
          name="trash-can-outline"
          size={25}
          color="#DCDDDE"
        /> */}
        </Pressable>
      </BottomSheet>
    </View>
  );
};

export default CatalogScreen;
