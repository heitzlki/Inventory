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
import MyButton from 'components/custom/MyButton';
import MyText from 'components/custom/MyText';
const SettingsScreen = ({
  route,
  navigation,
}: RootStackScreenProps<'Settings'>) => {
  const theme = useSelector((state: RootState) => state.themeReducer);
  const dispatch = useDispatch();

  return (
    <MyBackground>
      <MyTopBar backButton={true} title="Settings" />
      <View style={{ alignItems: 'center' }}>
        <MyButton
          onPressAction={() => {
            dispatch(signOut());
          }}
          style={{ marginTop: 8 }}>
          <MyText
            style={{
              marginLeft: 10,
              fontWeight: '500',
              fontSize: 16,
            }}
            text="Sign Out"
          />
        </MyButton>
        <MyButton
          onPressAction={() => {
            dispatch(setTheme({}));
          }}>
          <MyText
            style={{
              marginLeft: 10,
              fontWeight: '500',
              fontSize: 16,
            }}
            text={`Theme: ${theme.theme}`}
          />
        </MyButton>
      </View>
    </MyBackground>
  );
};

export default SettingsScreen;
