import { Buffer } from 'buffer';
import moment from 'moment';
import { PermissionsAndroid } from 'react-native';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import XLSX from 'xlsx';

import { useSelector } from 'react-redux';
import { RootState } from 'store/index';

import { ItemsState } from 'store/inventories/state';

const sheetStructure = [
  ['Art.-Nr.', 'Artikel', 'Kühlung', 'TK/Trockenlager', 'Gesamt'],
];

function useInventoryData(inventoryId: string) {
  const inventories = useSelector(
    (state: RootState) => state.invetoriesReducer,
  );
  const name: string = inventories[inventoryId].name;
  const items: ItemsState | {} = inventories[inventoryId]?.items || {};

  return { name, items };
}

function useFormattedData(items: ItemsState | {}) {
  return (): string[][] => {
    if (Object.keys(items).length > 0) {
      return [
        ...sheetStructure,
        ...Object.values(items).map(item => [
          item.productId,
          item.name,
          item.amountOne,
          item.amountTwo,
          eval(`${item.amountOne} + ${item.amountTwo}`),
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
      const templateBinaryContent = await RNFS.readFileAssets(
        '004_Inventurliste_V_2.4.xlsx',
        'base64',
      );

      const templateBuffer = Buffer.from(templateBinaryContent, 'base64');

      const templateWorkbook = XLSX.read(templateBuffer, { type: 'buffer' });

      const sheetName = templateWorkbook.SheetNames[0];
      const sheet = templateWorkbook.Sheets[sheetName];

      for (const rowData of data.slice(1)) {
        const artNr = rowData[0];
        const range = XLSX.utils.decode_range(sheet['!ref']!);

        for (let row = range.s.r + 1; row <= range.e.r; row++) {
          const cellAddress = XLSX.utils.encode_cell({ r: row, c: 0 });
          const cellValue = sheet[cellAddress]?.v;

          if (String(cellValue) === artNr) {
            for (let col = 0; col < rowData.length; col++) {
              const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
              sheet[cellAddress] = { t: 's', v: rowData[col] };
            }
          }
        }
      }

      const fileName = `${name}_${moment()
        .format('YYYY_MM_DD_HH_mm')
        .toString()}.xlsx`;
      const filePathStr = `${RNFS.CachesDirectoryPath}/${fileName}`;
      const wbout = XLSX.write(templateWorkbook, {
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
      });
    } catch (error) {}
  };
}

export function useFormatCreateAndShareXlsx(inventoryId: string) {
  const { name, items } = useInventoryData(inventoryId);
  const formatData = useFormattedData(items);
  const createSheet = useCreateSheet();
  const shareFile = useShareFile();

  async function formatCreateAndShare() {
    const data = formatData();
    const path = await createSheet(data, name);
    await shareFile(path);
  }

  return formatCreateAndShare;
}
