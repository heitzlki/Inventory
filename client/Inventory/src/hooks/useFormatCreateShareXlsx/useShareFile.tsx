import { useState } from 'react';
import { PermissionsAndroid } from 'react-native';
import Share from 'react-native-share';

export function useShareFile(filePath: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function grantPermission() {
    let isPermitedExternalStorage = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );

    if (!isPermitedExternalStorage) {
      // Ask for permission
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
  }

  async function shareFile() {
    setLoading(true);
    setError(null);

    try {
      await grantPermission();

      // Share the file
      const options = {
        url: `file://${filePath}`,
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      };

      await Share.open(options);
    } catch (e: any) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }
  return { shareFile, loading, error };
}
