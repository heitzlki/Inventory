import { Pressable, PressableProps, StyleSheet, ViewStyle } from 'react-native';

import { useSelector } from 'react-redux';
import { RootState } from 'store/index';

interface Props extends PressableProps {
  children?: React.ReactNode;
  onPress: () => void;
}

const MyButton = ({ children, onPress, style, ...props }: Props) => {
  const theme = useSelector((state: RootState) => state.themeReducer);
  const combinedStyles = StyleSheet.flatten([
    {
      height: 42,
      width: '95%',
      backgroundColor: theme.style.colorFour,
      marginVertical: 4,
      borderRadius: 8,
    },
    style,
  ]);

  const mergedStyles: ViewStyle = {
    ...combinedStyles,
    flexDirection: (style as ViewStyle)?.flexDirection || 'row',
    alignItems: (style as ViewStyle)?.alignItems || 'center',
  };

  return (
    <Pressable style={mergedStyles} onPress={onPress} {...props}>
      {children}
    </Pressable>
  );
};
export default MyButton;
