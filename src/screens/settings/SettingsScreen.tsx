import { View, Text, Pressable } from 'react-native';

import type { RootStackScreenProps } from 'navigation/types';

import { useDispatch } from 'react-redux';
import { signOut } from 'store/auth';

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const SettingsScreen = ({
  route,
  navigation,
}: RootStackScreenProps<'Settings'>) => {
  const dispatch = useDispatch();

  return (
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
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', left: 10 }}>
          <Pressable style={{}} onPress={() => navigation.goBack()}>
            <MaterialCommunityIcon
              name="keyboard-backspace"
              size={26}
              color="#DCDDDE"
            />
          </Pressable>
          <Text
            style={{
              color: '#DCDDDE',
              fontWeight: '500',
              fontSize: 16,
              left: 4,
            }}>
            Settings
          </Text>
        </View>
      </View>
      <View style={{ top: 58, alignItems: 'center' }}>
        <Pressable
          style={{
            height: 42,
            width: '95%',
            backgroundColor: '#2f3136',
            marginVertical: 4,
            borderRadius: 8,

            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => dispatch(signOut())}>
          <Text
            style={{
              marginLeft: 10,
              color: '#DCDDDE',
              fontWeight: '500',
              fontSize: 16,
            }}>
            Sign Out
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SettingsScreen;
