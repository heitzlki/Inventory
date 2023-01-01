import { useState } from 'react';

import { ItemsState } from 'store/inventories/state';

const sheetStructure = [
  ['id', 'productId', 'createdAt', 'updatedAt', 'name', 'amount'],
];

export function useFormatXlsx(items: ItemsState) {
  const [formattedData, setFormattedData] =
    useState<Array<Array<string>>>(sheetStructure);

  function formatData() {
    if (Object.keys(items).length > 0) {
      const dataArray = [
        ...sheetStructure,
        ...Object.keys(items).map((key: string): string[] =>
          Object.values(items[key]),
        ),
      ];

      setFormattedData(dataArray);
    }
  }

  return { formattedData, formatData };
}
