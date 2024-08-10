import { Text, TextProps, StyleSheet } from 'react-native';

import { useSelector } from 'react-redux';
import { RootState } from 'store/index';

import { useStyles } from 'hooks/useStyles';
interface Props extends TextProps {
  text: string;
}

const MyText = ({ text, style, ...props }: Props) => {
  const { styles } = useStyles();
  const combinedStyles = StyleSheet.flatten([
    { color: styles.colors.paletteTextMain },
    style,
  ]);

  return (
    <Text style={combinedStyles} {...props}>
      {text}
    </Text>
  );
};
export default MyText;
