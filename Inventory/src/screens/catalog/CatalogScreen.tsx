import { useState } from 'react';
import { FlatList, Pressable, TextInput, View } from 'react-native';

import { useDispatch, useStore } from 'react-redux';
import { RootState } from 'store/index';

import { useStyles } from 'hooks/useStyles';
import { catalogProductAdd } from 'store/catalog';

import type { RootStackScreenProps } from 'navigation/types';

import {
  MyAddButton,
  MyBackground,
  MyIcon,
  MyPressableIcon,
  MyTopBar,
} from 'components/custom';

import { MyCategoryLabel, MyText } from 'components/custom';

import useSearch from 'hooks/useSearch';
import useSortedCategories from 'hooks/useSortedCategories';

const CatalogScreen = ({
  route,
  navigation,
}: RootStackScreenProps<'Catalog'>) => {
  const { styles } = useStyles();

  const store = useStore<RootState>();

  const dispatch = useDispatch();

  const [
    searchResults,
    handleSearchChange,
    searchQuery,
    setSearchQuery,
    searchCategories,
    setSearchCategories,
  ] = useSearch();

  const sortedCategories = useSortedCategories(searchCategories);

  const [topBarHeight, setTopBarHeight] = useState<number>();

  return (
    <MyBackground>
      <MyTopBar
        backButton={true}
        title=""
        style={{ height: topBarHeight, borderBottomRightRadius: 0 }}>
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
              backgroundColor: styles.colors.paletteSix,
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
                color: styles.colors.paletteTextMain,
                fontWeight: '500',
                fontSize: 16,
                flex: 1,
              }}
              placeholderTextColor={styles.colors.paletteTextLight}
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
                        ? styles.colors.paletteTextMain
                        : styles.colors.paletteCategory[item].secondary,
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
              backgroundColor: styles.colors.paletteFour,
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
                  backgroundColor: styles.colors.paletteSix,
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
                    backgroundColor: styles.colors.paletteSix,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 8,
                    marginHorizontal: 4,
                    borderColor: styles.colors.palettePrimarColdStorage,
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
                  backgroundColor: styles.colors.paletteSix,
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
