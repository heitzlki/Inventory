import { Text, ViewProps, StyleSheet, View } from 'react-native';

import { useSelector } from 'react-redux';
import { RootState } from 'store/index';

import { useStyles } from 'hooks/useStyles';
import MyText from 'components/custom/MyText';
import { CategoryType } from 'store/catalog/state';

interface Props extends ViewProps {
  category: CategoryType;
}

const MyCategoryLabel = ({ category, style, ...props }: Props) => {
  const { styles } = useStyles();
  const combinedStyles = StyleSheet.flatten([
    {
      marginLeft: 4,
      marginVertical: 2,
      backgroundColor: styles.colors.paletteCategory[category].primary,
      borderRadius: 4,
      borderColor: styles.colors.paletteCategory[category].secondary,
      borderWidth: 2,
      paddingHorizontal: 4,
    },
    style,
  ]);

  return (
    <View style={combinedStyles} {...props}>
      <MyText
        style={{
          fontWeight: '500',
          fontSize: 13.5,
        }}
        text={category}
      />
    </View>
  );
};
export default MyCategoryLabel;
