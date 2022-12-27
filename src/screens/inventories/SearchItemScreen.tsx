import { useState } from 'react';
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

import { inventoryItemAdd } from 'store/inventories';
import type { ProductState } from 'store/catalog/state';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/index';

import type { RootStackScreenProps } from 'navigation/types';

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const SearchItemScreen = ({
  route,
  navigation,
}: RootStackScreenProps<'SearchItem'>) => {
  const { inventoryId } = route.params;

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ProductState[]>([]);

  const catalog = useSelector((state: RootState) => state.catalogReducer);

  const dispatch = useDispatch();

  function search(query: string): ProductState[] {
    const results: ProductState[] = [];
    for (const key in catalog) {
      if (catalog[key].name.indexOf(query) !== -1) {
        results.push(catalog[key]);
      }
    }
    return results;
  }

  function handleSearchChange(query: string) {
    setSearchQuery(query);
    setSearchResults(search(query));
  }

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
          // justifyContent: 'center',
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
          <TextInput
            style={{
              color: '#DCDDDE',
              fontWeight: '500',
              fontSize: 16,
            }}
            placeholderTextColor={'#BCBFC5'}
            value={searchQuery}
            onChangeText={handleSearchChange}
            placeholder="Search"
          />
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
                maxWidth: '95%',
                minWidth: '95%',
                backgroundColor: '#2f3136',
                marginVertical: 4,
                borderRadius: 8,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => {
                let itemId = uuid.v4().toString();
                dispatch(inventoryItemAdd({ inventoryId, id: itemId }));

                navigation.goBack();
                navigation.navigate('AmountInput', { inventoryId, itemId });
              }}>
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
                  {item.name}
                </Text>
              </View>
              <View style={{ position: 'absolute', right: 0 }}>
                {/* <Pressable>
                  <MaterialCommunityIcon
                    name="dots-vertical"
                    size={28}
                    color="#DCDDDE"
                  />
                </Pressable> */}
              </View>
            </Pressable>
          )}
        />
      </View>
    </View>
  );
};

export default SearchItemScreen;
