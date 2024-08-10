import uuid from 'react-native-uuid';
import moment from 'moment';

import { useLang } from 'hooks/useLang';
import { ProductState } from 'store/catalog/state';

import { useDispatch, useStore } from 'react-redux';
import { RootState } from 'store/index';

export const useGenData = () => {
  const { translations } = useLang();
  const store = useStore<RootState>();

  const generateNewCatalogProduct = () => {
    const newProduct: ProductState = {
      id: uuid.v4().toString().split('-')[0],
      createdAt: moment().unix().toString(),
      updatedAt: moment().unix().toString(),
      name: `${translations.newProduct} ${
        Object.keys(store.getState().catalogReducer).length + 1
      }`,
      defaultAmount: '0',
      unit: 'kg',
      category: 'One',
    };
    return newProduct;
  };

  return {
    generateNewCatalogProduct,
  };
};
