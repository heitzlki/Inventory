import { useState } from 'react';
import { Button, View, Text, TouchableOpacity, Pressable } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/index';
import { signOut } from 'store/auth';
import { inventuryAdd } from 'store/inventuries';

import type { RootStackScreenProps } from 'navigation/types';

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
const SettingsScreen = ({
  route,
  navigation,
}: RootStackScreenProps<'Settings'>) => {
  const dispatch = useDispatch();

  return (
    <>
      <View
        style={{
          flex: 1,
        }}>
        {/* <View
          style={{
            position: 'absolute',
            zIndex: 2,
            top: 0,
            width: '100%',
            height: 64,

            backgroundColor: '#292B2F',
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
          }}></View> */}
        <View style={{ backgroundColor: '#3B3E45', flex: 1, paddingTop: 64 }}>
          <View
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Pressable onPress={() => dispatch(signOut())}>
              <View
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: 15,
                  backgroundColor: '#292B2F',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <MaterialIcon name="logout" size={30} color="#DCDDDE" />
              </View>
            </Pressable>
          </View>
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
          <TouchableOpacity
            onPress={() => navigation.navigate('Inventuries')}
            accessibilityRole="button">
            <MaterialCommunityIcon
              name="view-grid-plus-outline"
              size={30}
              color="#DCDDDE"
            />
          </TouchableOpacity>

          <MaterialIcon
            name="settings-applications"
            size={30}
            color="#DCDDDE"
          />
        </View>
      </View>
    </>
  );
};

export default SettingsScreen;
