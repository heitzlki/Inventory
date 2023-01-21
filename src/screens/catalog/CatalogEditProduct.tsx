import { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  TextInput,
} from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';

import type { RootStackScreenProps } from 'navigation/types';

import { useSelector, useDispatch } from 'react-redux';
import { catalogProductDelete, catalogProductEdit } from 'store/catalog';
import { RootState } from 'store/index';

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import BottomSheet, { BottomSheetRefProps } from 'components/BottomSheet';
import { ProductState } from 'store/catalog/state';

import MyBackground from 'components/custom/MyBackground';

const CatalogEditProductScreen = ({
  route,
  navigation,
}: RootStackScreenProps<'CatalogEditProduct'>) => {
  const { productId } = route.params;

  const catalog = useSelector((state: RootState) => state.catalogReducer);

  const product: ProductState = catalog[productId];

  const [editProduct, setEditProduct] = useState({
    name: product.name,
    defaultAmount: product.defaultAmount,
    unit: product.unit,
  });

  const [valid, setValid] = useState(true);

  const dispatch = useDispatch();

  const editProductValid = (): boolean => {
    if (!editProduct.name || editProduct.name.length === 0) {
      return false;
    }

    if (!/^[-+]?\d*\.?\d+$/.test(editProduct.defaultAmount)) {
      return false;
    }

    if (
      editProduct.unit !== 'pcs' &&
      editProduct.unit !== 'g' &&
      editProduct.unit !== 'kg'
    ) {
      return false;
    }

    return true;
  };

  useEffect(() => {
    if (editProductValid()) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [editProduct]);

  return (
    <MyBackground>
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
            Edit Product
          </Text>
        </View>
      </View>
      <View style={{ top: 58, alignItems: 'center' }}>
        <View
          style={{
            height: 42,
            width: '95%',
            backgroundColor: '#2f3136',
            marginVertical: 4,
            borderRadius: 8,

            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TextInput
            style={{
              marginLeft: 4,
              color: '#DCDDDE',
              fontWeight: '500',
              fontSize: 16,
              flex: 1,
            }}
            value={editProduct.name}
            onChangeText={text => {
              setEditProduct({ ...editProduct, name: text });
            }}
          />
        </View>
        <View
          style={{
            height: 42,
            width: '95%',
            backgroundColor: '#2f3136',
            marginVertical: 4,
            borderRadius: 8,

            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TextInput
            style={{
              marginLeft: 4,
              color: '#DCDDDE',
              fontWeight: '500',
              fontSize: 16,
              flex: 1,
            }}
            value={editProduct.defaultAmount}
            onChangeText={text => {
              setEditProduct({ ...editProduct, defaultAmount: text });
            }}
          />
        </View>
        <View
          style={{
            height: 42,
            width: '95%',
            backgroundColor: '#2f3136',
            marginVertical: 4,
            borderRadius: 8,

            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              marginLeft: 8,
              color: '#DCDDDE',
              fontWeight: '500',
              fontSize: 16,
              flex: 1,
            }}>
            Unit:
          </Text>
          <View
            style={{
              position: 'absolute',
              right: 0,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Pressable
              style={{
                flex: 1,
                margin: 5,
                backgroundColor: '#292B2F',

                paddingVertical: 5,
                paddingHorizontal: 10,

                borderRadius: 8,
                borderColor: '#DCDDDE',
                borderWidth: editProduct.unit == 'pcs' ? 2 : 0,

                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                setEditProduct({ ...editProduct, unit: 'pcs' });
              }}>
              <Text
                style={{
                  color: editProduct.unit == 'pcs' ? '#DCDDDE' : '#ABB0B6',
                  fontWeight: '500',
                  fontSize: 16,
                  textAlign: 'center',
                }}>
                pcs
              </Text>
            </Pressable>
            <Pressable
              style={{
                flex: 1,
                margin: 5,
                backgroundColor: '#292B2F',

                paddingVertical: 5,
                paddingHorizontal: 10,

                borderRadius: 8,
                borderColor: '#DCDDDE',
                borderWidth: editProduct.unit == 'g' ? 2 : 0,

                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                setEditProduct({ ...editProduct, unit: 'g' });
              }}>
              <Text
                style={{
                  color: editProduct.unit == 'g' ? '#DCDDDE' : '#ABB0B6',
                  fontWeight: '500',
                  fontSize: 16,
                  textAlign: 'center',
                }}>
                g
              </Text>
            </Pressable>
            <Pressable
              style={{
                flex: 1,
                margin: 5,
                backgroundColor: '#292B2F',

                paddingVertical: 5,
                paddingHorizontal: 10,

                borderRadius: 8,
                borderColor: '#DCDDDE',
                borderWidth: editProduct.unit == 'kg' ? 2 : 0,

                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                setEditProduct({ ...editProduct, unit: 'kg' });
              }}>
              <Text
                style={{
                  color: editProduct.unit == 'kg' ? '#DCDDDE' : '#ABB0B6',
                  fontWeight: '500',
                  fontSize: 16,
                  textAlign: 'center',
                }}>
                kg
              </Text>
            </Pressable>
          </View>
        </View>
        <Pressable
          style={{
            height: 42,
            width: '95%',
            backgroundColor: '#202225',
            marginVertical: 4,
            borderRadius: 8,

            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            if (valid) {
              dispatch(
                catalogProductEdit({
                  productId: product.id,
                  name: editProduct.name,
                  defaultAmount: editProduct.defaultAmount,
                  unit: editProduct.unit,
                }),
              );
              navigation.goBack();
            }
          }}>
          <Text
            style={{
              color: valid ? '#98f5e1' : '#ABB0B6',
              fontWeight: '500',
              fontSize: 18,
            }}>
            Save
          </Text>
        </Pressable>
        <Pressable
          style={{
            height: 42,
            width: '95%',
            backgroundColor: '#202225',
            marginVertical: 4,
            borderRadius: 8,

            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            dispatch(catalogProductDelete({ productId: product.id }));
            navigation.goBack();
          }}>
          <Text
            style={{
              color: '#ff4d6d',
              fontWeight: '500',
              fontSize: 18,
            }}>
            Delete
          </Text>
        </Pressable>
      </View>
    </MyBackground>
  );
};

export default CatalogEditProductScreen;
