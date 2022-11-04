import * as React from 'react';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from 'store/index';

import StartupNav from 'navigation/StartupNav';
import DrawerNav from 'navigation/DrawerNav';

const Navigator = () => {
  const auth = useSelector((state: RootState) => state.authReducer);

  return true ? <DrawerNav /> : <StartupNav />;
};

export default Navigator;
