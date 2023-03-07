import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';

import type { RootStackScreenProps } from 'navigation/types';

import { useSelector, useDispatch } from 'react-redux';
import { inventoryItemSetAmount } from 'store/inventories';
import { RootState } from 'store/index';

import { MyBackground } from 'components/custom';

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

  const [amountOne, setAmountOne] = useState(
    route.params.prediction || route.params.prediction == ''
      ? route.params.prediction
      : inventories[inventoryId].items[itemId].amountOne,
  );

  const [confirmed, setConfirmed] = useState(true);

  const displayFirstNumber = () => {
    return amountOne;
  };

  const displaySecondNumber = () => {
    try {
      if (!confirmed && amountOne != '') {
        return evalAndFormat(amountOne);
      } else {
        return '';
      }
    } catch {
      return '';
    }
  };

  useEffect(() => {
    try {
      if (evalAndFormat(amountOne) == amountOne) {
        setConfirmed(true);
      } else {
        setConfirmed(false);
      }
    } catch {
      setConfirmed(false);
    }
  }, [amountOne]);

  return (
    <MyBackground>
      <View style={{ position: 'absolute', top: 20, left: 20, width: '100%' }}>
        <Text style={{ color: '#EBECED', fontWeight: '500', fontSize: 24 }}>
          {inventories[inventoryId].items[itemId].name}
        </Text>
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
              setAmountOne(`${amountOne}1`);
            }}
          />
          <AmountCalcButton
            title="2"
            onPress={() => {
              setAmountOne(`${amountOne}2`);
            }}
          />
          <AmountCalcButton
            title="3"
            onPress={() => {
              setAmountOne(`${amountOne}3`);
            }}
          />
          <AmountCalcButton
            style={{ backgroundColor: '#292B2F' }}
            title="÷"
            onPress={() => {
              setAmountOne(`${amountOne}/`);
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
              setAmountOne(`${amountOne}4`);
            }}
          />
          <AmountCalcButton
            title="5"
            onPress={() => {
              setAmountOne(`${amountOne}5`);
            }}
          />
          <AmountCalcButton
            title="6"
            onPress={() => {
              setAmountOne(`${amountOne}6`);
            }}
          />
          <AmountCalcButton
            style={{ backgroundColor: '#292B2F' }}
            title="×"
            onPress={() => {
              setAmountOne(`${amountOne}*`);
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
              setAmountOne(`${amountOne}7`);
            }}
          />
          <AmountCalcButton
            title="8"
            onPress={() => {
              setAmountOne(`${amountOne}8`);
            }}
          />
          <AmountCalcButton
            title="9"
            onPress={() => {
              setAmountOne(`${amountOne}9`);
            }}
          />
          <AmountCalcButton
            style={{ backgroundColor: '#292B2F' }}
            title="+"
            onPress={() => {
              setAmountOne(`${amountOne}+`);
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
              setAmountOne(`${amountOne}.`);
            }}
          />
          <AmountCalcButton
            title="0"
            onPress={() => {
              setAmountOne(`${amountOne}0`);
            }}
          />
          <AmountCalcButton
            title="⌫"
            onPress={() => {
              setAmountOne(`${amountOne}`.slice(0, -1));
            }}
          />
          <AmountCalcButton
            style={{ backgroundColor: '#292B2F' }}
            title="-"
            onPress={() => {
              setAmountOne(`${amountOne}-`);
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
                if (amountOne != '') {
                  setAmountOne(evalAndFormat(amountOne));
                  if (confirmed) {
                    dispatch(
                      inventoryItemSetAmount({
                        inventoryId,
                        itemId,
                        newAmountOne: amountOne,
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
    </MyBackground>
  );
};

export default AmountInputScreen;
