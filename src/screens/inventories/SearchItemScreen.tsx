import { useState } from 'react';
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  FlatList,
  Modal,
} from 'react-native';

import { itemAdd } from 'store/inventories';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/index';

import type { RootStackScreenProps } from 'navigation/types';

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const SearchItemScreen = ({
  route,
  navigation,
}: RootStackScreenProps<'SearchItem'>) => {
  const inventories = useSelector(
    (state: RootState) => state.inveturiesReducer,
  );

  const dispatch = useDispatch();

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
          <Text
            style={{
              color: '#DCDDDE',
              fontWeight: '500',
              fontSize: 16,
              left: 4,
            }}>
            aaa
          </Text>
        </View>
      </View>

      <View style={{ flex: 1, paddingTop: 58, justifyContent: 'center' }}>
        <FlatList
          contentContainerStyle={{
            alignItems: 'center',
            paddingBottom: 80, // Bottom space for add button
          }}
          data={['A', 'B', 'C']}
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
                // flexDirection: 'row',
                // justifyContent: 'space-between',
                // alignItems: 'center',
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => {
                dispatch(itemAdd({ inventoryyId: route.params.inventoryyId }));
                navigation.goBack();
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
                  item
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
