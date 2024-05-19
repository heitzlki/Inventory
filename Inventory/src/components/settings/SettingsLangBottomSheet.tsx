import { View, ViewProps } from 'react-native';

import { useEffect } from 'react';
import { TextInput, BackHandler, Pressable, FlatList } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/index';

import { useStyles } from 'hooks/useStyles';
import { inventoryDelete, inventoryEdit } from 'store/inventories';

import BottomSheet, { BottomSheetRefProps } from 'components/BottomSheet';

import MyPressableIcon from 'components/custom/MyPressableIcon';
import { validCategories } from 'store/catalog/state';

import {
  MyBackground,
  MyTopBar,
  MyButton,
  MyText,
  MyCategoryLabel,
} from 'components/custom';
import { EditLangState } from 'screens/settings/SettingsScreen';

interface Props extends ViewProps {
  children?: React.ReactNode;
  bottomSheetRef: React.RefObject<BottomSheetRefProps>;
  editLang: EditProductState;
  setEditLang: React.Dispatch<React.SetStateAction<EditProductState>>;
}

const SettingsLangBottomSheet = ({
  children,
  bottomSheetRef,
  editProduct,
  setEditProduct,
}: Props) => {
  const { styles } = useStyles();

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
      // backgroundTapAction={() => editNameRef.current?.blur()}
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
          flex: 1,
          alignItems: 'center',
        }}>
        <View
          style={{
            // height: 42,
            width: '95%',
            backgroundColor: styles.colors.paletteFour,
            // marginVertical: 4,
            borderRadius: 8,

            flexDirection: 'row',
            // alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
          }}>
          <MyText
            style={{
              fontWeight: '500',
              fontSize: 16,
              flex: 1,
              marginLeft: 8,
            }}
            text="Categories:"
          />

          <View style={{}}>
            <FlatList
              data={validCategories}
              renderItem={({ item }) => (
                <Pressable
                  key={item}
                  style={{
                    marginVertical: 3,
                  }}
                  onPress={() => {
                    setEditProduct({
                      ...editProduct,
                      category: item,
                    });

                    bottomSheetRef.current?.activate();
                  }}>
                  <MyCategoryLabel
                    category={item}
                    style={{
                      borderWidth: editProduct.category == item ? 4 : 2,
                      borderColor:
                        editProduct.category == item
                          ? styles.colors.paletteTextMain
                          : styles.colors.paletteCategory[item].secondary,
                    }}
                  />
                </Pressable>
              )}
            />
          </View>
        </View>
      </View>

      {children}
    </BottomSheet>
  );
};
export default SettingsLangBottomSheet;
