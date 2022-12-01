import { Text, Button } from 'react-native';

import type { RootStackScreenProps } from 'navigation/types';

const SignUpScreen = ({
  route,
  navigation,
}: RootStackScreenProps<'SignUp'>) => {
  return (
    <>
      <Text>Not aviable!</Text>
      <Button onPress={() => navigation.navigate('SignIn')} title="SignIn" />
    </>
  );
};

export default SignUpScreen;
