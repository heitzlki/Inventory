import React from 'react';
import { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  FlatList,
  TextInput,
  BackHandler,
} from 'react-native';

import { useSelector, useDispatch, useStore } from 'react-redux';
import { RootState } from 'store/index';
import { activate } from 'store/drawer';

import {
  inventoryAdd,
  inventoryDelete,
  inventoryEdit,
} from 'store/inventories';

import type { RootStackScreenProps } from 'navigation/types';

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import BottomSheet, { BottomSheetRefProps } from 'components/BottomSheet';

import MyBackground from 'components/custom/MyBackground';
import MyTopBar from 'components/custom/MyTopBar';
import MyPressableIcon from 'components/custom/MyPressableIcon';
import MyAddButton from 'components/custom/MyAddButton';
import MyBottomSheet from 'components/custom/MyBottomSheet';
import MyIcon from 'components/custom/MyIcon';
import MyText from 'components/custom/MyText';
import { useNavigation } from '@react-navigation/native';

const InventoryList = ({
  bottomSheetRef,
  setBottomSheetInventoryId,
}: {
  bottomSheetRef: React.RefObject<BottomSheetRefProps>;
  setBottomSheetInventoryId: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const theme = useSelector((state: RootState) => state.themeReducer);

  const inventories = useSelector(
    (state: RootState) => state.invetoriesReducer,
  );

  const navigation = useNavigation();

  console.log(theme.style.text);

  return (
    <FlatList
      contentContainerStyle={{
        alignItems: 'center',
        paddingBottom: 80,
      }}
      data={Object.keys(inventories)}
      renderItem={({ item }) => (
        <Pressable
          key={item}
          style={{
            height: 50,
            maxWidth: '95%',
            minWidth: '95%',
            backgroundColor: theme.style.colorFour,
            marginVertical: 4,
            borderRadius: 8,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() =>
            navigation.navigate('Inventory', {
              inventoryId: inventories[item].id,
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
              name="archive"
              size={24}
              color={theme.style.colorBlue}
            />

            <MyText
              style={{ fontWeight: '500', fontSize: 16, marginLeft: 4 }}
              text={inventories[item].name}
            />
          </View>
          <View style={{ position: 'absolute', right: 0 }}>
            <MyPressableIcon
              onPress={() => {
                bottomSheetRef.current?.activate();

                setBottomSheetInventoryId(item);
              }}
              set="MaterialCommunityIcons"
              name="dots-vertical"
              size={28}
            />
          </View>
        </Pressable>
      )}
    />
  );
};

export default InventoryList;
