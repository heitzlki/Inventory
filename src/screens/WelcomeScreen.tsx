import { Pressable, Text, View } from 'react-native';
import type { RootStackScreenProps } from 'navigation/types';

const WelcomeScreen = ({ navigation }: RootStackScreenProps<'Welcome'>) => (
  <View style={{ flex: 1, backgroundColor: '#36393f' }}>
    <View
      style={{
        position: 'absolute',
        top: 100,
        width: '100%',
        alignItems: 'center',
      }}>
      <Text style={{ color: '#DCDDDE', fontWeight: '500', fontSize: 54 }}>
        Inventury
      </Text>
    </View>
    <View style={{ position: 'absolute', bottom: 84, width: '100%' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <Pressable
          style={{
            width: 124,
            height: 54,
            backgroundColor: '#292B2F',
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('SignIn')}>
          <Text style={{ color: '#DCDDDE', fontWeight: '500', fontSize: 24 }}>
            Sign In
          </Text>
        </Pressable>
        <Pressable
          style={{
            width: 124,
            height: 54,
            backgroundColor: '#292B2F',
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('SignUp')}>
          <Text style={{ color: '#DCDDDE', fontWeight: '500', fontSize: 24 }}>
            Sign Up
          </Text>
        </Pressable>
      </View>
    </View>
  </View>
);

export default WelcomeScreen;
