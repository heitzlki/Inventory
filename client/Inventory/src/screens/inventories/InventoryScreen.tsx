import { useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import type { RootStackScreenProps } from 'navigation/types';

import { useSelector, useDispatch, useStore } from 'react-redux';
import { inventoryItemSetAmount, inventoryItemDelete } from 'store/inventories';
import { RootState } from 'store/index';

import {
  MyBackground,
  MyTopBar,
  MyAddButton,
  MyPressableIcon,
  MyText,
  MyIcon,
} from 'components/custom';

import { useFormatCreateAndShareXlsx } from 'hooks/useFormatCreateShareXlsx';
import { ItemState } from 'store/inventories/state';

const InventoryScreen = ({
  route,
  navigation,
}: RootStackScreenProps<'Inventory'>) => {
  const theme = useSelector((state: RootState) => state.themeReducer);
  const inventoryId = route.params.inventoryId;

  const inventories = useSelector(
    (state: RootState) => state.invetoriesReducer,
  );
  const products = useSelector((state: RootState) => state.catalogReducer);
  const dispatch = useDispatch();

  const formatCreateAndShare = useFormatCreateAndShareXlsx(inventoryId);

  const updateAmount = (
    itemId: string,
    firstAmount: boolean = true,
    operator: string,
    amount: string,
  ) => {
    // let item = inventories[inventoryId].items[itemId];
    let item = store.getState().invetoriesReducer[inventoryId].items[itemId];
    dispatch(
      inventoryItemSetAmount({
        inventoryId,
        itemId,
        newAmountOne: firstAmount
          ? eval(`${item.amountOne} ${operator} ${amount}`).toString()
          : item.amountOne,
        newAmountTwo: !firstAmount
          ? eval(`${item.amountTwo} ${operator} ${amount}`)
          : item.amountTwo,
      }),
    );
  };

  const [intervalId, setIntervalId] = useState<number>(0);

  const store = useStore<RootState>();

  // const handlePressIn = (
  //   itemId: string,
  //   firstAmount: boolean = true,
  //   operator: string,
  //   amount: string,
  // ) => {
  //   updateAmount(itemId, firstAmount, operator, amount);
  //   let startI = 0;
  //   const id = setInterval(() => {
  //     startI >= 8
  //       ? updateAmount(itemId, firstAmount, operator, amount)
  //       : (startI += 1);
  //   }, 125);
  //   setIntervalId(id);
  // };

  // const handlePressOut = () => {
  //   clearInterval(intervalId);
  //   setIntervalId(0);
  // };

  return (
    <MyBackground>
      <MyTopBar backButton={true} title={inventories[inventoryId].name}>
        <MyPressableIcon
          style={{ position: 'absolute', marginHorizontal: 20, right: 0 }}
          onPress={() => formatCreateAndShare()}
          set="MaterialIcons"
          name="ios-share"
        />
      </MyTopBar>
      <FlatList
        contentContainerStyle={{
          alignItems: 'center',
          paddingBottom: 84,
        }}
        data={Object.keys(inventories[inventoryId].items)}
        renderItem={({ item: itemId }) => {
          let item: ItemState = inventories[inventoryId].items[itemId];
          if (products[item.productId].amountType === 'double') {
            return (
              <Pressable
                key={itemId}
                style={{
                  height: 84,
                  minWidth: '95%',
                  backgroundColor: theme.style.colorFour,
                  marginVertical: 4,
                  borderRadius: 8,

                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    marginLeft: 4,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <MyPressableIcon
                    set="MaterialCommunityIcons"
                    name="trash-can-outline"
                    size={24}
                    onPress={() =>
                      dispatch(inventoryItemDelete({ inventoryId, itemId }))
                    }
                  />
                  <View
                    style={{
                      flexDirection: 'column',
                    }}>
                    <View
                      style={{
                        marginLeft: 4,
                        marginVertical: 2,
                      }}>
                      <MyText
                        style={{
                          fontWeight: '500',
                          fontSize: 16,
                        }}
                        text={item.name}
                      />
                    </View>
                    <View
                      style={{
                        marginLeft: 4,
                        marginVertical: 2,
                        backgroundColor: '#02ab8ad6',
                        borderRadius: 4,
                        borderColor: '#27fdd4ff',
                        borderWidth: 2,
                        paddingHorizontal: 4,
                      }}>
                      <MyText
                        style={{
                          fontWeight: '500',
                          fontSize: 13.5,
                        }}
                        text={'Frisch- und TK-Ware (2)'}
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
                  }}>
                  <View
                    style={{
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <MyPressableIcon
                        set="MaterialCommunityIcons"
                        name="plus"
                        size={21}
                        style={{
                          flex: 1,
                          padding: 5,
                          margin: 5,
                          backgroundColor: theme.style.colorFive,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 8,
                        }}
                        onPress={() => updateAmount(itemId, true, '+', '1')}
                        // onPressOut={handlePressOut}
                      />
                      <Pressable
                        style={{
                          flex: 1,
                          paddingVertical: 5,
                          paddingHorizontal: 5,
                          borderColor: '#2ad6ffd6',
                          borderWidth: 2,
                          backgroundColor: theme.style.colorSix,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 8,
                        }}
                        onPress={() => {
                          navigation.navigate('AmountInput', {
                            inventoryId,
                            itemId: itemId,
                          });
                        }}>
                        <MyText
                          style={{
                            fontWeight: '500',
                            fontSize: 16,
                          }}
                          text={item.amountOne}
                        />
                      </Pressable>
                      <MyPressableIcon
                        set="MaterialCommunityIcons"
                        name="minus"
                        size={21}
                        style={{
                          flex: 1,
                          padding: 5,
                          margin: 5,
                          backgroundColor: theme.style.colorFive,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 8,
                        }}
                        onPress={() => updateAmount(itemId, true, '-', '1')}
                        // onPressOut={handlePressOut}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <MyPressableIcon
                        set="MaterialCommunityIcons"
                        name="plus"
                        size={21}
                        style={{
                          flex: 1,
                          padding: 5,
                          margin: 5,
                          backgroundColor: theme.style.colorFive,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 8,
                        }}
                        onPress={() => updateAmount(itemId, false, '+', '1')}
                        // onPressOut={handlePressOut}
                      />
                      <Pressable
                        style={{
                          flex: 1,
                          paddingVertical: 5,
                          paddingHorizontal: 5,
                          borderColor: '#ffd42ad6',
                          borderWidth: 2,
                          backgroundColor: theme.style.colorSix,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 8,
                        }}
                        onPress={() => {
                          navigation.navigate('AmountInput', {
                            inventoryId,
                            itemId,
                          });
                        }}>
                        <MyText
                          style={{
                            fontWeight: '500',
                            fontSize: 16,
                          }}
                          text={item.amountTwo}
                        />
                      </Pressable>
                      <MyPressableIcon
                        set="MaterialCommunityIcons"
                        name="minus"
                        size={21}
                        style={{
                          flex: 1,
                          padding: 5,
                          margin: 5,
                          backgroundColor: theme.style.colorFive,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 8,
                        }}
                        onPress={() => updateAmount(itemId, false, '-', '1')}
                        // onPressOut={handlePressOut}
                      />
                    </View>
                  </View>

                  <View
                    style={{
                      paddingVertical: 5,
                      paddingHorizontal: 5,
                      backgroundColor: theme.style.colorSix,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 8,
                      marginRight: 5,
                      height: 72,
                    }}>
                    <MyText
                      style={{
                        fontWeight: '600',
                        fontSize: 17,
                      }}
                      text={eval(`${item.amountOne} + ${item.amountTwo}`)}
                    />
                  </View>
                </View>
              </Pressable>
            );
          } else if (products[item.productId].amountType === 'single') {
            return (
              <Pressable
                key={itemId}
                style={{
                  height: 50,
                  minWidth: '95%',
                  backgroundColor: '#2f3136',
                  marginVertical: 4,
                  borderRadius: 8,

                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    left: 0,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Pressable
                    style={{ marginLeft: 4 }}
                    onPress={() =>
                      dispatch(inventoryItemDelete({ inventoryId, itemId }))
                    }>
                    <MyIcon
                      set="MaterialCommunityIcons"
                      name="trash-can-outline"
                      size={24}
                      color="#DCDDDE"
                    />
                  </Pressable>
                  <Text
                    style={{
                      color: '#DCDDDE',
                      fontWeight: '500',
                      fontSize: 16,
                      marginLeft: 4,
                    }}>
                    {item.name}
                  </Text>
                </View>
                <View
                  style={{
                    position: 'absolute',
                    right: 0,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Pressable
                    style={{
                      flex: 1,
                      padding: 5,
                      margin: 5,
                      backgroundColor: '#292B2F',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 8,
                    }}
                    onPress={() => updateAmount(itemId, true, '+', '1')}
                    // onPressOut={handlePressOut}
                  >
                    <MyIcon
                      set="MaterialCommunityIcons"
                      name="plus"
                      size={21}
                      color="#DCDDDE"
                    />
                  </Pressable>
                  <Pressable
                    style={{
                      flex: 1,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      backgroundColor: '#202225',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 8,
                    }}
                    onPress={() => {
                      navigation.navigate('AmountInput', {
                        inventoryId,
                        itemId,
                      });
                    }}>
                    <Text
                      style={{
                        color: '#DCDDDE',
                        fontWeight: '500',
                        fontSize: 16,
                      }}>
                      {item.amountOne}
                    </Text>
                  </Pressable>
                  <Pressable
                    style={{
                      flex: 1,
                      padding: 5,
                      margin: 5,
                      backgroundColor: '#292B2F',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 8,
                    }}
                    onPress={() => updateAmount(itemId, true, '-', '1')}
                    // onPressOut={handlePressOut}
                  >
                    <MyIcon
                      set="MaterialCommunityIcons"
                      name="minus"
                      size={21}
                      color="#DCDDDE"
                    />
                  </Pressable>
                </View>
              </Pressable>
            );
          } else {
            return null;
          }
        }}
      />

      <MyAddButton
        onPress={() => navigation.navigate('SearchItem', { inventoryId })}
      />
    </MyBackground>
  );
};

export default InventoryScreen;
