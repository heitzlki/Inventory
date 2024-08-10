import { View, ViewProps } from 'react-native';

import { useEffect } from 'react';
import { TextInput, BackHandler } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/index';

import { useStyles } from 'hooks/useStyles';
import { inventoryDelete, inventoryEdit } from 'store/inventories';

import BottomSheet, { BottomSheetRefProps } from 'components/BottomSheet';

import MyPressableIcon from 'components/custom/MyPressableIcon';

interface Props extends ViewProps {
  children?: React.ReactNode;
  inventoryId: string;
  bottomSheetRef: React.RefObject<BottomSheetRefProps>;
  editNameRef: React.RefObject<TextInput>;
}

const InventoryBottomSheet = ({
  children,
  inventoryId,
  bottomSheetRef,
  editNameRef,
}: Props) => {
  const { styles } = useStyles();
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
      backgroundTapAction={() => editNameRef.current?.blur()}
      snapMaxTranslateY={0.85}
      snapMinTranslateY={0.75}
      activateTranslateY={0.8}>
      <View
        style={{
          width: 75,
          height: 4,
          backgroundColor: styles.colors.paletteTextMain,
          alignSelf: 'center',
          marginVertical: 15,
          borderRadius: 2,
        }}
      />
      <View
        style={{
          height: 42,
          width: '95%',
          backgroundColor: styles.colors.paletteFour,
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
            color: styles.colors.paletteTextMain,
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
          backgroundColor: styles.colors.paletteFour,
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
export default InventoryBottomSheet;
