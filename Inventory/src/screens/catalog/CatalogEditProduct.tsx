import { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Pressable,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

import type { RootStackScreenProps } from 'navigation/types';

import { useDispatch, useSelector } from 'react-redux';
import { catalogProductDelete, catalogProductEdit } from 'store/catalog';
import { RootState } from 'store/index';

import { useStyles } from 'hooks/useStyles';

import { BottomSheetRefProps } from 'components/BottomSheet';
import {
  AmountType,
  CategoryType,
  ProductState,
  UnitType,
} from 'store/catalog/state';

import ProductCategoryBottomSheet from 'components/catalog/ProductCategoryBottomSheet';
import {
  MyBackground,
  MyButton,
  MyCategoryLabel,
  MyText,
  MyTopBar,
} from 'components/custom';
import { validAmounts, validCategories, validUnits } from 'store/catalog/state';

interface CatalogEditProductTextInputProps extends TextInputProps {
  name?: string;
}

export interface EditProductState {
  newProductId: string;
  name: string;
  unit: UnitType;
  amountType: AmountType;
  defaultAmountOne: string;
  defaultAmountTwo: string;
  category: CategoryType;
}

const CatalogEditProductTextInput = ({
  name = '',
  value,
  onChange,
  ...props
}: CatalogEditProductTextInputProps) => {
  const { styles } = useStyles();
  return (
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
      }}>
      {name ? (
        <MyText
          style={{
            marginLeft: 8,
            color: styles.colors.paletteTextMain,
            fontWeight: '500',
            fontSize: 16,
          }}
          text={name}
        />
      ) : null}
      <TextInput
        style={{
          marginLeft: 4,
          color: styles.colors.paletteTextMain,
          fontWeight: '500',
          fontSize: 16,
          flex: 1,
        }}
        value={value}
        onChange={onChange}
        {...props}
      />
    </View>
  );
};

const CatalogEditProductScreen = ({
  route,
  navigation,
}: RootStackScreenProps<'CatalogEditProduct'>) => {
  const { productId } = route.params;

  const dispatch = useDispatch();

  const catalog = useSelector((state: RootState) => state.catalogReducer);

  const { styles } = useStyles();
  const product: ProductState = catalog[productId];

  const [editProduct, setEditProduct] = useState<EditProductState>({
    newProductId: product.id,
    name: product.name,
    unit: product.unit,
    amountType: product.amountType,
    defaultAmountOne: product.defaultAmountOne,
    defaultAmountTwo: product.defaultAmountTwo,
    category: product.category,
  });

  const [valid, setValid] = useState(true);

  const validateEditProduct = (): boolean => {
    const {
      newProductId,
      name,
      unit,
      amountType,
      defaultAmountOne,
      defaultAmountTwo,
      category,
    } = editProduct;

    if (
      typeof newProductId !== 'string' ||
      newProductId.trim() === '' ||
      typeof name !== 'string' ||
      name.trim() === '' ||
      !validUnits.includes(unit) ||
      !validAmounts.includes(amountType) ||
      typeof defaultAmountOne !== 'string' ||
      defaultAmountOne.trim() === '' ||
      isNaN(Number(defaultAmountOne)) ||
      typeof defaultAmountTwo !== 'string' ||
      defaultAmountTwo.trim() === '' ||
      isNaN(Number(defaultAmountTwo)) ||
      !validCategories.includes(category)
    ) {
      return false;
    }

    return true;
  };

  useEffect(() => {
    if (validateEditProduct()) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [editProduct]);

  const bottomSheetRef = useRef<BottomSheetRefProps>(null);

  return (
    <MyBackground>
      <MyTopBar backButton={true} title="Settings" />
      <View style={{ alignItems: 'center' }}>
        <CatalogEditProductTextInput
          name="ID:"
          value={editProduct.newProductId}
          onChangeText={text => {
            setEditProduct({ ...editProduct, newProductId: text });
          }}
        />
        <CatalogEditProductTextInput
          name="Name:"
          value={editProduct.name}
          onChangeText={text => {
            setEditProduct({ ...editProduct, name: text });
          }}
        />
        <CatalogEditProductTextInput
          name="Amount One:"
          value={editProduct.defaultAmountOne}
          onChangeText={text => {
            setEditProduct({ ...editProduct, defaultAmountOne: text });
          }}
        />
        {editProduct.amountType === 'double' ? (
          <CatalogEditProductTextInput
            name="Amount Two:"
            value={editProduct.defaultAmountTwo}
            onChangeText={text => {
              setEditProduct({ ...editProduct, defaultAmountTwo: text });
            }}
          />
        ) : null}
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
          }}>
          <MyText
            style={{
              fontWeight: '500',
              fontSize: 16,
              flex: 1,
              marginLeft: 8,
            }}
            text="Unit:"
          />

          <View
            style={{
              maxWidth: 200,
            }}>
            <FlatList
              horizontal
              data={validUnits}
              renderItem={({ item }) => (
                <Pressable
                  key={item}
                  style={{
                    flex: 1,
                    margin: 5,
                    backgroundColor: styles.colors.paletteSix,

                    paddingHorizontal: 10,

                    borderRadius: 8,
                    borderColor: styles.colors.paletteTextMain,
                    borderWidth: editProduct.unit == item ? 2 : 0,

                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    setEditProduct({ ...editProduct, unit: item });
                  }}>
                  <MyText
                    text={item}
                    style={{
                      fontWeight: '500',
                      fontSize: 16,
                      textAlign: 'center',
                      color:
                        editProduct.unit == item
                          ? styles.colors.paletteTextMain
                          : styles.colors.paletteTextLight,
                    }}
                  />
                </Pressable>
              )}
            />
          </View>
        </View>
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
          }}>
          <MyText
            style={{
              fontWeight: '500',
              fontSize: 16,
              flex: 1,
              marginLeft: 8,
            }}
            text="Amount Type:"
          />
          <View
            style={{
              maxWidth: 200,
            }}>
            <FlatList
              horizontal
              data={validAmounts}
              renderItem={({ item }) => (
                <Pressable
                  key={item}
                  style={{
                    flex: 1,
                    margin: 5,
                    backgroundColor: styles.colors.paletteSix,

                    paddingHorizontal: 10,

                    borderRadius: 8,
                    borderColor: styles.colors.paletteTextMain,
                    borderWidth: editProduct.amountType == item ? 2 : 0,

                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    setEditProduct({
                      ...editProduct,
                      amountType: item,
                      defaultAmountTwo: '0',
                    });
                  }}>
                  <MyText
                    text={item}
                    style={{
                      fontWeight: '500',
                      fontSize: 16,
                      textAlign: 'center',
                      color:
                        editProduct.amountType == item
                          ? styles.colors.paletteTextMain
                          : styles.colors.paletteTextLight,
                    }}
                  />
                </Pressable>
              )}
            />
          </View>
        </View>

        <MyButton
          onPress={() => {
            bottomSheetRef.current?.activate();
          }}
          style={{
            marginVertical: 4,
            backgroundColor: styles.colors.paletteFour,
          }}>
          <MyText
            style={{
              fontWeight: '500',
              fontSize: 16,
              flex: 1,
              marginLeft: 8,
            }}
            text="Category:"
          />
          <MyCategoryLabel
            category={editProduct.category}
            style={{ margin: 5 }}
          />
        </MyButton>
        <MyButton
          onPress={() => {
            if (valid) {
              dispatch(catalogProductEdit({ productId, ...editProduct }));
              navigation.goBack();
            }
          }}
          style={{
            marginVertical: 4,
            justifyContent: 'center',
            backgroundColor: styles.colors.paletteSix,
          }}>
          <MyText
            style={{
              color: valid
                ? styles.colors.palettePrimaryGreen
                : styles.colors.paletteTextLight,
              fontWeight: '500',
              fontSize: 18,
            }}
            text="Save"
          />
        </MyButton>
        <MyButton
          onPress={() => {
            dispatch(catalogProductDelete({ productId: product.id }));
            navigation.goBack();
          }}
          style={{
            marginVertical: 4,
            justifyContent: 'center',
            backgroundColor: styles.colors.paletteSix,
          }}>
          <MyText
            style={{
              color: styles.colors.palettePrimaryRed,
              fontWeight: '500',
              fontSize: 18,
            }}
            text="Delete"
          />
        </MyButton>
      </View>

      <ProductCategoryBottomSheet
        bottomSheetRef={bottomSheetRef}
        editProduct={editProduct}
        setEditProduct={setEditProduct}
      />
    </MyBackground>
  );
};

export default CatalogEditProductScreen;
