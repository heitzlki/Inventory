import { View, ViewProps, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from 'store/index';

import { useStyles } from 'hooks/useStyles';
interface Props extends ViewProps {
  children?: React.ReactNode;
}

const MyBackground = ({ children, style, ...props }: Props) => {
  const { styles } = useStyles();
  const combinedStyles = StyleSheet.flatten([
    { flex: 1, backgroundColor: styles.colors.paletteTwo },
    style,
  ]);

  return (
    <View style={combinedStyles} {...props}>
      {children}
    </View>
  );
};
export default MyBackground;
