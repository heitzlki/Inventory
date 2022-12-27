import {View, Text, Button, PermissionsAndroid} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import XLSX from 'xlsx';
import fs from 'react-native-fs';
import uuid from 'react-native-uuid';
import Share from 'react-native-share';

import {store} from 'store/index';

import type {RootState} from 'store/index';
import {
  loadItems,
  clearItems,
  setAmount,
  addItem,
  deleteItem,
  changeUnit,
  changeOrder,
  findItemById,
} from 'store/items/index';
import {unit} from 'store/items/state';
import {itemList} from 'screens/inventory';

// import { useNavigation } from '@react-navigation/native';

import type {AppTabParamList, RootStackParamList} from 'navigation/types';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<AppTabParamList, 'Inventoryies'>;

import type {RootStackScreenProps} from 'navigation/types';

const InventoryiesScreen = ({
  route,
  navigation,
}: RootStackScreenProps<'Inventoryies'>) => {
  const generateShareableExcel = async (): Promise<string> => {
    let state = store.getState();

    let sample_data_to_export = state.itemsReducer;

    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(sample_data_to_export);
    XLSX.utils.book_append_sheet(wb, ws, 'Users');
    const wbout = XLSX.write(wb, {type: 'binary', bookType: 'xlsx'});

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
      const result = await Share.open({url, message: url});
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

  const items = useSelector((state: RootState) => state.itemsReducer);
  const dispatch = useDispatch();

  // const navigation = useNavigation();

  const loadNewItems = () => {
    dispatch(clearItems());
    dispatch(
      loadItems({
        items: Array.from({length: 20}, (_, i) => ({
          name: itemList[Math.floor(Math.random() * itemList.length)].name,
          id: uuid.v4().toString(),
          stockId: '',
          createdAt: '',
          updatedAt: '',
          amount: Math.floor(Math.random() * 10),
          unit: unit.kg,
        })),
      }),
    );

    // navigation.navigate('Inventory', { id: 'Tessttsts' }); // TODO Pass inventory ID and then all actions over inventory state
  };

  return (
    <></>
    // <View style={{ width: '100%', height: '100%', backgroundColor: '#fff000' }}>
    //   <Text>Test</Text>
    //   <View style={{ marginTop: 50 }}>
    //     <Button onPress={onShare} title="Share" />
    //     <Button onPress={loadNewItems} title="Load new items" />
    //   </View>
    // </View>
  );
};

export default InventoryiesScreen;
