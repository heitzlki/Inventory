import { View } from 'react-native';

import type { RootStackScreenProps } from 'navigation/types';

import { useDispatch, useSelector } from 'react-redux';
import { signOut } from 'store/auth';

import { setTheme } from 'store/theme';
import { RootState } from 'store/index';

import { MyBackground, MyTopBar, MyButton, MyText } from 'components/custom';

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
          onPress={() => {
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
          onPress={() => {
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
