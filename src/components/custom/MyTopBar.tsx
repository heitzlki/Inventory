import { View, ViewProps, StyleSheet, ViewStyle } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from 'store/index';

interface Props extends ViewProps {
  children?: React.ReactNode;
}

const MyTopBar = ({ children, style, ...props }: Props) => {
  const theme = useSelector((state: RootState) => state.themeReducer);
  const combinedStyles: ViewStyle = StyleSheet.flatten([
    {
      position: 'absolute',
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
      {children}
    </View>
  );
};
export default MyTopBar;
