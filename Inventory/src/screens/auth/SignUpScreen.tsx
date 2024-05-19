import React, { useState } from 'react';
import type { RootStackScreenProps } from 'navigation/types';
import { Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import MyBackground from 'components/custom/MyBackground';
import MyButton from 'components/custom/MyButton';
import MyText from 'components/custom/MyText';
import MyTopBar from 'components/custom/MyTopBar';
import { useStyles } from 'hooks/useStyles';
import { useSignUp } from 'hooks/useSignUp';

const SignUpScreen = ({
  route,
  navigation,
}: RootStackScreenProps<'SignUp'>) => {
  const { styles } = useStyles();

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    error: '',
  });

  const { signUp, error } = useSignUp();

  return (
    <MyBackground>
      <MyTopBar backButton={true} title="Sign Up" />
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
            signUp(credentials.email, credentials.password);
          }}
          style={{
            justifyContent: 'center',
          }}>
          <MyText
            style={{
              fontWeight: '500',
              fontSize: 16,
            }}
            text={'Sign Up'}
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
          onPress={() => navigation.navigate('SignIn')}>
          Sign In
        </Text>
      </View>
    </MyBackground>
  );
};

export default SignUpScreen;
