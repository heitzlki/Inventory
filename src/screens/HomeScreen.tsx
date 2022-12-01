import { useState, useRef, useContext } from 'react';
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  FlatList,
  Modal,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/index';
import { signOut } from 'store/auth';

import { inventuryAdd, inventuryDelete } from 'store/inventuries';

import type { RootStackScreenProps } from 'navigation/types';

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Drawer from 'components/Drawer';

import { DrawerContext } from 'components/Drawer';

const HomeScreen = ({ route, navigation }: RootStackScreenProps<'Home'>) => {
  const inventuries = useSelector(
    (state: RootState) => state.inveturiesReducer,
  );
  const dispatch = useDispatch();

  const drawerContext = useContext(DrawerContext);

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
      }}>
      <View style={{ flex: 1, backgroundColor: '#36393f' }}>
        <View
          style={{
            position: 'absolute',
            zIndex: 2,
            top: 0,
            width: '100%',
            height: 58,

            backgroundColor: '#292B2F',
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            justifyContent: 'center',
          }}>
          <View>
            <Pressable style={{ left: 10 }} onPress={drawerContext.activate}>
              <MaterialCommunityIcon name="menu" size={30} color="#DCDDDE" />
            </Pressable>
            <Text>{`${drawerContext.active.value}`}</Text>
          </View>
        </View>

        <View style={{ flex: 1, paddingTop: 58, justifyContent: 'center' }}>
          <FlatList
            contentContainerStyle={{
              alignItems: 'center',
              paddingBottom: 80, // Bottom space for add button
            }}
            data={Object.keys(inventuries)}
            renderItem={({ item, index }) => (
              <Pressable
                key={item}
                style={{
                  height: 50,
                  maxWidth: '95%',
                  minWidth: '95%',
                  backgroundColor: '#2f3136',
                  marginVertical: 4,
                  borderRadius: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={() =>
                  navigation.navigate('Inventury', {
                    inventuryId: inventuries[item].id,
                  })
                }
                onLongPress={() => {
                  dispatch(inventuryDelete({ inventuryId: item }));
                }}>
                <View
                  style={{
                    left: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <MaterialCommunityIcon
                    name="archive"
                    size={24}
                    color="#c1d3fe"
                  />
                  <Text
                    style={{
                      color: '#DCDDDE',
                      fontWeight: '500',
                      fontSize: 16,
                      left: 4,
                    }}>
                    {inventuries[item].name}
                  </Text>
                </View>
                <View style={{ position: 'absolute', right: 0 }}>
                  <Pressable>
                    <MaterialCommunityIcon
                      name="dots-vertical"
                      size={28}
                      color="#DCDDDE"
                    />
                  </Pressable>
                </View>
              </Pressable>
            )}
          />
        </View>

        <Pressable
          style={{
            position: 'absolute',
            alignSelf: 'flex-end',
            bottom: 20,
            right: 20,
            alignItems: 'center',
            justifyContent: 'center',
            width: 60,
            height: 60,
            borderRadius: 15,
            backgroundColor: '#202225',
          }}
          onPress={() => dispatch(inventuryAdd())}>
          <MaterialCommunityIcon name="plus" size={40} color="#DCDDDE" />
        </Pressable>
      </View>
    </GestureHandlerRootView>
  );
};

export default HomeScreen;
