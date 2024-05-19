import type { RootStackScreenProps } from 'navigation/types';
import { useState } from 'react';
import { View, Pressable, Button, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import { useSelector, useDispatch } from 'react-redux';
import { signIn } from 'store/auth';
import { RootState } from 'store/index';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

import { useSignIn } from 'hooks/useSignIn';

import { useStyles } from 'hooks/useStyles';
import MyBackground from 'components/custom/MyBackground';
import MyTopBar from 'components/custom/MyTopBar';
import MyButton from 'components/custom/MyButton';
import MyText from 'components/custom/MyText';

const SignInScreen = ({
  route,
  navigation,
}: RootStackScreenProps<'SignIn'>) => {
  const { styles } = useStyles();
  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    error: '',
  });

  const { signIn, error } = useSignIn();

  return (
    <MyBackground>
      <MyTopBar backButton={true} title="Sign In" />
      <View style={{ alignItems: 'center' }}>
        <View
          style={{
            height: 42,
            width: '95%',
            backgroundColor: styles.colors.paletteSix,
            marginVertical: 4,
            borderRadius: 8,

            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TextInput
            style={{
              marginLeft: 4,
              color: styles.colors.paletteTextMain,
              fontWeight: '500',
              fontSize: 16,
              flex: 1,
            }}
            placeholderTextColor={styles.colors.paletteTextLight}
            onChangeText={text =>
              setCredentials({ ...credentials, email: text })
            }
            placeholder="Email"
          />
        </View>
        <View
          style={{
            height: 42,
            width: '95%',
            backgroundColor: styles.colors.paletteSix,
            marginVertical: 4,
            borderRadius: 8,

            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TextInput
            style={{
              marginLeft: 4,
              color: styles.colors.paletteTextMain,
              fontWeight: '500',
              fontSize: 16,
              flex: 1,
            }}
            placeholderTextColor={styles.colors.paletteTextLight}
            secureTextEntry={true}
            onChangeText={text =>
              setCredentials({ ...credentials, password: text })
            }
            placeholder="Password"
          />
        </View>
        <MyButton
          onPress={() => {
            signIn(credentials.email, credentials.password);
          }}
          style={{
            justifyContent: 'center',
          }}>
          <MyText
            style={{
              fontWeight: '500',
              fontSize: 16,
            }}
            text={'Sign In'}
          />
        </MyButton>

        <View
          style={{
            height: 2,
            width: '95%',
            backgroundColor: styles.colors.paletteTextLight,
            marginVertical: 10,
            borderRadius: 8,
          }}
        />
        <Text
          style={{
            color: styles.colors.paletteTextLight,
            fontWeight: '500',
            fontSize: 16,
            marginVertical: 10,
          }}
          onPress={() => navigation.navigate('SignUp')}>
          Sign Up
        </Text>
      </View>
    </MyBackground>
  );
};

export default SignInScreen;
