import { Pressable, Text, View } from 'react-native';
import type { RootStackScreenProps } from 'navigation/types';
import { MyBackground, MyTopBar, MyText, MyButton } from 'components/custom';

const EntryScreen = ({ navigation }: RootStackScreenProps<'Entry'>) => (
  <MyBackground>
    <MyTopBar style={{ justifyContent: 'center' }}>
      <MyText
        style={{
          fontWeight: '500',
          fontSize: 20,
        }}
        text="Inventory"
      />
    </MyTopBar>
    <View style={{ alignItems: 'center' }}>
      <MyButton
        style={{ marginTop: 8, justifyContent: 'center' }}
        onPressAction={() => navigation.navigate('SignIn')}>
        <MyText
          style={{
            fontWeight: '500',
            fontSize: 16,
          }}
          text={'Sign In'}
        />
      </MyButton>
      <MyButton
        style={{ justifyContent: 'center' }}
        onPressAction={() => navigation.navigate('SignUp')}>
        <MyText
          style={{
            fontWeight: '500',
            fontSize: 16,
          }}
          text={'Sign Up'}
        />
      </MyButton>
    </View>
  </MyBackground>
);

export default EntryScreen;
