import { useEffect, useState } from 'react';
import { View, Text, Pressable, FlatList, TextInput } from 'react-native';

import { useSelector, useDispatch, useStore } from 'react-redux';
import { RootState } from 'store/index';

import { catalogProductAdd } from 'store/catalog';
import type { ProductState } from 'store/catalog/state';
import { useSync } from 'hooks/useSync';

import type { RootStackScreenProps } from 'navigation/types';

import {
  MyBackground,
  MyTopBar,
  MyAddButton,
  MyPressableIcon,
  MyIcon,
} from 'components/custom';

const CatalogScreen = ({
  route,
  navigation,
}: RootStackScreenProps<'Catalog'>) => {
  const theme = useSelector((state: RootState) => state.themeReducer);

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
      <MyTopBar backButton={true} title="">
        <MyPressableIcon
          style={{ paddingHorizontal: 8 }}
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
            backgroundColor: theme.style.colorSix,
            paddingHorizontal: 8,
            flex: 1,
            borderRadius: 15,
            height: 42,
          }}>
          <MyIcon set="MaterialIcons" name="search" size={26} />
          <TextInput
            style={{
              color: theme.style.text,
              fontWeight: '500',
              fontSize: 16,
              flex: 1,
            }}
            placeholderTextColor={theme.style.textDim}
            value={searchQuery}
            onChangeText={handleSearchChange}
            placeholder="Search"
          />
          <MyPressableIcon
            style={{ paddingHorizontal: 8 }}
            onPress={() => {
              setSearchQuery('');
              setSearchResults(Object.values(catalog));
            }}
            set="MaterialIcons"
            name="clear"
            size={26}
          />
        </View>
      </MyTopBar>
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
              <MyIcon
                set="MaterialCommunityIcons"
                name="leaf"
                size={24}
                color="#98f5e1"
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

      <MyAddButton
        onPress={() => {
          dispatch(catalogProductAdd());

          const newProductId = Object.keys(store.getState().catalogReducer)[0];

          navigation.navigate('CatalogEditProduct', {
            productId: newProductId,
          });
        }}
      />
    </MyBackground>
  );
};

export default CatalogScreen;
