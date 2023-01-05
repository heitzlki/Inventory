import { Pressable, Text, View } from 'react-native';
import type { RootStackScreenProps } from 'navigation/types';

const EntryScreen = ({ navigation }: RootStackScreenProps<'Entry'>) => (
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
        justifyContent: 'center',
      }}>
      <Text
        style={{
          color: '#DCDDDE',
          fontWeight: '500',
          fontSize: 18,
        }}>
        Inventory
      </Text>
    </View>
    <View style={{ top: 58, alignItems: 'center' }}>
      <Pressable
        style={{
          height: 42,
          width: '95%',
          backgroundColor: '#2f3136',
          marginVertical: 4,
          borderRadius: 8,

          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => {
          navigation.navigate('SignIn');
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

      <Pressable
        style={{
          height: 42,
          width: '95%',
          backgroundColor: '#2f3136',
          marginVertical: 4,
          borderRadius: 8,

          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => {
          navigation.navigate('SignUp');
        }}>
        <Text
          style={{
            color: '#DCDDDE',
            fontWeight: '500',
            fontSize: 16,
          }}>
          Sign Up
        </Text>
      </Pressable>
    </View>
  </View>
);

export default EntryScreen;
