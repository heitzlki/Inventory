import { useEffect, useState } from 'react';
import type { PressableProps, StyleProp, ViewStyle } from 'react-native';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import type { RootStackScreenProps } from 'navigation/types';

import { useStyles } from 'hooks/useStyles';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/index';
import { inventoryItemSetAmount } from 'store/inventories';

import {
  MyBackground,
  MyPressableIcon,
  MyText,
  MyTopBar,
  MyCategoryLabel,
} from 'components/custom';
import { IconProps } from 'components/custom/MyIcon';
import { ItemState } from 'store/inventories/state';

export type EditingAmountEnum = 'one' | 'two';

const evalAndFormat = (input: string) => {
  if (input != '') {
    return eval(input.replace(/^0+(?=\d)/, ''))
      .toFixed(3)
      .replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/, '$1')
      .toString();
  }
};

interface AmountBaseButtonProps extends PressableProps {
  titleOrIcon: string | IconProps;
}

const AmountBaseButton = ({
  titleOrIcon,
  onPress,
  style,
  ...props
}: AmountBaseButtonProps) => {
  const isTilte = typeof titleOrIcon === 'string';

  const { styles } = useStyles();

  const combinedStyles = StyleSheet.flatten([
    {
      width: 72,
      height: 72,
      borderRadius: 24,
      backgroundColor: styles.colors.paletteFour,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 5,
    },
    style,
  ]) as ViewStyle;

  return isTilte ? (
    <Pressable onPress={onPress} style={combinedStyles} {...props}>
      <MyText style={{ fontWeight: '500', fontSize: 28 }} text={titleOrIcon} />
    </Pressable>
  ) : (
    <MyPressableIcon
      onPress={onPress}
      set={titleOrIcon.set}
      name={titleOrIcon.name}
      size={titleOrIcon.size}
      color={titleOrIcon.color}
      style={combinedStyles}
      {...props}
    />
  );
};

const AmountInputScreen = ({
  route,
  navigation,
}: RootStackScreenProps<'AmountInput'>) => {
  const { inventoryId, itemId } = route.params;

  const { styles } = useStyles();

  const inventories = useSelector(
    (state: RootState) => state.invetoriesReducer,
  );

  const products = useSelector((state: RootState) => state.catalogReducer);

  const item: ItemState = inventories[inventoryId].items[itemId];

  const dispatch = useDispatch();

  const [amountOne, setAmountOne] = useState(
    route.params.amountOnePrediction || route.params.amountOnePrediction == ''
      ? route.params.amountOnePrediction
      : item.amountOne,
  );

  const [amountTwo, setAmountTwo] = useState(
    route.params.amounTwoPrediction || route.params.amounTwoPrediction == ''
      ? route.params.amounTwoPrediction
      : item.amountTwo,
  );

  const [amount, setAmount] = useState<string>(amountOne);

  const [editingAmount, setEditingAmount] = useState<EditingAmountEnum>(
    route.params.selectedAmount || 'one',
  );

  useEffect(() => {
    if (editingAmount === 'one') {
      setAmount(amountOne);
    } else {
      setAmount(amountTwo);
    }
  }, [editingAmount, amountOne, amountTwo]);

  const changeAmount = (newAmount: string) => {
    if (editingAmount === 'one') {
      setAmountOne(newAmount);
    } else {
      setAmountTwo(newAmount);
    }
  };

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

  const checkConfirmed = () => {
    try {
      if (
        evalAndFormat(amountOne) == amountOne &&
        evalAndFormat(amountTwo) == amountTwo
      ) {
        return true;
      } else {
        return false;
      }
    } catch {
      return false;
    }
  };

  useEffect(() => {
    setConfirmed(checkConfirmed());
  }, [editingAmount, amount, amountOne, amountTwo, changeAmount]);

  return (
    <MyBackground>
      <MyTopBar backButton={true} title={''}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              left: 0,
              marginLeft: 6,
            }}>
            <View>
              <MyText
                style={{
                  fontWeight: '900',
                  fontSize: 16,
                  marginVertical: 4,
                }}
                text={item.name}
              />
              <MyText
                style={{
                  fontWeight: '500',
                  fontSize: 14,
                  marginVertical: 4,
                }}
                text={item.productId}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 2,
                }}>
                <View
                  style={{
                    alignSelf: 'flex-start',

                    paddingVertical: 4,
                    paddingHorizontal: 10,
                    backgroundColor: styles.colors.paletteSix,

                    borderRadius: 8,

                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <MyText
                    style={{
                      fontWeight: '500',
                      fontSize: 13.5,
                    }}
                    text={products[item.productId].unit}
                  />
                </View>

                <MyCategoryLabel
                  category={products[item.productId].category}
                  style={{
                    alignSelf: 'flex-start',
                  }}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              position: 'absolute',
              right: 0,
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 10,
            }}>
            <MyPressableIcon
              style={{ position: 'absolute', marginHorizontal: 20, right: 0 }}
              onPress={() =>
                navigation.navigate('CatalogEditProduct', {
                  productId: item.productId,
                })
              }
              set="MaterialCommunityIcons"
              name="square-edit-outline"
            />
          </View>
        </View>
      </MyTopBar>

      {products[item.productId].amountType === 'double' ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Pressable
            style={{
              paddingVertical: 5,
              paddingHorizontal: 30,
              backgroundColor: styles.colors.paletteSix,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 8,
              marginHorizontal: 4,
              borderColor:
                editingAmount === 'two'
                  ? styles.colors.paletteTextMain
                  : styles.colors.palettePrimarColdStorage,
              borderWidth: editingAmount === 'two' ? 4 : 2,
              marginVertical: 6,
              width: '45%',
            }}
            onPress={() => {
              if (confirmed) {
                setEditingAmount('two');
              }
            }}>
            <MyText
              style={{
                fontWeight: '500',
                fontSize: 24,
              }}
              text={
                editingAmount === 'two'
                  ? confirmed
                    ? amountTwo
                    : displaySecondNumber()
                  : amountTwo
              }
            />
          </Pressable>
          <Pressable
            style={{
              paddingVertical: 5,
              paddingHorizontal: 30,
              backgroundColor: styles.colors.paletteSix,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 8,
              marginHorizontal: 4,
              borderColor:
                editingAmount === 'one'
                  ? styles.colors.paletteTextMain
                  : styles.colors.palettePrimarDryStorage,
              borderWidth: editingAmount === 'one' ? 4 : 2,
              marginVertical: 6,
              width: '45%',
            }}
            onPress={() => {
              if (confirmed) {
                setEditingAmount('one');
              }
            }}>
            <MyText
              style={{
                fontWeight: '500',
                fontSize: 24,
              }}
              text={
                editingAmount === 'one'
                  ? confirmed
                    ? amountOne
                    : displaySecondNumber()
                  : amountOne
              }
            />
          </Pressable>
        </View>
      ) : null}
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical:
            products[item.productId].amountType === 'double' ? 0 : 20,
        }}>
        <View
          style={{
            paddingVertical: 5,
            paddingHorizontal: 90,
            backgroundColor: styles.colors.paletteSix,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 8,
            marginHorizontal: 4,
            width: '92%',
          }}>
          <MyText
            style={{
              fontWeight: '500',
              fontSize: 24,
            }}
            text={checkConfirmed() ? eval(`${amountOne} + ${amountTwo}`) : ''}
          />
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 24,
          width: '100%',
        }}>
        <View
          style={{
            alignItems: 'flex-end',
            justifyContent: 'center',
            marginTop: 2,
            marginRight: 24,
          }}>
          <MyText
            style={{ fontWeight: '500', fontSize: 56 }}
            text={displayFirstNumber()}
          />
          <MyText
            style={{ fontWeight: '500', fontSize: 34 }}
            text={displaySecondNumber()}
          />
        </View>

        <View
          style={{
            maxWidth: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <AmountBaseButton
            titleOrIcon={'1'}
            onPress={() => {
              changeAmount(`${amount}1`);
            }}
          />
          <AmountBaseButton
            titleOrIcon={'2'}
            onPress={() => {
              changeAmount(`${amount}2`);
            }}
          />
          <AmountBaseButton
            titleOrIcon={'3'}
            onPress={() => {
              changeAmount(`${amount}3`);
            }}
          />
          <AmountBaseButton
            titleOrIcon={'÷'}
            style={{ backgroundColor: styles.colors.paletteSix }}
            onPress={() => {
              changeAmount(`${amount}/`);
            }}
          />
        </View>
        <View
          style={{
            maxWidth: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <AmountBaseButton
            titleOrIcon={'4'}
            onPress={() => {
              changeAmount(`${amount}4`);
            }}
          />
          <AmountBaseButton
            titleOrIcon={'5'}
            onPress={() => {
              changeAmount(`${amount}5`);
            }}
          />
          <AmountBaseButton
            titleOrIcon={'6'}
            onPress={() => {
              changeAmount(`${amount}6`);
            }}
          />
          <AmountBaseButton
            titleOrIcon={'×'}
            style={{ backgroundColor: styles.colors.paletteSix }}
            onPress={() => {
              changeAmount(`${amount}*`);
            }}
          />
        </View>
        <View
          style={{
            maxWidth: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <AmountBaseButton
            titleOrIcon={'7'}
            onPress={() => {
              changeAmount(`${amount}7`);
            }}
          />
          <AmountBaseButton
            titleOrIcon={'8'}
            onPress={() => {
              changeAmount(`${amount}8`);
            }}
          />
          <AmountBaseButton
            titleOrIcon={'9'}
            onPress={() => {
              changeAmount(`${amount}9`);
            }}
          />
          <AmountBaseButton
            titleOrIcon={'+'}
            style={{ backgroundColor: styles.colors.paletteSix }}
            onPress={() => {
              changeAmount(`${amount}+`);
            }}
          />
        </View>
        <View
          style={{
            maxWidth: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <AmountBaseButton
            titleOrIcon={','}
            onPress={() => {
              changeAmount(`${amount}.`);
            }}
          />
          <AmountBaseButton
            titleOrIcon={'0'}
            onPress={() => {
              changeAmount(`${amount}0`);
            }}
          />
          <AmountBaseButton
            titleOrIcon={'⌫'}
            onPress={() => {
              changeAmount(amount.slice(0, -1));
            }}
          />
          <AmountBaseButton
            titleOrIcon={'-'}
            style={{ backgroundColor: styles.colors.paletteSix }}
            onPress={() => {
              changeAmount(`${amount}-`);
            }}
          />
        </View>

        <View
          style={{
            maxWidth: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <AmountBaseButton
            titleOrIcon={
              confirmed
                ? {
                    set: 'MaterialCommunityIcons',
                    name: 'check-bold',
                    size: 36,
                    color: styles.colors.palettePrimaryGreen,
                  }
                : '='
            }
            style={{
              backgroundColor: styles.colors.paletteSix,
              width: 313,
              height: 72,
              borderRadius: 24,
              justifyContent: 'center',
              alignItems: 'center',
              margin: 5,
            }}
            onPress={() => {
              try {
                if (amountOne != '' && amountTwo != '') {
                  setAmountOne(evalAndFormat(amountOne));
                  setAmountTwo(evalAndFormat(amountTwo));
                  if (checkConfirmed()) {
                    dispatch(
                      inventoryItemSetAmount({
                        inventoryId,
                        itemId,
                        newAmountOne: amountOne,
                        newAmountTwo: amountTwo,
                      }),
                    );
                    navigation.goBack();
                  } else {
                    setConfirmed(true);
                  }
                }
              } catch {}
            }}
          />
        </View>
        {/* <TouchableOpacity
          style={{
            width: 313,
            height: 72,
            borderRadius: 24,
            backgroundColor: styles.colors.paletteSix,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 5,
          }}
          onPress={() => {
            try {
              if (amountOne != '' && amountTwo != '') {
                setAmountOne(evalAndFormat(amountOne));
                setAmountTwo(evalAndFormat(amountTwo));
                if (confirmed) {
                  dispatch(
                    inventoryItemSetAmount({
                      inventoryId,
                      itemId,
                      newAmountOne: amountOne,
                      newAmountTwo: amountTwo,
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
        </TouchableOpacity> */}
      </View>

      {/* </View> */}

      {/* <View style={{ position: 'absolute', top: 20, left: 20, width: '100%' }}>
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
      </View> */}
    </MyBackground>
  );
};

export default AmountInputScreen;
