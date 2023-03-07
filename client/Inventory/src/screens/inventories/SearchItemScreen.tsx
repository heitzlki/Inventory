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

import useSearch from 'hooks/useSearch';

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

import MyTopBar from 'components/custom/MyTopBar';
import MyAddButton from 'components/custom/MyAddButton';
import MyPressableIcon from 'components/custom/MyPressableIcon';
import MyIcon from 'components/custom/MyIcon';
import MyText from 'components/custom/MyText';

const SearchItemScreen = ({
  route,
  navigation,
}: RootStackScreenProps<'SearchItem'>) => {
  const theme = useSelector((state: RootState) => state.themeReducer);
  const { inventoryId } = route.params;

  const store = useStore<RootState>();

  const dispatch = useDispatch();

  const [searchResults, handleSearchChange, searchQuery, setSearchQuery] =
    useSearch();
  const inputRef = useRef<TextInput>(null);

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }, [inputRef]),
  );

  const [topBarHeight, setTopBarHeight] = useState<number>();

  return (
    <MyBackground>
      <MyTopBar backButton={true} title="" style={{ height: topBarHeight }}>
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
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: theme.style.colorSix,
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
                color: theme.style.text,
                fontWeight: '500',
                fontSize: 16,
                flex: 1,
              }}
              ref={inputRef}
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
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              marginRight: 20,
              marginVertical: 4,
            }}>
            {[
              'Aktionsprodukte',
              'Frisch- und TK-Ware (1)',
              'Frisch- und TK-Ware (2)',
              'Getränke',
              'Soßen, Dips und Dressings',
              'Desserts (TK)',
              'Dosen- und Trockenware',
              'Verpackungen',
            ].map((item, index) => (
              <View
                key={index}
                style={{
                  paddingHorizontal: 8,
                  margin: 2,
                  borderRadius: 5,
                  backgroundColor: '#00ffcca7',
                }}>
                <MyText text={item} />
              </View>
            ))}
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
                  amountType: item.amountType,
                  category: item.category,
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
                  item.defaultAmountOne == '0' ? '' : item.defaultAmountOne,
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
                {item.defaultAmountOne}
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
