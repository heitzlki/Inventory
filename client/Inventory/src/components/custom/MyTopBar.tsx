import { View, ViewProps, StyleSheet, ViewStyle } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from 'store/index';
import { useGoBack } from 'hooks/useGoBack';

import MyPressableIcon from './MyPressableIcon';
import MyText from './MyText';

interface Props extends ViewProps {
  children?: React.ReactNode;
  backButton?: boolean;
  title?: string;
}

const MyTopBar = ({ children, backButton, title, style, ...props }: Props) => {
  const theme = useSelector((state: RootState) => state.themeReducer);
  const goBack = useGoBack();
  const combinedStyles: ViewStyle = StyleSheet.flatten([
    {
      position: 'relative',
      zIndex: 2,
      top: 0,
      width: '100%',
      height: 58,
      backgroundColor: theme.style.colorSix,
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
    },
    style,
  ]);

  return (
    <View style={combinedStyles} {...props}>
      {backButton ? (
        <MyPressableIcon onPress={goBack} set="Ionicons" name="arrow-back" />
      ) : null}
      {title ? (
        <MyText
          text={title}
          style={{
            fontWeight: '500',
            fontSize: 16,
            left: 4,
          }}
        />
      ) : null}
      {children}
    </View>
  );
};
export default MyTopBar;
