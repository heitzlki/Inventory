import { useSelector } from 'react-redux';
import { RootState } from 'store/index';

import { useCreateXlsxSheet } from 'hooks/useFormatCreateShareXlsx/useCreateXlsxSheet';
import { useShareFile } from 'hooks/useFormatCreateShareXlsx/useShareFile';
import { useFormatXlsx } from 'hooks/useFormatCreateShareXlsx/useFormatXlsx';
import { ItemsState } from 'store/inventories/state';

export function useFormatCreateAndShareXlsx(inventoryId: string) {
  const inventories = useSelector(
    (state: RootState) => state.invetoriesReducer,
  );

  const name: string = inventories[inventoryId].name;

  const items: ItemsState | {} = inventories[inventoryId]?.items || {};

  const { formattedData, formatData } = useFormatXlsx(items);

  const {
    createSheet,
    filePath,
    loading: creating,
    error: createError,
  } = useCreateXlsxSheet(name, formattedData);

  const {
    shareFile,
    loading: sharing,
    error: shareError,
  } = useShareFile(filePath);

  async function formatCreateAndShare() {
    await formatData();
    await createSheet();
    await shareFile();
  }

  return { formatCreateAndShare, creating, createError, sharing, shareError };
}
