import { useCallback, useRef } from 'react';
import { FlatList, Pressable, TextInput, View } from 'react-native';

import useSearch from 'hooks/useSearch';

import { useFocusEffect } from '@react-navigation/native';

import useSortedCategories from 'hooks/useSortedCategories';

import { useDispatch, useStore } from 'react-redux';
import { RootState } from 'store/index';
import { inventoryItemAdd } from 'store/inventories';

import { useStyles } from 'hooks/useStyles';
import type { RootStackScreenProps } from 'navigation/types';

import {
  MyBackground,
  MyCategoryLabel,
  MyIcon,
  MyPressableIcon,
  MyText,
  MyTopBar,
} from 'components/custom';

const SearchItemScreen = ({
  route,
  navigation,
}: RootStackScreenProps<'SearchItem'>) => {
  const { styles } = useStyles();
  const { inventoryId } = route.params;

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

  const inputRef = useRef<TextInput>(null);

  const sortedCategories = useSortedCategories(searchCategories);

  // focus input on
  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }, [inputRef]),
  );

  return (
    <MyBackground>
      <MyTopBar
        backButton={true}
        title=""
        style={{ borderBottomRightRadius: 0, paddingVertical: 24 }}>
        <View
          style={{
            flexDirection: 'column',
            position: 'relative',
            width: '100%',
            paddingHorizontal: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: styles.colors.paletteSix,
              paddingHorizontal: 8,
              marginRight: 20,
              flex: 1,
              borderRadius: 15,
              maxHeight: 42,
              minHeight: 42,
            }}>
            <MyIcon set="MaterialIcons" name="search" size={26} />
            <TextInput
              style={{
                color: styles.colors.paletteTextMain,
                fontWeight: '500',
                fontSize: 16,
                flex: 1,
              }}
              ref={inputRef}
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
            }}>
            <FlatList
              horizontal
              contentContainerStyle={{
                alignItems: 'center',
                marginVertical: 8,
                paddingRight: 20,
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
          paddingBottom: 80, // Bottom space for add button
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
                amountPrediction:
                  item.defaultAmount == '0' ? '' : item.defaultAmount,
              });
            }}>
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
                  borderColor: styles.colors.paletteTextMain,
                  borderWidth: 2,
                }}>
                <MyText
                  style={{
                    fontWeight: '500',
                    fontSize: 16,
                  }}
                  text={item.defaultAmount}
                />
              </View>

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
        ListFooterComponent={
          <MyText
            style={{
              fontWeight: '500',
              fontSize: 16,
              marginVertical: 10,
            }}
            onPress={() => navigation.navigate('Catalog')}
            text={'Create New'}
          />
        }
      />
    </MyBackground>
  );
};

export default SearchItemScreen;
