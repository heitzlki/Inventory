import { Pressable, PressableProps, StyleSheet, ViewStyle } from 'react-native';

import { useSelector } from 'react-redux';
import { RootState } from 'store/index';

import { useStyles } from 'hooks/useStyles';
interface Props extends PressableProps {
  children?: React.ReactNode;
  onPress: () => void;
}

const MyButton = ({ children, onPress, style, ...props }: Props) => {
  const { styles } = useStyles();
  const combinedStyles = StyleSheet.flatten([
    {
      height: 42,
      width: '95%',
      backgroundColor: styles.colors.paletteFour,
      marginVertical: 4,
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
    },
    style,
  ]) as ViewStyle;

  return (
    <Pressable style={combinedStyles} onPress={onPress} {...props}>
      {children}
    </Pressable>
  );
};
export default MyButton;
