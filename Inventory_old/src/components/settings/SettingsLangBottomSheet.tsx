import { View, ViewProps } from 'react-native';

import { useEffect } from 'react';
import { TextInput, BackHandler, Pressable, FlatList } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/index';

import { useStyles } from 'hooks/useStyles';
import { useLang } from 'hooks/useLang';
import { inventoryDelete, inventoryEdit } from 'store/inventories';

import BottomSheet, { BottomSheetRefProps } from 'components/BottomSheet';

import MyPressableIcon from 'components/custom/MyPressableIcon';
import { validCategories } from 'store/catalog/state';

import {
  MyBackground,
  MyTopBar,
  MyButton,
  MyText,
  MyCategoryLabel,
} from 'components/custom';
import { Lang, validLangs } from 'store/lang/state';

interface Props extends ViewProps {
  children?: React.ReactNode;
  bottomSheetRef: React.RefObject<BottomSheetRefProps>;
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const SettingsLangBottomSheet = ({
  children,
  bottomSheetRef,
  lang,
  setLang,
}: Props) => {
  const { styles } = useStyles();
  const { translations } = useLang();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (bottomSheetRef.current?.isActive()) {
          bottomSheetRef.current?.activate();
          return true;
        } else {
          return false;
        }
      },
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      // backgroundTapAction={() => editNameRef.current?.blur()}
      snapMaxTranslateY={0.85}
      snapMinTranslateY={0.75}
      activateTranslateY={0.8}>
      <View
        style={{
          width: 75,
          height: 4,
          backgroundColor: styles.colors.paletteTextMain,
          alignSelf: 'center',
          marginVertical: 15,
          borderRadius: 2,
        }}
      />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        <View
          style={{
            // height: 42,
            width: '95%',
            backgroundColor: styles.colors.paletteFour,
            // marginVertical: 4,
            borderRadius: 8,

            flexDirection: 'row',
            // alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
          }}>
          <MyText
            style={{
              fontWeight: '500',
              fontSize: 16,
              flex: 1,
              marginLeft: 8,
            }}
            text={`${translations.language}`}
          />

          <View style={{}}>
            <FlatList
              data={validLangs}
              renderItem={({ item }) => (
                <Pressable
                  key={item}
                  style={{
                    flex: 1,
                    margin: 5,
                    backgroundColor: styles.colors.paletteSix,

                    paddingHorizontal: 14,
                    paddingVertical: 4,

                    borderRadius: 8,
                    borderColor: styles.colors.paletteTextMain,
                    borderWidth: lang == item ? 2 : 0,

                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    setLang(item);

                    bottomSheetRef.current?.activate();
                  }}>
                  <MyText
                    text={`${translations.lang[item]}`}
                    style={{
                      fontWeight: '500',
                      fontSize: 16,
                      textAlign: 'center',
                      color:
                        lang == item
                          ? styles.colors.paletteTextMain
                          : styles.colors.paletteTextLight,
                    }}
                  />
                </Pressable>
              )}
            />
          </View>
        </View>
      </View>

      {children}
    </BottomSheet>
  );
};
export default SettingsLangBottomSheet;
