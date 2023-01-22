import { useState } from 'react';

import { ItemsState } from 'store/inventories/state';

const sheetStructure = [['name', 'amount']];

export function useFormatXlsx(items: ItemsState) {
  const [formattedData, setFormattedData] =
    useState<Array<Array<string>>>(sheetStructure);

  async function formatData() {
    return new Promise((resolve, reject) => {
      if (Object.keys(items).length > 0) {
        const dataArray = [
          ...sheetStructure,
          ...Object.values(items).map(item => [item.name, item.amount]),
        ];

        setFormattedData(dataArray);
        resolve(true);
      } else {
        setFormattedData(sheetStructure);
        resolve(true);
      }
    });
  }

  return { formattedData, formatData };
}
