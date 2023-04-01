import { View, ViewProps } from 'react-native';

import { useEffect } from 'react';
import { TextInput, BackHandler, Pressable, FlatList } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/index';

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
import { EditProductState } from 'screens/catalog/CatalogEditProduct';

interface Props extends ViewProps {
  children?: React.ReactNode;
  bottomSheetRef: React.RefObject<BottomSheetRefProps>;
  editProduct: EditProductState;
  setEditProduct: React.Dispatch<React.SetStateAction<EditProductState>>;
}

const ProductCategoryBottomSheet = ({
  children,
  bottomSheetRef,
  editProduct,
  setEditProduct,
}: Props) => {
  const theme = useSelector((state: RootState) => state.themeReducer);

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
      // backgroundTapAction={() => editNameRef.current?.blur()}
      snapMaxTranslateY={0.85}
      snapMinTranslateY={0.75}
      activateTranslateY={0.8}>
      <View
        style={{
          width: 75,
          height: 4,
          backgroundColor: theme.style.text,
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
            backgroundColor: theme.style.colorFour,
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
                          ? theme.style.text
                          : theme.style.categoryColors[item].colorTwo,
                    }}
                  />
                </Pressable>
              )}
            />
          </View>
        </View>
      </View>
      {/* <View
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
        }}> */}
      {/* <TextInput
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
      /> */}

      {children}
    </BottomSheet>
  );
};
export default ProductCategoryBottomSheet;
