import { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  TextInput,
  TextInputProps,
  FlatList,
} from 'react-native';

import type { RootStackScreenProps } from 'navigation/types';

import { useSelector, useDispatch } from 'react-redux';
import { catalogProductDelete, catalogProductEdit } from 'store/catalog';
import { RootState } from 'store/index';

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import BottomSheet, { BottomSheetRefProps } from 'components/BottomSheet';
import { ProductState } from 'store/catalog/state';

import {
  MyBackground,
  MyTopBar,
  MyButton,
  MyText,
  MyCategoryLabel,
} from 'components/custom';
import { validUnits, validAmounts, validCategories } from 'store/catalog/state';
import { useGoBack } from 'hooks/useGoBack';

interface CatalogEditProductTextInputProps extends TextInputProps {
  name?: string;
}

const CatalogEditProductTextInput = ({
  name = '',
  value,
  onChange,
  ...props
}: CatalogEditProductTextInputProps) => {
  const theme = useSelector((state: RootState) => state.themeReducer);

  return (
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
      }}>
      {name ? (
        <MyText
          style={{
            marginLeft: 8,
            color: theme.style.text,
            fontWeight: '500',
            fontSize: 16,
          }}
          text={name}
        />
      ) : null}
      <TextInput
        style={{
          marginLeft: 4,
          color: theme.style.text,
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

  const theme = useSelector((state: RootState) => state.themeReducer);

  const product: ProductState = catalog[productId];

  const [editProduct, setEditProduct] = useState({
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
            backgroundColor: theme.style.colorFour,
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
                    backgroundColor: theme.style.colorSix,

                    paddingHorizontal: 10,

                    borderRadius: 8,
                    borderColor: theme.style.text,
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
                          ? theme.style.text
                          : theme.style.textDim,
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
            backgroundColor: theme.style.colorFour,
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
                    backgroundColor: theme.style.colorSix,

                    paddingHorizontal: 10,

                    borderRadius: 8,
                    borderColor: theme.style.text,
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
                          ? theme.style.text
                          : theme.style.textDim,
                    }}
                  />
                </Pressable>
              )}
            />
          </View>
        </View>

        <MyButton
          onPress={() => {}}
          style={{
            marginVertical: 4,
            backgroundColor: theme.style.colorFour,
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
            backgroundColor: theme.style.colorSix,
          }}>
          <MyText
            style={{
              color: valid ? theme.style.colorGreen : theme.style.textDim,
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
            backgroundColor: theme.style.colorSix,
          }}>
          <MyText
            style={{
              color: theme.style.colorRed,
              fontWeight: '500',
              fontSize: 18,
            }}
            text="Delete"
          />
        </MyButton>
      </View>

      {/* 
      // TODO
      <InventoryBottomSheet
        inventoryId={bottomSheetInventoryId}
        bottomSheetRef={bottomSheetRef}
        editNameRef={editNameRef}
      /> */}
    </MyBackground>
  );
};

export default CatalogEditProductScreen;
