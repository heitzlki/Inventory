import { View } from 'react-native';

import type { RootStackScreenProps } from 'navigation/types';

import { useDispatch } from 'react-redux';
// import { signOut } from 'store/auth';
import { useSignOut } from 'hooks/useSignOut';

import { MyBackground, MyButton, MyText, MyTopBar } from 'components/custom';
import { useStyles } from 'hooks/useStyles';

const SettingsScreen = ({
  route,
  navigation,
}: RootStackScreenProps<'Settings'>) => {
  const { theme, setTheme } = useStyles();
  // const dispatch = useDispatch();

  const { signOut } = useSignOut();

  return (
    <MyBackground>
      <MyTopBar backButton={true} title="Settings" />
      <View style={{ alignItems: 'center' }}>
        <MyButton
          onPress={() => {
            // dispatch(signOut());
            signOut();
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
            setTheme(theme === 'light' ? 'dark' : 'light');
          }}>
          <MyText
            style={{
              marginLeft: 10,
              fontWeight: '500',
              fontSize: 16,
            }}
            text={`Theme: ${theme}`}
          />
        </MyButton>
      </View>
    </MyBackground>
  );
};

export default SettingsScreen;
