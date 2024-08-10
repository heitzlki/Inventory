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

  const [amount, setAmount] = useState(
    route.params.amountPrediction || route.params.amountPrediction == ''
      ? route.params.amountPrediction
      : item.amount,
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

  const checkConfirmed = () => {
    try {
      if (evalAndFormat(amount) == amount) {
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
  }, [amount, setAmount]);

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

      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: 20,
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
            text={checkConfirmed() ? eval(`${amount}`) : ''}
          />
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 18,
          width: '100%',
        }}>
        <View
          style={{
            alignItems: 'flex-end',
            justifyContent: 'center',
            marginTop: 0,
            marginRight: 24,
          }}>
          <MyText
            style={{ fontWeight: '500', fontSize: 56, top: 6 }}
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
              setAmount(`${amount}1`);
            }}
          />
          <AmountBaseButton
            titleOrIcon={'2'}
            onPress={() => {
              setAmount(`${amount}2`);
            }}
          />
          <AmountBaseButton
            titleOrIcon={'3'}
            onPress={() => {
              setAmount(`${amount}3`);
            }}
          />
          <AmountBaseButton
            titleOrIcon={'÷'}
            style={{ backgroundColor: styles.colors.paletteSix }}
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
          <AmountBaseButton
            titleOrIcon={'4'}
            onPress={() => {
              setAmount(`${amount}4`);
            }}
          />
          <AmountBaseButton
            titleOrIcon={'5'}
            onPress={() => {
              setAmount(`${amount}5`);
            }}
          />
          <AmountBaseButton
            titleOrIcon={'6'}
            onPress={() => {
              setAmount(`${amount}6`);
            }}
          />
          <AmountBaseButton
            titleOrIcon={'×'}
            style={{ backgroundColor: styles.colors.paletteSix }}
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
          <AmountBaseButton
            titleOrIcon={'7'}
            onPress={() => {
              setAmount(`${amount}7`);
            }}
          />
          <AmountBaseButton
            titleOrIcon={'8'}
            onPress={() => {
              setAmount(`${amount}8`);
            }}
          />
          <AmountBaseButton
            titleOrIcon={'9'}
            onPress={() => {
              setAmount(`${amount}9`);
            }}
          />
          <AmountBaseButton
            titleOrIcon={'+'}
            style={{ backgroundColor: styles.colors.paletteSix }}
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
          <AmountBaseButton
            titleOrIcon={','}
            onPress={() => {
              setAmount(`${amount}.`);
            }}
          />
          <AmountBaseButton
            titleOrIcon={'0'}
            onPress={() => {
              setAmount(`${amount}0`);
            }}
          />
          <AmountBaseButton
            titleOrIcon={'⌫'}
            onPress={() => {
              setAmount(amount.slice(0, -1));
            }}
          />
          <AmountBaseButton
            titleOrIcon={'-'}
            style={{ backgroundColor: styles.colors.paletteSix }}
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
                if (amount != '') {
                  setAmount(evalAndFormat(amount));
                  if (checkConfirmed()) {
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
            }}
          />
        </View>
      </View>
    </MyBackground>
  );
};

export default AmountInputScreen;
