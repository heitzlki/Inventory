import { useNavigation } from '@react-navigation/native';

export const useGoBack = () => {
  const navigation = useNavigation();
  return navigation.goBack;
};
