import * as React from 'react';
import {
  Button,
  FlatList,
  Text,
  View,
  Pressable,
  Modal,
  requireNativeComponent,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  Keyboard,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Portal } from '@gorhom/portal';
import { FullWindowOverlay } from 'react-native-screens';
import uuid from 'react-native-uuid';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import _, { isInteger } from 'lodash';

import type { RootState } from 'store/index';
import {
  addItem,
  decrement,
  deleteItem,
  increment,
  clearAllItems,
  changeAmount,
  changeUnit,
} from 'store/items/index';
import { unit } from 'store/items/state';

const itemList = [
  { name: 'Cherries', icon: 'fruit-cherries', color: '#ffc6ff' },
  { name: 'Citrus', icon: 'fruit-citrus', color: '#fdffb6' },
  { name: 'Grapes', icon: 'fruit-grapes', color: '#bdb2ff' },
  { name: 'Pineapple', icon: 'fruit-pineapple', color: '#ffd6a5' },
  { name: 'Watermelon', icon: 'fruit-watermelon', color: '#caffbf' },
  { name: 'Cherries2', icon: 'fruit-cherries', color: '#ffc6ff' },
  { name: 'Citrus2', icon: 'fruit-citrus', color: '#fdffb6' },
  { name: 'Grapes2', icon: 'fruit-grapes', color: '#bdb2ff' },
  { name: 'Pineapple2', icon: 'fruit-pineapple', color: '#ffd6a5' },
  { name: 'Watermelon2', icon: 'fruit-watermelon', color: '#caffbf' },
  { name: 'Cherries3', icon: 'fruit-cherries', color: '#ffc6ff' },
  { name: 'Citrus3', icon: 'fruit-citrus', color: '#fdffb6' },
  { name: 'Grapes3', icon: 'fruit-grapes', color: '#bdb2ff' },
  { name: 'Pineapple3', icon: 'fruit-pineapple', color: '#ffd6a5' },
  { name: 'Watermelon3', icon: 'fruit-watermelon', color: '#caffbf' },
  { name: 'Cherries4', icon: 'fruit-cherries', color: '#ffc6ff' },
  { name: 'Citrus4', icon: 'fruit-citrus', color: '#fdffb6' },
  { name: 'Grapes4', icon: 'fruit-grapes', color: '#bdb2ff' },
  { name: 'Pineapple4', icon: 'fruit-pineapple', color: '#ffd6a5' },
  { name: 'Watermelon4', icon: 'fruit-watermelon', color: '#caffbf' },
];

// https://www.crowdbotics.com/blog/add-search-bar-flatlist-react-native-apps

const Inventury = () => {
  const items = useSelector((state: RootState) => state.itemsReducer);
  const dispatch = useDispatch();

  const [keyboardActive, setkeyboardActive] = React.useState(false);

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setkeyboardActive(true),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setkeyboardActive(false),
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  // const [unitPickerVisible, setuUnitPickerVisible] = React.useState(false);
  // const [unitPickerIndex, setUnitPickerIndex] = React.useState<number>(0);

  const [unitPicker, setUnitPicker] = React.useState({
    visible: false,
    index: 0,
    amount: 0,
  });

  // const [newItemPickerVisible, setNewItemPickerVisible] = React.useState(false);

  // const [newAmount, setNewAmount] = React.useState<number>(0);

  const [newItem, setNewItem] = React.useState({
    visible: false,
    data: itemList,
    query: '',
  });

  const handleSearch = (text: string) => {
    const data = _.filter(itemList, item => {
      return contains(item.name, text);
    });

    setNewItem({ ...newItem, data, query: text });
  };

  const contains = (name: string, query: string) => {
    if (name.includes(query)) {
      return true;
    }
    return false;
  };

  return (
    <SafeAreaView style={{}}>
      <StatusBar
        animated={true}
        backgroundColor="#292B2F"
        barStyle={'light-content'}
        showHideTransition={'slide'}
        hidden={false}
      />
      <View
        style={{
          backgroundColor: '#36393F',
          height: '100%',
          paddingTop: 50,
          paddingBottom: 60,
        }}>
        <FlatList
          contentContainerStyle={{
            alignItems: 'center',
            paddingBottom: 84,
          }}
          data={items}
          renderItem={({ item, index, separators }) => (
            <View
              key={item.key}
              style={{
                backgroundColor: '#2F3136',
                height: 48,
                minWidth: '95%',
                // width: '95%',

                marginVertical: 8,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                borderRadius: 10,
              }}>
              <View
                style={{
                  backgroundColor:
                    itemList.find(o => o.name == item.title)?.color ??
                    '#9bf6ff',
                  borderRadius: 10,
                  width: 35,
                  height: 35,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: 5,
                }}>
                <MaterialCommunityIcon
                  name={
                    itemList.find(o => o.name == item.title)?.icon ?? 'atom'
                  }
                  color="#202225"
                  size={20}></MaterialCommunityIcon>
              </View>
              <View
                style={{
                  // backgroundColor: '#292B2F',
                  width: 110,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  paddingLeft: '5%',
                }}>
                <Text style={{ color: '#DCDDDE' }}>{item.title}</Text>
              </View>
              <Pressable
                style={{
                  backgroundColor: '#292B2F',
                  borderRadius: 30,
                  width: 30,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: 5,
                }}
                onPress={() => dispatch(increment({ index }))}>
                <AntDesignIcon
                  name="plus"
                  size={20}
                  color="#caffbf"></AntDesignIcon>
              </Pressable>
              <View
                style={{
                  // backgroundColor: '#292B2F',
                  width: 35,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{ color: '#DCDDDE' }}>{item.amount}</Text>
              </View>
              <View
                style={{
                  // backgroundColor: '#000',
                  width: 25,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}>
                <Text style={{ color: '#DCDDDE' }}>{item.unit}</Text>
              </View>
              <Pressable
                style={{
                  backgroundColor: '#292B2F',
                  borderRadius: 30,
                  width: 30,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: 5,
                }}
                onPress={() =>
                  setUnitPicker({
                    visible: !unitPicker.visible,
                    index,
                    amount: item.amount,
                  })
                }>
                <AntDesignIcon
                  name="swap" // down
                  size={20}
                  color="#dcddde"
                />
              </Pressable>
              <Pressable
                style={{
                  backgroundColor: '#292B2F',
                  borderRadius: 30,
                  width: 30,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: 5,
                }}
                onPress={() => dispatch(decrement({ index }))}>
                <AntDesignIcon
                  name="minus"
                  size={20}
                  color="#ffadad"></AntDesignIcon>
              </Pressable>

              <Pressable
                style={{
                  backgroundColor: '#292B2F',
                  borderRadius: 30,
                  width: 30,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => dispatch(deleteItem({ index }))}>
                <AntDesignIcon
                  name="close"
                  size={20}
                  color="#ff0066"></AntDesignIcon>
              </Pressable>
            </View>
          )}
        />
        <Modal
          visible={unitPicker.visible}
          transparent={true}
          onRequestClose={() => {
            setUnitPicker({ ...unitPicker, visible: !unitPicker.visible });
            dispatch(
              changeAmount({
                index: unitPicker.index,
                amount: unitPicker.amount,
              }),
            );
          }}>
          <Pressable
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#18191caf',
            }}
            onPress={() =>
              setUnitPicker({ ...unitPicker, visible: !unitPicker.visible })
            }>
            <Pressable
              style={{
                position: 'absolute',
                width: 300,
                height: 300,
                backgroundColor: '#18191c',
                alignItems: 'center',
                borderRadius: 15,
              }}>
              <TextInput
                style={{ color: '#DCDDDE' }}
                onChangeText={text =>
                  setUnitPicker({
                    ...unitPicker,
                    amount: isInteger(Number(text)) ? Number(text) : 0,
                  })
                }
                keyboardType="numeric"
                value={(unitPicker.amount ?? 0).toString()}
              />
              <Pressable
                style={{
                  backgroundColor: '#292B2F',
                  borderRadius: 30,
                  width: 50,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 10,
                  borderWidth:
                    items[unitPicker.index]?.unit == unit.kg ? 1.25 : 0,
                  borderColor: '#DCDDDE',
                }}
                onPress={() => {
                  dispatch(
                    changeUnit({ index: unitPicker.index, unit: unit.kg }),
                  );
                  setUnitPicker({
                    ...unitPicker,
                    visible: !unitPicker.visible,
                  });

                  dispatch(
                    changeAmount({
                      index: unitPicker.index,
                      amount: unitPicker.amount,
                    }),
                  );
                }}>
                <Text style={{ color: '#DCDDDE' }}>kg</Text>
              </Pressable>

              <Pressable
                style={{
                  backgroundColor: '#292B2F',
                  borderRadius: 30,
                  width: 50,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 10,
                  borderWidth:
                    items[unitPicker.index]?.unit == unit.g ? 1.25 : 0,
                  borderColor: '#DCDDDE',
                }}
                onPress={() => {
                  dispatch(
                    changeUnit({ index: unitPicker.index, unit: unit.g }),
                  );
                  setUnitPicker({
                    ...unitPicker,
                    visible: !unitPicker.visible,
                  });

                  dispatch(
                    changeAmount({
                      index: unitPicker.index,
                      amount: unitPicker.amount,
                    }),
                  );
                }}>
                <Text style={{ color: '#DCDDDE' }}>g</Text>
              </Pressable>

              <Pressable
                style={{
                  backgroundColor: '#292B2F',
                  borderRadius: 30,
                  width: 50,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 10,
                  borderWidth:
                    items[unitPicker.index]?.unit == unit.piece ? 1.25 : 0,
                  borderColor: '#DCDDDE',
                }}
                onPress={() => {
                  dispatch(
                    changeUnit({ index: unitPicker.index, unit: unit.piece }),
                  );
                  setUnitPicker({
                    ...unitPicker,
                    visible: !unitPicker.visible,
                  });

                  dispatch(
                    changeAmount({
                      index: unitPicker.index,
                      amount: unitPicker.amount,
                    }),
                  );
                }}>
                <Text style={{ color: '#DCDDDE' }}>pcs</Text>
              </Pressable>

              <Pressable
                style={{
                  backgroundColor: '#292B2F',
                  borderRadius: 30,
                  width: 30,
                  maxHeight: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  marginTop: '80%',
                }}
                onPress={() =>
                  setUnitPicker({ ...unitPicker, visible: !unitPicker.visible })
                }>
                <AntDesignIcon
                  name="close"
                  size={20}
                  color="#ff0066"></AntDesignIcon>
              </Pressable>
            </Pressable>
          </Pressable>
        </Modal>

        {/* <Portal hostName="button">
        <FullWindowOverlay> */}
        <View
          style={{ position: 'relative', flexDirection: 'column', flex: 1 }}>
          <Pressable
            style={{
              position: 'absolute',
              alignSelf: 'flex-end',
              bottom: 20,
              right: 10,
              alignItems: 'center',
              justifyContent: 'center',
              width: 64,
              height: 64,
              borderRadius: 15,
              backgroundColor: '#202225',
            }}
            onPress={() =>
              setNewItem({ ...newItem, visible: !newItem.visible })
            }
            onLongPress={() => {
              dispatch(clearAllItems());
            }}>
            <AntDesignIcon
              name="plus"
              size={30}
              color="#DCDDDE"></AntDesignIcon>
          </Pressable>
        </View>

        <Modal
          visible={newItem.visible}
          transparent={true}
          onRequestClose={() =>
            setNewItem({ ...newItem, visible: !newItem.visible })
          }>
          <Pressable
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#18191caf',
            }}
            onPress={() => {
              // if (!keyboardActive || newItem.query == '') {
              setNewItem({
                data: itemList,
                query: '',
                visible: !newItem.visible,
              });
              // }
            }}>
            <Pressable
              style={{
                position: 'absolute',
                width: 300,
                height: 400,
                backgroundColor: '#18191c',
                alignItems: 'center',
                borderRadius: 15,
              }}>
              <View
                style={{
                  backgroundColor: '#292B2F',
                  borderRadius: 10,
                  width: '95%',
                  height: 35,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  margin: 10,
                }}>
                <TextInput
                  style={{
                    color: '#DCDDDE',
                    // backgroundColor: '#000',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 5,
                  }}
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={handleSearch}
                  placeholder="Search"
                  placeholderTextColor="#DCDDDE"
                  value={newItem.query}
                />
                <Pressable
                  style={{
                    backgroundColor: '#202225',
                    borderRadius: 30,
                    width: 30,
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 5,
                  }}
                  onPress={() => {
                    if (!keyboardActive || newItem.query == '') {
                      setNewItem({
                        data: itemList,
                        query: '',
                        visible: !newItem.visible,
                      });
                    } else {
                      setNewItem({ ...newItem, data: itemList, query: '' });
                    }
                  }}>
                  <AntDesignIcon
                    name="close"
                    size={20}
                    color="#DCDDDE"></AntDesignIcon>
                </Pressable>
              </View>
              <FlatList
                data={newItem.data}
                renderItem={({ item, index, separators }) => (
                  <Pressable
                    key={index}
                    style={{
                      backgroundColor: '#2F3136',
                      height: 48,
                      minWidth: '95%',

                      marginVertical: 8,
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      borderRadius: 10,
                    }}
                    onPress={() => {
                      dispatch(
                        addItem({
                          title: item.name,
                          key: uuid.v4().toString(),
                          amount: 0,
                          unit: unit.kg,
                        }),
                      );
                      setNewItem({
                        data: itemList,
                        query: '',
                        visible: !newItem.visible,
                      });
                      setUnitPicker({
                        index: 0,
                        amount: 0,
                        visible: !unitPicker.visible,
                      });
                    }}>
                    <View
                      style={{
                        backgroundColor: item.color ?? '#9bf6ff',
                        borderRadius: 10,
                        width: 35,
                        height: 35,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginHorizontal: 5,
                      }}>
                      <MaterialCommunityIcon
                        name={item.icon ?? 'atom'}
                        color="#202225"
                        size={20}></MaterialCommunityIcon>
                    </View>
                    <View
                      style={{
                        // backgroundColor: '#292B2F',
                        width: 110,
                        height: 30,
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        paddingLeft: '5%',
                      }}>
                      <Text style={{ color: '#DCDDDE' }}>{item.name}</Text>
                    </View>
                  </Pressable>
                )}
              />
              <View style={{ height: 10 }}></View>
            </Pressable>
          </Pressable>
        </Modal>

        {/* </FullWindowOverlay>
      </Portal> */}
      </View>
    </SafeAreaView>
  );
};
export default Inventury;
