import { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  FlatList,
  Pressable,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';

import type { RootStackScreenProps } from 'navigation/types';

import { useSelector, useDispatch } from 'react-redux';
import {
  inventoryItemAdd,
  inventoryItemDelete,
  inventoryItemSetAmount,
} from 'store/inventories';
import { RootState } from 'store/index';

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import BottomSheet, { BottomSheetRefProps } from 'components/BottomSheet';

interface ButtonProps {
  onPress: () => void;
  title: string;
  style?: StyleProp<ViewStyle>;
}

const evalAndFormat = (input: string) => {
  if (input != '') {
    return eval(input.replace(/^0+(?=\d)/, ''))
      .toFixed(3)
      .replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/, '$1')
      .toString();
  }
};

const AmountCalcButton = ({ title, onPress, style }: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        {
          width: 72,
          height: 72,
          borderRadius: 24,
          backgroundColor: '#2f3136',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 5,
        },
        style,
      ]}
      onPress={onPress}>
      <Text style={{ color: '#DCDDDE', fontWeight: '500', fontSize: 28 }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const AmountInputScreen = ({
  route,
  navigation,
}: RootStackScreenProps<'AmountInput'>) => {
  const { inventoryId, itemId } = route.params;

  const inventories = useSelector(
    (state: RootState) => state.invetoriesReducer,
  );

  const dispatch = useDispatch();

  // const

  // const displayFirstNumber = (): number => {
  //   return
  // }

  const [amount, setAmount] = useState(
    route.params.prediction || route.params.prediction == ''
      ? route.params.prediction
      : inventories[inventoryId].items[itemId].amount,
  );

  const [confirmed, setConfirmed] = useState(true);

  const displayFirstNumber = () => {
    return amount;
  };

  const displaySecondNumber = () => {
    try {
      if (!confirmed && amount != '') {
        return evalAndFormat(amount);
      } else {
        return '';
      }
    } catch {
      return '';
    }
  };

  useEffect(() => {
    try {
      if (evalAndFormat(amount) == amount) {
        setConfirmed(true);
      } else {
        setConfirmed(false);
      }
    } catch {
      setConfirmed(false);
    }
  }, [amount]);

  useEffect(() => {
    console.log(route.params.prediction);
  });

  return (
    <View style={{ flex: 1, backgroundColor: '#36393f' }}>
      <View style={{ position: 'absolute', top: 20, width: '100%' }}>
        <Text>{`${inventoryId}: ${inventories[inventoryId].name}`}</Text>
        <Text>{`${itemId}: ${inventories[inventoryId].items[itemId].name}`}</Text>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          width: '100%',
        }}>
        <View style={{}}>
          <View
            style={{
              alignItems: 'flex-end',
              right: 48,
            }}>
            <Text style={{ color: '#EBECED', fontWeight: '500', fontSize: 56 }}>
              {displayFirstNumber()}
            </Text>

            <Text style={{ color: '#EBECED', fontWeight: '500', fontSize: 34 }}>
              {displaySecondNumber()}
            </Text>
          </View>
        </View>

        <View
          style={{
            maxWidth: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <AmountCalcButton
            title="1"
            onPress={() => {
              setAmount(`${amount}1`);
            }}
          />
          <AmountCalcButton
            title="2"
            onPress={() => {
              setAmount(`${amount}2`);
            }}
          />
          <AmountCalcButton
            title="3"
            onPress={() => {
              setAmount(`${amount}3`);
            }}
          />
          <AmountCalcButton
            style={{ backgroundColor: '#292B2F' }}
            title="÷"
            onPress={() => {
              setAmount(`${amount}/`);
            }}
          />
        </View>
        <View
          style={{
            maxWidth: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <AmountCalcButton
            title="4"
            onPress={() => {
              setAmount(`${amount}4`);
            }}
          />
          <AmountCalcButton
            title="5"
            onPress={() => {
              setAmount(`${amount}5`);
            }}
          />
          <AmountCalcButton
            title="6"
            onPress={() => {
              setAmount(`${amount}6`);
            }}
          />
          <AmountCalcButton
            style={{ backgroundColor: '#292B2F' }}
            title="×"
            onPress={() => {
              setAmount(`${amount}*`);
            }}
          />
        </View>
        <View
          style={{
            maxWidth: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <AmountCalcButton
            title="7"
            onPress={() => {
              setAmount(`${amount}7`);
            }}
          />
          <AmountCalcButton
            title="8"
            onPress={() => {
              setAmount(`${amount}8`);
            }}
          />
          <AmountCalcButton
            title="9"
            onPress={() => {
              setAmount(`${amount}9`);
            }}
          />
          <AmountCalcButton
            style={{ backgroundColor: '#292B2F' }}
            title="+"
            onPress={() => {
              setAmount(`${amount}+`);
            }}
          />
        </View>
        <View
          style={{
            maxWidth: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <AmountCalcButton
            title=","
            onPress={() => {
              setAmount(`${amount}.`);
            }}
          />
          <AmountCalcButton
            title="0"
            onPress={() => {
              setAmount(`${amount}0`);
            }}
          />
          <AmountCalcButton
            title="⌫"
            onPress={() => {
              setAmount(`${amount}`.slice(0, -1));
            }}
          />
          <AmountCalcButton
            style={{ backgroundColor: '#292B2F' }}
            title="-"
            onPress={() => {
              setAmount(`${amount}-`);
            }}
          />
        </View>

        <View
          style={{
            maxWidth: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              width: 313,
              height: 72,
              borderRadius: 24,
              backgroundColor: '#202225',
              justifyContent: 'center',
              alignItems: 'center',
              margin: 5,
            }}
            onPress={() => {
              try {
                if (amount != '') {
                  setAmount(evalAndFormat(amount));
                  if (confirmed) {
                    dispatch(
                      inventoryItemSetAmount({
                        inventoryId,
                        itemId,
                        newAmount: amount,
                      }),
                    );
                    navigation.goBack();
                  } else {
                    setConfirmed(true);
                  }
                }
              } catch {}
            }}>
            <Text style={{ color: '#DCDDDE', fontWeight: '500', fontSize: 28 }}>
              {confirmed ? '✅' : '='}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AmountInputScreen;
