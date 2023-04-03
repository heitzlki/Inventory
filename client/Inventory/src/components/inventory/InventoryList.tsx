import React from 'react';
import { FlatList, Pressable, View } from 'react-native';

import { useSelector } from 'react-redux';
import { RootState } from 'store/index';
import { useStyles } from 'hooks/useStyles';

import { BottomSheetRefProps } from 'components/BottomSheet';

import { useNavigation } from '@react-navigation/native';
import MyIcon from 'components/custom/MyIcon';
import MyPressableIcon from 'components/custom/MyPressableIcon';
import MyText from 'components/custom/MyText';

const InventoryList = ({
  bottomSheetRef,
  setBottomSheetInventoryId,
}: {
  bottomSheetRef: React.RefObject<BottomSheetRefProps>;
  setBottomSheetInventoryId: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { styles } = useStyles();
  const inventories = useSelector(
    (state: RootState) => state.invetoriesReducer,
  );

  const navigation = useNavigation();

  return (
    <FlatList
      contentContainerStyle={{
        alignItems: 'center',
        paddingBottom: 80,
      }}
      data={Object.keys(inventories)}
      renderItem={({ item }) => (
        <Pressable
          key={item}
          style={{
            height: 50,
            maxWidth: '95%',
            minWidth: '95%',
            backgroundColor: styles.colors.paletteFour,
            marginVertical: 4,
            borderRadius: 8,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() =>
            navigation.navigate('Inventory', {
              inventoryId: inventories[item].id,
            })
          }>
          <View
            style={{
              left: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <MyIcon
              set="MaterialCommunityIcons"
              name="archive"
              size={24}
              color={styles.colors.palettePrimaryBlue}
            />

            <MyText
              style={{ fontWeight: '500', fontSize: 16, marginLeft: 4 }}
              text={inventories[item].name}
            />
          </View>
          <View style={{ position: 'absolute', right: 0 }}>
            <MyPressableIcon
              onPress={() => {
                bottomSheetRef.current?.activate();

                setBottomSheetInventoryId(item);
              }}
              set="MaterialCommunityIcons"
              name="dots-vertical"
              size={28}
            />
          </View>
        </Pressable>
      )}
    />
  );
};

export default InventoryList;
