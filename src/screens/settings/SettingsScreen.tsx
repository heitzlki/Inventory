import { View, Text, Pressable } from 'react-native';

import type { RootStackScreenProps } from 'navigation/types';

import { useDispatch, useSelector } from 'react-redux';
import { signOut } from 'store/auth';

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemeState } from 'store/theme/state';
import { setTheme } from 'store/theme';
import { RootState } from 'store/index';
import MyBackground from 'components/custom/MyBackground';
import MyTopBar from 'components/custom/MyTopBar';
const SettingsScreen = ({
  route,
  navigation,
}: RootStackScreenProps<'Settings'>) => {
  const theme = useSelector((state: RootState) => state.themeReducer);
  const dispatch = useDispatch();

  return (
    <MyBackground>
      <MyTopBar>
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
      </MyTopBar>
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
          onPress={() => dispatch(setTheme({}))}>
          <Text
            style={{
              marginLeft: 10,
              color: '#DCDDDE',
              fontWeight: '500',
              fontSize: 16,
            }}>
            Theme: {theme.theme}
          </Text>
        </Pressable>
      </View>
    </MyBackground>
  );
};

export default SettingsScreen;
