import { useState } from 'react';
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  FlatList,
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/index';
import { signOut } from 'store/auth';
import { inventuryAdd } from 'store/inventuries';

import type { RootStackScreenProps } from 'navigation/types';

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const InventuriesScreen = ({
  route,
  navigation,
}: RootStackScreenProps<'Inventuries'>) => {
  const inventuries = useSelector(
    (state: RootState) => state.inveturiesReducer,
  );
  const dispatch = useDispatch();

  const [inventuryOptionsModal, setInventuryOptionsModal] = useState({
    visible: false,
    inventuryIndex: 0,
  });

  const createNewInventury = () => {
    dispatch(inventuryAdd());
    navigation.navigate('Inventury', { inventuryIndex: 0 });
  };

  return (
    <>
      <View
        style={{
          flex: 1,
        }}>
        <View
          style={{
            position: 'absolute',
            zIndex: 2,
            top: 0,
            width: '100%',
            height: 64,

            backgroundColor: '#292B2F',
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
          }}></View>
        <View style={{ backgroundColor: '#3B3E45', flex: 1, paddingTop: 64 }}>
          <Text>Test</Text>
          <FlatList
            contentContainerStyle={{
              alignItems: 'center',
              // paddingBottom: 84, // Bottom space for add button
            }}
            data={[1, 2, 3]}
            renderItem={({ item, index, separators }) => (
              <View
                key={item}
                style={{
                  width: '95%',
                  height: 40,
                  backgroundColor: 'red',
                }}></View>
            )}
          />
        </View>
        <View
          style={{
            position: 'absolute',
            zIndex: 2,
            bottom: 0,
            width: '100%',
            height: 64,

            backgroundColor: '#292B2F',
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,

            justifyContent: 'space-around',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <MaterialCommunityIcon
            name="view-grid-plus-outline"
            size={30}
            color="#DCDDDE"
          />
          <Pressable onPress={createNewInventury}>
            <View
              style={{
                width: 58,
                height: 58,
                borderRadius: 15,
                backgroundColor: '#202225',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MaterialCommunityIcon name="plus" size={40} color="#DCDDDE" />
            </View>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Settings')}>
            <MaterialIcon
              name="settings-applications"
              size={30}
              color="#DCDDDE"
            />
          </Pressable>
        </View>
      </View>
      {inventuryOptionsModal.visible ? (
        <Pressable
          onPress={() =>
            setInventuryOptionsModal({
              ...inventuryOptionsModal,
              visible: false,
            })
          }
          style={{
            position: 'absolute',

            zIndex: 3,
            width: '100%',
            height: '100%',
            backgroundColor: '#00000099',
          }}>
          <Pressable
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              height: '60%',
              backgroundColor: '#36393F',
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
            }}>
            <View
              style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Pressable onPress={() => {}}>
                <View
                  style={{
                    width: 60,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: '#202225',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text>Start</Text>
                </View>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      ) : (
        <></>
      )}
    </>
  );
};

export default InventuriesScreen;
