import { useEffect, useState } from 'react';
import { View, Text, Pressable, FlatList, TextInput } from 'react-native';

import { useSelector, useDispatch, useStore } from 'react-redux';
import { RootState } from 'store/index';

import { catalogProductAdd } from 'store/catalog';
import type { ProductState } from 'store/catalog/state';
import { useSync } from 'hooks/useSync';

import type { RootStackScreenProps } from 'navigation/types';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import MyBackground from 'components/custom/MyBackground';
import MyPressableIcon from 'components/custom/MyPressableIcon';

const CatalogScreen = ({
  route,
  navigation,
}: RootStackScreenProps<'Catalog'>) => {
  const catalog = useSelector((state: RootState) => state.catalogReducer);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ProductState[]>([]);

  useEffect(() => {
    setSearchResults(Object.values(catalog));
  }, [catalog]);

  const store = useStore<RootState>();

  const dispatch = useDispatch();

  function search(query: string): ProductState[] {
    if (query == '') {
      return Object.values(catalog);
    }

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

  const { sync } = useSync();

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
          <MyPressableIcon
            style={{ marginRight: 10 }}
            onPress={() => {
              sync();
            }}
            set="MaterialCommunityIcons"
            name="sync"
            size={24}
          />
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
            <Pressable
              onPress={() => {
                setSearchQuery('');
                setSearchResults(Object.values(catalog));
              }}>
              <MaterialIcon name="clear" size={26} color="#DCDDDE" />
            </Pressable>
          </View>
        </View>
      </View>

      <View style={{ flex: 1, paddingTop: 58, justifyContent: 'center' }}>
        <FlatList
          contentContainerStyle={{
            alignItems: 'center',
            paddingBottom: 84,
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
              onPress={() =>
                navigation.navigate('CatalogEditProduct', {
                  productId: item.id,
                })
              }>
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
          dispatch(catalogProductAdd());

          const newProductId = Object.keys(store.getState().catalogReducer)[0];

          navigation.navigate('CatalogEditProduct', {
            productId: newProductId,
          });
        }}>
        <MaterialCommunityIcon name="plus" size={40} color="#DCDDDE" />
      </Pressable>
    </MyBackground>
  );
};

export default CatalogScreen;
