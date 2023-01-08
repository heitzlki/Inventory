import { View, ViewProps, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from 'store/index';

interface Props extends ViewProps {
  children?: React.ReactNode;
}

const MyBackground = ({ children, style, ...props }: Props) => {
  const theme = useSelector((state: RootState) => state.themeReducer);
  const combinedStyles = StyleSheet.flatten([
    { flex: 1, backgroundColor: theme.style.colorTwo },
    style,
  ]);

  return (
    <View style={combinedStyles} {...props}>
      {children}
    </View>
  );
};
export default MyBackground;
