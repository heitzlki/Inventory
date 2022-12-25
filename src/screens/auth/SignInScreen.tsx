import type { RootStackScreenProps } from 'navigation/types';
import { useState } from 'react';
import { Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import { useSelector, useDispatch } from 'react-redux';
import { signIn } from 'store/auth';
import { RootState } from 'store/index';

const SignInScreen = ({
  route,
  navigation,
}: RootStackScreenProps<'SignIn'>) => {
  const auth = useSelector((state: RootState) => state.authReducer);
  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState('');

  return (
    <>
      <TextInput
        onChangeText={text => {
          setCredentials(text);
        }}
      />
      <Button
        onPress={() => {
          dispatch(signIn({ token: credentials }));
        }}
        title="SignIn"
      />
      <Button onPress={() => navigation.navigate('SignUp')} title="SignUp" />
    </>
  );
};

export default SignInScreen;
