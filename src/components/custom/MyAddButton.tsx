import { Pressable, PressableProps, StyleSheet, ViewStyle } from 'react-native';

import { useSelector } from 'react-redux';
import { RootState } from 'store/index';
import MyIcon from './MyIcon';
import MyPressableIcon from './MyPressableIcon';

const MyAddButton = ({ onPress, style }: PressableProps) => {
  const theme = useSelector((state: RootState) => state.themeReducer);
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
      backgroundColor: theme.style.colorSix,
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
