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

import type { DrawerNavScreenProps } from 'navigation/types';

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/';

const HomeScreen = ({ route, navigation }: DrawerNavScreenProps<'Home'>) => {
  const inventuries = useSelector(
    (state: RootState) => state.inveturiesReducer,
  );
  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1 }}>
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
        }}>
        <View>
          <View>
            Icon
            <Pressable onPress={() => navigation.openDrawer()}></Pressable>
          </View>
        </View>
        <View>
          <View>Actions (Search, multiselect)</View>
        </View>
      </View>

      <View style={{ flex: 1, paddingTop: 64 }}>
        {/* <View>
          Show newest, latest, last edited, archived, deleted (Bottom Modal)
        </View> */}

        {/* <View>change view kachel, liste (on press changes icon and view</View> */}

        <FlatList
          style={{}}
          data={Object.keys(inventuries)}
          renderItem={({ item, index }) => (
            <Text key={item}>{inventuries[item].id}</Text>
          )}
        />
      </View>

      <View>Neu Button</View>
    </View>
  );
};

export default HomeScreen;
