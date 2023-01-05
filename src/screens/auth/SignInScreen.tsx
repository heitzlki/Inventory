import type { RootStackScreenProps } from 'navigation/types';
import { useState } from 'react';
import { View, Pressable, Button, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import { useSelector, useDispatch } from 'react-redux';
import { signIn } from 'store/auth';
import { RootState } from 'store/index';

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const SignInScreen = ({
  route,
  navigation,
}: RootStackScreenProps<'SignIn'>) => {
  const auth = useSelector((state: RootState) => state.authReducer);
  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState('');

  return (
    <View style={{ flex: 1, backgroundColor: '#36393f' }}>
      <View
        style={{
          position: 'absolute',
          zIndex: 2,
          top: 0,
          width: '100%',
          height: 58,

          backgroundColor: '#292B2F',
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', left: 10 }}>
          <Pressable style={{}} onPress={() => navigation.goBack()}>
            <MaterialCommunityIcon
              name="keyboard-backspace"
              size={26}
              color="#DCDDDE"
            />
          </Pressable>
          <Text
            style={{
              color: '#DCDDDE',
              fontWeight: '500',
              fontSize: 16,
              left: 4,
            }}>
            Sign Up
          </Text>
        </View>
      </View>
      <View style={{ top: 58, alignItems: 'center' }}>
        <View
          style={{
            height: 42,
            width: '95%',
            backgroundColor: '#202225',
            marginVertical: 4,
            borderRadius: 8,

            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TextInput
            style={{
              marginLeft: 4,
              color: '#DCDDDE',
              fontWeight: '500',
              fontSize: 16,
              flex: 1,
            }}
            placeholderTextColor={'#ABB0B6'}
            onChangeText={text => setCredentials(text)}
            placeholder="Name"
          />
        </View>
        <Pressable
          style={{
            height: 42,
            width: '95%',
            backgroundColor: '#2f3136',
            marginVertical: 4,
            borderRadius: 8,

            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            dispatch(signIn({ token: credentials }));
          }}>
          <Text
            style={{
              color: '#DCDDDE',
              fontWeight: '500',
              fontSize: 16,
            }}>
            Sign In
          </Text>
        </Pressable>
        <View
          style={{
            height: 2,
            width: '95%',
            backgroundColor: '#ABB0B6',
            marginVertical: 10,
            borderRadius: 8,
          }}
        />
        <Text
          style={{
            color: '#ABB0B6',
            fontWeight: '500',
            fontSize: 16,
            marginVertical: 10,
          }}
          onPress={() => navigation.navigate('SignUp')}>
          Sign Up
        </Text>
      </View>
    </View>
  );
};

export default SignInScreen;
