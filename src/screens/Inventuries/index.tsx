import { View, Text, Button, PermissionsAndroid } from 'react-native';

import XLSX from 'xlsx';
import fs from 'react-native-fs';
import uuid from 'react-native-uuid';
import Share from 'react-native-share';

import { store } from 'store/index';

const Inventories = () => {
  const generateShareableExcel = async (): Promise<string> => {
    let state = store.getState();

    let sample_data_to_export = state.itemsReducer;

    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(sample_data_to_export);
    XLSX.utils.book_append_sheet(wb, ws, 'Users');
    const wbout = XLSX.write(wb, { type: 'binary', bookType: 'xlsx' });

    let uri = fs.CachesDirectoryPath + `/${uuid.v4()}.xlsx`;

    return new Promise<string>((resolve, reject) => {
      // Write generated excel to Storage
      fs.writeFile(uri, wbout, 'ascii')
        .then(r => {
          console.log(`[*] Succes, saved file at ${uri}`);

          fs.readDir(fs.CachesDirectoryPath).then(result => {
            console.log(result);
          });

          resolve(uri);
        })
        .catch(e => {
          console.log('Error', e);
          reject(`Error ${e}`);
        });
    });
  };

  const shareFile = async (url: string) => {
    try {
      console.log(url);
      const result = await Share.open({ url, message: url });
      // .share(
      //   { url, title: url },
      //   {
      //     dialogTitle: url,
      //     // url:,
      //     // message: 'see the photo' + JSON.stringify(PhotoLink),
      //   },
      // );
      // if (result.action === Share.sharedAction) {
      //   if (result.activityType) {
      //     // shared with activity type of result.activityType
      //   } else {
      //     // shared
      //   }
      // } else if (result.action === Share.dismissedAction) {
      //   // dismissed
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const onShare = async () => {
    try {
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

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Permission Granted (calling our exportDataToExcel function)
          const shareableExcelUri: string = await generateShareableExcel();

          console.log('Permission granted');

          shareFile(`file://${shareableExcelUri}`);
        } else {
          // Permission denied
          console.log('Permission denied');
        }
      } else {
        const shareableExcelUri: string = await generateShareableExcel();
        shareFile(`file://${shareableExcelUri}`);
      }

      //   const result = await Share.share(shareableExcelUri, {
      //     message:
      //       'React Native | A framework for building native apps using React',
      //   });
      // if (result.action === Share.sharedAction) {
      //   if (result.activityType) {
      //     // shared with activity type of result.activityType
      //   } else {
      //     // shared
      //   }
      // } else if (result.action === Share.dismissedAction) {
      //   // dismissed
      // }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ width: '100%', height: 100, backgroundColor: '#fff' }}>
      <Text>Test</Text>
      <View style={{ marginTop: 50 }}>
        <Button onPress={onShare} title="Share" />
      </View>
    </View>
  );
};

export default Inventories;
