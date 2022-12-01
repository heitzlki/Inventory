import { Button } from 'react-native';
import type { RootStackScreenProps } from 'navigation/types';

const WelcomeScreen = ({
  route,
  navigation,
}: RootStackScreenProps<'Welcome'>) => {
  return (
    <>
      <Button onPress={() => navigation.navigate('SignIn')} title="SignIn" />
      <Button onPress={() => navigation.navigate('SignUp')} title="SignUp" />
    </>
  );
};

export default WelcomeScreen;
