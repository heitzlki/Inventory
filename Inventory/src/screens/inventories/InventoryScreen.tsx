import { useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import type { RootStackScreenProps } from 'navigation/types';

import { useSelector, useDispatch, useStore } from 'react-redux';
import { inventoryItemSetAmount, inventoryItemDelete } from 'store/inventories';
import { RootState } from 'store/index';

import { useStyles } from 'hooks/useStyles';
import {
  MyBackground,
  MyTopBar,
  MyAddButton,
  MyPressableIcon,
  MyText,
  MyIcon,
  MyCategoryLabel,
} from 'components/custom';

import Modal from 'components/Modal';

import { useFormatCreateAndShareXlsx } from 'hooks/useFormatCreateShareXlsx';
import { ItemState } from 'store/inventories/state';

const InventoryScreen = ({
  route,
  navigation,
}: RootStackScreenProps<'Inventory'>) => {
  const { styles } = useStyles();
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

  const store = useStore<RootState>();
  // const [intervalId, setIntervalId] = useState<number>(0);

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

  const [modalActive, setModalActive] = useState<boolean>(false);

  return (
    <MyBackground>
      <MyTopBar backButton={true} title={inventories[inventoryId].name}>
        <MyPressableIcon
          style={{ position: 'absolute', marginHorizontal: 20, right: 0 }}
          onPress={() => {
            // setModalActive(!modalActive);
            console.log('Test');
            formatCreateAndShare();
          }} //formatCreateAndShare()}
          set="MaterialIcons"
          name="ios-share"
        />
      </MyTopBar>
      <Modal
        activate={modalActive}
        onBackgroundTap={() => {
          setModalActive(!modalActive);
        }}
        onReturn={() => {
          setModalActive(!modalActive);
        }}
        modalContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        modalContainerWrapperStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          // zIndex: 2,
        }}>
        <View
          style={{
            width: 100,
            height: 100,
          }}></View>
      </Modal>

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
                  backgroundColor: styles.colors.paletteFour,
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
                    <MyCategoryLabel
                      category={products[item.productId].category}
                      style={{ alignSelf: 'flex-start' }}
                    />
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
                          backgroundColor: styles.colors.paletteFive,
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
                          borderColor: styles.colors.palettePrimarColdStorage,
                          borderWidth: 2,
                          backgroundColor: styles.colors.paletteSix,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 8,
                        }}
                        onPress={() => {
                          navigation.navigate('AmountInput', {
                            inventoryId,
                            itemId: itemId,
                            selectedAmount: 'two',
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
                          backgroundColor: styles.colors.paletteFive,
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
                          backgroundColor: styles.colors.paletteFive,
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
                          borderColor: styles.colors.palettePrimarDryStorage,
                          borderWidth: 2,
                          backgroundColor: styles.colors.paletteSix,
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
                          backgroundColor: styles.colors.paletteFive,
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
                      backgroundColor: styles.colors.paletteSix,
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
                  height: 60,
                  minWidth: '95%',
                  backgroundColor: styles.colors.paletteFour,
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
                    />
                  </Pressable>
                  <View>
                    <MyText
                      style={{
                        fontWeight: '500',
                        fontSize: 16,
                        marginLeft: 6,
                        marginBottom: 2,
                      }}
                      text={item.name}
                    />
                    <MyCategoryLabel
                      category={products[item.productId].category}
                      style={{ alignSelf: 'flex-start' }}
                    />
                  </View>
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
                      backgroundColor: styles.colors.paletteFive,
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
                    />
                  </Pressable>
                  <Pressable
                    style={{
                      flex: 1,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      backgroundColor: styles.colors.paletteSix,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 8,
                      borderWidth: 2,
                      borderColor: styles.colors.palettePrimarDryStorage,
                    }}
                    onPress={() => {
                      navigation.navigate('AmountInput', {
                        inventoryId,
                        itemId,
                        selectedAmount: 'one',
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
                  <Pressable
                    style={{
                      flex: 1,
                      padding: 5,
                      margin: 5,
                      backgroundColor: styles.colors.paletteFive,
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
