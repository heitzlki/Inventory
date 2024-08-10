import { Buffer } from 'buffer';
import moment from 'moment';
import { PermissionsAndroid } from 'react-native';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import XLSX from 'xlsx';

import { useLang } from 'hooks/useLang';

import { useSelector } from 'react-redux';
import { RootState } from 'store/index';

import { ItemsState } from 'store/inventories/state';
import { CatalogState } from 'store/catalog/state';

const sheetStructure = [
  ['Art.-Nr.', 'Artikel', 'Kühlung', 'TK/Trockenlager', 'Gesamt'],
];

function useInventoryData(inventoryId: string) {
  const inventories = useSelector(
    (state: RootState) => state.invetoriesReducer,
  );
  const catalog = useSelector((state: RootState) => state.catalogReducer);

  const name: string = inventories[inventoryId].name;
  const items: ItemsState | {} = inventories[inventoryId]?.items || {};

  return { name, items, catalog };
}

function useFormattedData(items: ItemsState | {}, catalog: CatalogState) {
  const { translations } = useLang();

  const sheetStructure = [
    [
      translations.id,
      translations.product,
      translations.amount,
      translations.unit,
      translations.category,
    ],
  ];

  return (): string[][] => {
    if (Object.keys(items).length > 0) {
      return [
        ...sheetStructure,
        ...Object.values(items).map(item => [
          item.productId,
          item.name,
          item.amount,
          catalog[item.productId].unit,
          catalog[item.productId].category,
        ]),
      ];
    } else {
      return sheetStructure;
    }
  };
}

function useCreateSheet() {
  return async (data: string[][], name: string): Promise<string> => {
    try {
      const worksheet = XLSX.utils.aoa_to_sheet(data);

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'name');

      const fileName = `${name}.xlsx`;
      //DownloadDirectoryPath
      const filePathStr = `${RNFS.CachesDirectoryPath}/${fileName}`;
      const wbout = XLSX.write(workbook, {
        type: 'buffer',
        bookType: 'xlsx',
      });

      await RNFS.writeFile(
        filePathStr,
        Buffer.from(wbout).toString('base64'),
        'base64',
      );

      return filePathStr;
    } catch (e: any) {
      console.error(e);
      return '';
    }
  };
}

function useGrantPermission() {
  return async () => {
    let isPermitedExternalStorage = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );

    if (!isPermitedExternalStorage) {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage permission needed',
          message: 'Test Message',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
    }
  };
}

function useShareFile() {
  return async (filePath: string) => {
    try {
      await useGrantPermission()();

      await Share.open({
        url: `file://${filePath}`,
        saveToFiles: true,
      });
    } catch (error) {}
  };
}

export function useFormatCreateAndShareXlsx(inventoryId: string) {
  const { name, items, catalog } = useInventoryData(inventoryId);
  const formatData = useFormattedData(items, catalog);
  const createSheet = useCreateSheet();
  const shareFile = useShareFile();

  async function formatCreateAndShare() {
    const data = formatData();
    const path = await createSheet(data, name);
    await shareFile(path);
  }

  return formatCreateAndShare;
}
