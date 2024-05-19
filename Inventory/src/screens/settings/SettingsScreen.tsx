import { View } from 'react-native';

import type { RootStackScreenProps } from 'navigation/types';

import { MyBackground, MyButton, MyText, MyTopBar } from 'components/custom';
import { useStyles } from 'hooks/useStyles';
import { useLang } from 'hooks/useLang';

const SettingsScreen = ({
  route,
  navigation,
}: RootStackScreenProps<'Settings'>) => {
  const { theme, setTheme } = useStyles();
  const { translations, setLang } = useLang();

  return (
    <MyBackground>
      <MyTopBar backButton={true} title="Settings" />
      <View style={{ alignItems: 'center' }}>
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
            text={`${translations.theme}: ${theme}`}
          />
        </MyButton>
        <MyButton onPress={() => {}}>
          <MyText
            style={{
              marginLeft: 10,
              fontWeight: '500',
              fontSize: 16,
            }}
            text={`${translations.language}: ${translations.language_name}`}
          />
        </MyButton>
      </View>
    </MyBackground>
  );
};

export default SettingsScreen;
