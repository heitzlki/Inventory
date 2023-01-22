import { Text, TextProps, StyleSheet } from 'react-native';

import { useSelector } from 'react-redux';
import { RootState } from 'store/index';

interface Props extends TextProps {
  text: string;
}

const MyText = ({ text, style, ...props }: Props) => {
  const theme = useSelector((state: RootState) => state.themeReducer);
  const combinedStyles = StyleSheet.flatten([
    { color: theme.style.text },
    style,
  ]);

  return (
    <Text style={combinedStyles} {...props}>
      {text}
    </Text>
  );
};
export default MyText;
