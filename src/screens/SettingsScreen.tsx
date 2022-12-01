import { Button } from 'react-native';

import { useDispatch } from 'react-redux';

import { signOut } from 'store/auth';

import type { RootStackScreenProps } from 'navigation/types';

const SettingsScreen = ({
  route,
  navigation,
}: RootStackScreenProps<'Settings'>) => {
  const dispatch = useDispatch();

  return (
    <>
      <Button onPress={() => dispatch(signOut())} title="SignOut" />
    </>
  );
};

export default SettingsScreen;
