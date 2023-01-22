import { PermissionsAndroid } from 'react-native';

import Share from 'react-native-share';
import XLSX from 'xlsx';
import RNFS from 'react-native-fs';
import moment from 'moment';

import { useSelector } from 'react-redux';
import { RootState } from 'store/index';

import { ItemsState } from 'store/inventories/state';

const sheetStructure = [['name', 'amount']];

export function useFormatCreateAndShareXlsx(inventoryId: string) {
  const inventories = useSelector(
    (state: RootState) => state.invetoriesReducer,
  );

  const name: string = inventories[inventoryId].name;

  const items: ItemsState | {} = inventories[inventoryId]?.items || {};

  const formatData = (): string[][] => {
    if (Object.keys(items).length > 0) {
      return [
        ...sheetStructure,
        ...Object.values(items).map(item => [item.name, item.amount]),
      ];
    } else {
      return sheetStructure;
    }
  };

  const createSheet = async (data: string[][]): Promise<string> => {
    try {
      const fileName = `${name}_${moment()
        .format('YYYY_MM_DD_HH_mm')
        .toString()}.xlsx`;

      console.log(fileName);
      const filePathStr = `${RNFS.CachesDirectoryPath}/${fileName}`;

      const ws = XLSX.utils.aoa_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      const wbout = XLSX.write(wb, { type: 'binary', bookType: 'xlsx' });
      await RNFS.writeFile(filePathStr, wbout, 'ascii');

      return filePathStr;
    } catch (e: any) {
      return '';
    }
  };

  const grantPermission = async () => {
    let isPermitedExternalStorage = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );

    if (!isPermitedExternalStorage) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage permission needed',
          message: 'Test Message',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        throw new Error('Permission not granted!');
      }
    }
  };

  const shareFile = async (filePath: string) => {
    try {
      await grantPermission();

      await Share.open({
        url: `file://${filePath}`,
      });
    } catch (error) {}
  };

  async function formatCreateAndShare() {
    const data = formatData();
    const path = await createSheet(data);
    await shareFile(path);
  }

  return formatCreateAndShare;
}
