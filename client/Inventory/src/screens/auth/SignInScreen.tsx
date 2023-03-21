import type { RootStackScreenProps } from 'navigation/types';
import { useState } from 'react';
import { View, Pressable, Button, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import { useSelector, useDispatch } from 'react-redux';
import { signIn } from 'store/auth';
import { RootState } from 'store/index';

import MyBackground from 'components/custom/MyBackground';
import MyTopBar from 'components/custom/MyTopBar';
import MyButton from 'components/custom/MyButton';
import MyText from 'components/custom/MyText';

const SignInScreen = ({
  route,
  navigation,
}: RootStackScreenProps<'SignIn'>) => {
  const theme = useSelector((state: RootState) => state.themeReducer);
  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState('');

  return (
    <MyBackground>
      <MyTopBar backButton={true} title="Sign In" />
      <View style={{ alignItems: 'center' }}>
        <View
          style={{
            height: 42,
            width: '95%',
            backgroundColor: theme.style.colorSix,
            marginVertical: 4,
            borderRadius: 8,

            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TextInput
            style={{
              marginLeft: 4,
              color: theme.style.text,
              fontWeight: '500',
              fontSize: 16,
              flex: 1,
            }}
            placeholderTextColor={theme.style.textDim}
            onChangeText={text => setCredentials(text)}
            placeholder="Name"
          />
        </View>
        <MyButton
          onPress={() => {
            dispatch(signIn({ token: credentials }));
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
            backgroundColor: theme.style.textDim,
            marginVertical: 10,
            borderRadius: 8,
          }}
        />
        <Text
          style={{
            color: theme.style.textDim,
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
