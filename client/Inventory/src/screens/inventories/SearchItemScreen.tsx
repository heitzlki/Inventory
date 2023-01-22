import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  FlatList,
  Modal,
  TextInput,
} from 'react-native';

import uuid from 'react-native-uuid';
import MyBackground from 'components/custom/MyBackground';

import { useFocusEffect } from '@react-navigation/native';

import inventories, {
  inventoryItemAdd,
  inventoryItemDelete,
} from 'store/inventories';
import type { ProductState } from 'store/catalog/state';
import { useSelector, useDispatch, useStore } from 'react-redux';
import { RootState } from 'store/index';

import type { RootStackScreenProps } from 'navigation/types';

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const SearchItemScreen = ({
  route,
  navigation,
}: RootStackScreenProps<'SearchItem'>) => {
  const { inventoryId } = route.params;

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ProductState[]>([]);

  const catalog = useSelector((state: RootState) => state.catalogReducer);

  const store = useStore<RootState>();

  const dispatch = useDispatch();

  function search(query: string): ProductState[] {
    // Convert the search query to lowercase to make the search case-insensitive
    query = query.toLowerCase();

    // Filter the catalog by products whose names contain the search query
    const results: ProductState[] = Object.values(catalog).filter(
      product => product.name.toLowerCase().indexOf(query) !== -1,
    );

    // Sort the results by the product name
    return results.sort((a, b) => a.name.localeCompare(b.name));
  }

  function handleSearchChange(query: string) {
    setSearchQuery(query);
    setSearchResults(search(query));
  }

  const inputRef = useRef<TextInput>(null);

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }, [inputRef]),
  );

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
          // justifyContent: 'center',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 8,
          }}>
          <Pressable
            style={{ marginHorizontal: 10 }}
            onPress={() => navigation.goBack()}>
            <MaterialCommunityIcon
              name="keyboard-backspace"
              size={26}
              color="#DCDDDE"
            />
          </Pressable>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#202225',
              paddingHorizontal: 8,
              flex: 1,
              borderRadius: 15,
              height: 42,
            }}>
            <MaterialIcon name="search" size={26} color="#DCDDDE" />
            <TextInput
              ref={inputRef}
              style={{
                color: '#DCDDDE',
                fontWeight: '500',
                fontSize: 16,
                flex: 1,
              }}
              placeholderTextColor={'#ABB0B6'}
              value={searchQuery}
              onChangeText={handleSearchChange}
              placeholder="Search"
            />
            <Pressable onPress={() => setSearchQuery('')}>
              <MaterialIcon name="clear" size={26} color="#DCDDDE" />
            </Pressable>
          </View>
        </View>
      </View>

      <View style={{ flex: 1, paddingTop: 58, justifyContent: 'center' }}>
        <FlatList
          contentContainerStyle={{
            alignItems: 'center',
            paddingBottom: 80, // Bottom space for add button
          }}
          data={searchResults}
          renderItem={({ item, index }) => (
            <Pressable
              key={item.id}
              style={{
                height: 50,
                minWidth: '95%',
                backgroundColor: '#2f3136',
                marginVertical: 4,
                borderRadius: 8,

                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => {
                dispatch(
                  inventoryItemAdd({
                    inventoryId,
                    productId: item.id,
                    name: item.name,
                  }),
                );
                const newItemId = Object.keys(
                  store.getState().invetoriesReducer[inventoryId].items,
                )[0];

                navigation.goBack();
                navigation.navigate('AmountInput', {
                  inventoryId,
                  itemId: newItemId,
                  prediction:
                    item.defaultAmount == '0' ? '' : item.defaultAmount,
                });
              }}>
              <View
                style={{
                  left: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <MaterialCommunityIcon name="leaf" size={24} color="#98f5e1" />
                <Text
                  style={{
                    color: '#DCDDDE',
                    fontWeight: '500',
                    fontSize: 16,
                    left: 4,
                  }}>
                  {item.name}
                </Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  right: 0,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginHorizontal: 10,
                }}>
                <Text
                  style={{
                    color: '#ABB0B6',
                    fontWeight: '500',
                    fontSize: 16,
                    marginHorizontal: 10,
                  }}>
                  {item.defaultAmount}
                </Text>
                <Text
                  style={{
                    color: '#ABB0B6',
                    fontWeight: '500',
                    fontSize: 16,
                  }}>
                  {item.unit}
                </Text>
              </View>
            </Pressable>
          )}
          ListFooterComponent={
            <Text
              style={{
                color: '#ABB0B6',
                fontWeight: '500',
                fontSize: 16,
                marginVertical: 10,
              }}
              onPress={() => navigation.navigate('Catalog')}>
              Create new
            </Text>
          }
        />
      </View>
    </MyBackground>
  );
};

export default SearchItemScreen;
