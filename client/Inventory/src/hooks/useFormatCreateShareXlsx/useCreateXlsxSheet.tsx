import { useState } from 'react';

import XLSX from 'xlsx';
import RNFS from 'react-native-fs';
import moment from 'moment';

export function useCreateXlsxSheet(name: string, data: string[][]) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filePath, setFilePath] = useState('');

  async function createSheet() {
    setLoading(true);
    setError(null);
    setFilePath('');

    try {
      // Create the xlsx sheet
      const fileName = `${name}_${moment().unix().toString()}.xlsx`;
      const filePathStr = `${RNFS.DocumentDirectoryPath}/${fileName}`;

      const ws = XLSX.utils.aoa_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      const wbout = XLSX.write(wb, { type: 'binary', bookType: 'xlsx' });
      await RNFS.writeFile(filePathStr, wbout, 'ascii')
        .then(() => {
          setFilePath(filePathStr);
        })
        .catch(err => {
          console.log(err.message);
        });
    } catch (e: any) {
      setError(e);
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { createSheet, filePath, loading, error };
}
