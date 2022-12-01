import {
  StyleSheet,
  View,
  Text,
  Button,
  FlatList,
  Pressable,
} from 'react-native';
import type { RootStackScreenProps } from 'navigation/types';

import { useSelector, useDispatch } from 'react-redux';
import { itemAdd, itemDelete, itemSetAmount } from 'store/inventuries';
import { RootState } from 'store/index';

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import ScrollPicker from 'react-native-wheel-scrollview-picker';

const amountPickerNumbers = [...Array(100).keys()];

const InventuryScreen = ({
  route,
  navigation,
}: RootStackScreenProps<'Inventury'>) => {
  const inventuryId = route.params.inventuryId;

  const inventuries = useSelector(
    (state: RootState) => state.inveturiesReducer,
  );
  const dispatch = useDispatch();

  return (
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
          // justifyContent: 'center',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', left: 10 }}>
          <Pressable style={{}} onPress={() => navigation.goBack()}>
            <MaterialCommunityIcon
              name="keyboard-backspace"
              size={26}
              color="#DCDDDE"
            />
          </Pressable>
          <Text
            style={{
              color: '#DCDDDE',
              fontWeight: '500',
              fontSize: 16,
              left: 4,
            }}>
            {inventuries[inventuryId].name}
          </Text>
        </View>
        <View>{/* <View>Actions (Search, multiselect)</View> */}</View>
      </View>

      <View style={{ flex: 1, paddingTop: 58, justifyContent: 'center' }}>
        {/* <Picker
          style={{ width: 100, height: 150 }}
          pickerData={[...Array(1000).keys()]}
          onValueChange={value => {
            console.log(value);
          }}
        /> */}

        {/* <Picker
          style={{ width: 150, height: 180 }}
          lineColor="#000000" //to set top and bottom line color (Without gradients)
          lineGradientColorFrom="#008000" //to set top and bottom starting gradient line color
          lineGradientColorTo="#FF5733" //to set top and bottom ending gradient
          // selectedValue={selectedItem}
          itemStyle={{ color: 'black', fontSize: 26 }}
          onValueChange={index => console.log(index)}>
          {[...Array(100).keys()].map((value, i) => (
            <Picker.Item label={value.toString()} value={i} key={i} />
          ))}
        </Picker> */}

        <FlatList
          contentContainerStyle={{
            alignItems: 'center',
            paddingBottom: 64, // Bottom space for add button
          }}
          data={Object.keys(inventuries[inventuryId].items)}
          renderItem={({ item, index }) => (
            <View
              key={item}
              style={{
                height: 50,
                maxWidth: '95%',
                minWidth: '95%',
                backgroundColor: '#2f3136',
                marginVertical: 4,
                borderRadius: 8,

                flexDirection: 'row',
                alignItems: 'center',
              }}
              // onLongPress={() =>
              // dispatch(itemDelete({ inventuryId, itemId: item }))
              // }
            >
              <View
                style={{
                  left: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#DCDDDE',
                    fontWeight: '500',
                    fontSize: 16,
                    left: 4,
                  }}>
                  {inventuries[inventuryId].items[item].name}
                </Text>
              </View>
              <View style={{ position: 'absolute', right: 50 }}>
                {/* <Pressable>
                  <MaterialCommunityIcon
                    name="dots-vertical"
                    size={28}
                    color="#DCDDDE"
                  />
                </Pressable> */}

                {/* <Text
                  style={{
                    color: '#DCDDDE',
                    fontWeight: '500',
                    fontSize: 16,
                    left: 4,
                  }}>
                  {inventuries[inventuryId].items[item].amount}
                </Text> */}

                <View style={{ height: 48, width: 50 }}>
                  <ScrollPicker
                    dataSource={amountPickerNumbers}
                    selectedIndex={inventuries[inventuryId].items[item].amount}
                    renderItem={(data, index) => {
                      return (
                        <View
                          style={{
                            height: 16,
                            justifyContent: 'center',
                            alignItems: 'center',
                            // backgroundColor: 'red',
                          }}>
                          <Text
                            style={{
                              fontSize: 12,
                              color:
                                inventuries[inventuryId].items[item].amount ==
                                data
                                  ? '#DCDDDE'
                                  : '#dcddde9b',
                            }}>
                            {data}
                          </Text>
                        </View>
                      );
                    }}
                    onValueChange={(data, selectedIndex) =>
                      dispatch(
                        itemSetAmount({
                          inventuryId,
                          itemId: item,
                          newAmount: Number(data),
                        }),
                      )
                    }
                    wrapperHeight={48}
                    // wrapperWidth={150}
                    wrapperColor="#FFFFFF00"
                    itemHeight={16}
                    // highlightColor="#d8d8d8"
                    // highlightBorderWidth={2}
                  />
                </View>
              </View>
            </View>
          )}
        />
      </View>

      <Pressable
        style={{
          position: 'absolute',
          alignSelf: 'flex-end',
          bottom: 20,
          right: 20,
          alignItems: 'center',
          justifyContent: 'center',
          width: 60,
          height: 60,
          borderRadius: 15,
          backgroundColor: '#202225',
        }}
        onPress={() => navigation.navigate('SearchItem', { inventuryId })}>
        <MaterialCommunityIcon name="plus" size={40} color="#DCDDDE" />
      </Pressable>
    </View>
  );
};

export default InventuryScreen;
