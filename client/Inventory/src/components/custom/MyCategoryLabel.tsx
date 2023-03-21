import { Text, ViewProps, StyleSheet, View } from 'react-native';

import { useSelector } from 'react-redux';
import { RootState } from 'store/index';

import MyText from 'components/custom/MyText';
import { CategoryType } from 'store/catalog/state';

interface Props extends ViewProps {
  category: CategoryType;
}

const MyCategoryLabel = ({ category, style, ...props }: Props) => {
  const theme = useSelector((state: RootState) => state.themeReducer);
  const combinedStyles = StyleSheet.flatten([
    {
      marginLeft: 4,
      marginVertical: 2,
      backgroundColor: theme.style.categoryColors[category].colorOne,
      borderRadius: 4,
      borderColor: theme.style.categoryColors[category].colorTwo,
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
