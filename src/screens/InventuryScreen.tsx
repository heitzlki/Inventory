import { StyleSheet, View, Text, Button } from 'react-native';
import type { RootStackScreenProps } from 'navigation/types';

import { useSelector, useDispatch } from 'react-redux';
import {} from 'store/inventuries';
import { RootState } from 'store/index';

const InventuriesScreen = ({
  route,
  navigation,
}: RootStackScreenProps<'Inventury'>) => {
  const inventuries = useSelector(
    (state: RootState) => state.inveturiesReducer,
  );
  const dispatch = useDispatch();

  return <></>;
};

export default InventuriesScreen;
