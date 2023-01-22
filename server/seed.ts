import { v4 as uuid } from 'uuid';
import { CatalogState } from './types';
import moment from 'moment';

// Run ts-node seed.ts "Käse" "Tomatensoße" "Basilikum" "Oregano" "Olivenöl" "Mehl" "Hefe" "Wasser" "Salz"

export function createCatalog() {
  let products = process.argv.slice(2);
  products = products.length === 0 ? ['Apple', 'Banana', 'Orange'] : products;
  const catalog: CatalogState = {};

  products.forEach((product) => {
    const id = uuid();
    catalog[id] = {
      id: id,
      createdAt: moment().unix().toString(),
      updatedAt: moment().unix().toString(),
      name: product,
      defaultAmount: '0',
      unit: 'kg',
    };
  });
  console.dir(catalog);
  console.log(JSON.stringify(catalog));
}

createCatalog();
