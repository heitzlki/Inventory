import { useEffect, useState, useRef } from 'react';
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

import { MyText, MyCategoryLabel } from 'components/custom';

import useSearch from 'hooks/useSearch';
import useSortedCategories from 'hooks/useSortedCategories';

const CatalogScreen = ({
  route,
  navigation,
}: RootStackScreenProps<'Catalog'>) => {
  const theme = useSelector((state: RootState) => state.themeReducer);

  const catalog = useSelector((state: RootState) => state.catalogReducer);

  // const [searchQuery, setSearchQuery] = useState('');
  // const [searchResults, setSearchResults] = useState<ProductState[]>([]);

  // useEffect(() => {
  //   setSearchResults(Object.values(catalog));
  // }, [catalog]);

  const store = useStore<RootState>();

  const dispatch = useDispatch();

  // function search(query: string): ProductState[] {
  //   if (query == '') {
  //     return Object.values(catalog);
  //   }

  //   // Convert the search query to lowercase to make the search case-insensitive
  //   query = query.toLowerCase();

  //   // Filter the catalog by products whose names contain the search query
  //   const results: ProductState[] = Object.values(catalog).filter(
  //     product => product.name.toLowerCase().indexOf(query) !== -1,
  //   );

  //   // Sort the results by the product name
  //   return results.sort((a, b) => a.name.localeCompare(b.name));
  // }

  // function handleSearchChange(query: string) {
  //   setSearchQuery(query);
  //   setSearchResults(search(query));
  // }

  const [
    searchResults,
    handleSearchChange,
    searchQuery,
    setSearchQuery,
    searchCategories,
    setSearchCategories,
  ] = useSearch();

  const sortedCategories = useSortedCategories(searchCategories);

  const { sync } = useSync();

  const [topBarHeight, setTopBarHeight] = useState<number>();

  return (
    <MyBackground>
      <MyTopBar
        backButton={true}
        title=""
        style={{ height: topBarHeight, borderBottomRightRadius: 0 }}>
        <MyPressableIcon
          style={{ marginLeft: 10 }}
          onPress={() => {
            sync();
          }}
          set="MaterialCommunityIcons"
          name="sync"
          size={24}
        />
        <View
          onLayout={event => {
            const { height } = event.nativeEvent.layout;
            setTopBarHeight(height);
          }}
          style={{
            flexDirection: 'column',
            position: 'relative',
            width: '100%',
            paddingHorizontal: 10,
            right: 0,
          }}>
          <View
            style={{
              right: 0,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: theme.style.colorSix,
              paddingHorizontal: 8,
              flex: 1,
              borderRadius: 15,
              maxHeight: 42,
              minHeight: 42,
              marginRight: 50,
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
              }}
              set="MaterialIcons"
              name="clear"
              size={26}
            />
          </View>
          <View
            style={{
              height: 54,
              marginRight: 50,
            }}>
            <FlatList
              horizontal
              contentContainerStyle={{
                alignItems: 'center',
                marginVertical: 8,
              }}
              data={sortedCategories}
              renderItem={({ item }) => (
                <Pressable
                  key={item}
                  style={{
                    marginHorizontal: 2,
                    marginVertical: 4,
                  }}
                  onPress={() => {
                    if (searchCategories.includes(item)) {
                      setSearchCategories(
                        searchCategories.filter(category => category != item),
                      );
                    } else {
                      setSearchCategories([...searchCategories, item]);
                    }
                  }}>
                  <MyCategoryLabel
                    category={item}
                    style={{
                      borderWidth: searchCategories.includes(item) ? 3 : 2,
                      borderColor: searchCategories.includes(item)
                        ? theme.style.text
                        : theme.style.categoryColors[item].colorTwo,
                    }}
                  />
                </Pressable>
              )}
            />
          </View>
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
              height: 60,
              minWidth: '95%',
              backgroundColor: theme.style.colorFour,
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
                flexDirection: 'row',
                alignItems: 'center',
                left: 0,
                marginLeft: 6,
              }}>
              <View>
                <MyText
                  style={{
                    fontWeight: '500',
                    fontSize: 16,
                    marginLeft: 6,
                    marginBottom: 2,
                  }}
                  text={item.name}
                />
                <MyCategoryLabel
                  category={item.category}
                  style={{ alignSelf: 'flex-start' }}
                />
              </View>
            </View>
            <View
              style={{
                position: 'absolute',
                right: 0,
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 10,
              }}>
              <View
                style={{
                  flex: 1,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  backgroundColor: theme.style.colorSix,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 8,
                  marginHorizontal: 4,
                  borderColor: '#ffd42ad6',
                  borderWidth: 2,
                }}>
                <MyText
                  style={{
                    fontWeight: '500',
                    fontSize: 16,
                  }}
                  text={item.defaultAmountOne}
                />
              </View>
              {item.amountType === 'double' ? (
                <View
                  style={{
                    flex: 1,
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    backgroundColor: theme.style.colorSix,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 8,
                    marginHorizontal: 4,
                    borderColor: '#2ad6ffd6',
                    borderWidth: 2,
                  }}>
                  <MyText
                    style={{
                      fontWeight: '500',
                      fontSize: 16,
                    }}
                    text={item.defaultAmountTwo}
                  />
                </View>
              ) : null}
              <View
                style={{
                  flex: 1,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  backgroundColor: theme.style.colorSix,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 8,
                  marginHorizontal: 4,
                }}>
                <MyText
                  style={{
                    fontWeight: '500',
                    fontSize: 16,
                  }}
                  text={item.unit}
                />
              </View>
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
