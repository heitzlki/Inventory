import { useRef } from 'react';
import { View } from 'react-native';

import type { RootStackScreenProps } from 'navigation/types';

import { MyBackground, MyButton, MyText, MyTopBar } from 'components/custom';
import { useStyles } from 'hooks/useStyles';
import { useLang } from 'hooks/useLang';

import { BottomSheetRefProps } from 'components/BottomSheet';
import SettingsLangBottomSheet from 'components/settings/SettingsLangBottomSheet';

const SettingsScreen = ({
  route,
  navigation,
}: RootStackScreenProps<'Settings'>) => {
  const { theme, setTheme } = useStyles();
  const { lang, translations, setLang } = useLang();

  const langBottomSheetRef = useRef<BottomSheetRefProps>(null);

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
        <MyButton
          onPress={() => {
            langBottomSheetRef.current?.activate();
          }}>
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

      <SettingsLangBottomSheet
        bottomSheetRef={langBottomSheetRef}
        lang={lang}
        setLang={setLang}
      />
    </MyBackground>
  );
};

export default SettingsScreen;
