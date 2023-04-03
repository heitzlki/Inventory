import { PressableProps, StyleSheet, ViewStyle } from 'react-native';

import MyPressableIcon from './MyPressableIcon';

import { useStyles } from 'hooks/useStyles';

const MyAddButton = ({ onPress, style }: PressableProps) => {
  const { styles } = useStyles();
  const combinedStyles = StyleSheet.flatten<ViewStyle>([
    {
      position: 'absolute',
      alignSelf: 'flex-end',
      bottom: 20,
      right: 20,
      alignItems: 'center',
      justifyContent: 'center',
      width: 60,
      height: 60,
      borderRadius: 15,
      backgroundColor: styles.colors.paletteSix,
    },
    style as ViewStyle,
  ]);

  return (
    <MyPressableIcon
      style={combinedStyles}
      onPress={onPress}
      set="MaterialCommunityIcons"
      name="plus"
      size={40}
    />
  );
};
export default MyAddButton;
