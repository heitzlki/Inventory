import { View, ViewProps, StyleSheet } from 'react-native';

import { useRef, useState, useEffect } from 'react';
import { Pressable, TextInput, BackHandler } from 'react-native';

import { useSelector, useDispatch, useStore } from 'react-redux';
import { RootState } from 'store/index';

import { inventoryDelete, inventoryEdit } from 'store/inventories';

import BottomSheet, { BottomSheetRefProps } from 'components/BottomSheet';

import MyPressableIcon from 'components/custom/MyPressableIcon';

interface Props extends ViewProps {
  children?: React.ReactNode;
  inventoryId: string;
  bottomSheetRef: React.RefObject<BottomSheetRefProps>;
  editNameRef: React.RefObject<TextInput>;
}

const MyBottomSheet = ({
  children,
  inventoryId,
  bottomSheetRef,
  editNameRef,
  style,
  ...props
}: Props) => {
  const theme = useSelector((state: RootState) => state.themeReducer);
  const combinedStyles = StyleSheet.flatten([
    { flex: 1, backgroundColor: theme.style.colorTwo },
    style,
  ]);
  const inventories = useSelector(
    (state: RootState) => state.invetoriesReducer,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (bottomSheetRef.current?.isActive()) {
          bottomSheetRef.current?.activate();
          return true;
        } else {
          return false;
        }
      },
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      backgroundTapAction={() => editNameRef.current?.blur()}>
      <View
        style={{
          height: 42,
          width: '95%',
          backgroundColor: theme.style.colorFour,
          marginVertical: 4,
          borderRadius: 8,

          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',

          alignSelf: 'center',
        }}>
        <TextInput
          ref={editNameRef}
          style={{
            marginLeft: 4,
            color: theme.style.text,
            fontWeight: '500',
            fontSize: 16,
            flex: 1,
          }}
          value={inventories[inventoryId]?.name || ''}
          onChangeText={text => {
            dispatch(
              inventoryEdit({
                inventoryId,
                name: text,
              }),
            );
          }}
          onSubmitEditing={() => {
            bottomSheetRef.current?.activate();
          }}
        />
      </View>

      <MyPressableIcon
        style={{
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',

          borderRadius: 8,

          height: 42,
          width: '95%',
          backgroundColor: theme.style.colorFour,
        }}
        onPress={() => {
          dispatch(inventoryDelete({ inventoryId }));
          editNameRef.current?.blur();
          bottomSheetRef.current?.activate();
        }}
        set="MaterialCommunityIcons"
        name="trash-can-outline"
        size={25}
      />

      {children}
    </BottomSheet>
  );
};
export default MyBottomSheet;
