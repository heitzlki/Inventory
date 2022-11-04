import * as React from 'react';
import {
  BottomTabBarProps,
  BottomTabHeaderProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import Inventury from 'screens/inventury/index';
import type { AppTabParamList } from 'navigation/types';

import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Pressable,
} from 'react-native';
import Inventuries from 'screens/Inventuries';
import type { RootStackScreenProps } from './types';

const Tab = createBottomTabNavigator<AppTabParamList>();

const BottomTab = ({
  props,
  index,
}: {
  props: BottomTabBarProps;
  index: number;
}) => {
  let route = props.state.routes[index];

  return (
    <View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <MaterialCommunityIcon name="home" size={30} color="#DCDDDE" />
        <Text style={{ color: '#DCDDDE' }}>{route.name}</Text>
      </View>
      {/* <Text style={{ color: '#DCDDDE', fontSize: 20, fontWeight: '500' }}>
        {name}
      </Text> */}
    </View>
  );
};

const TabBar = (bottomTabBarProps: BottomTabBarProps) => {
  return (
    <View
      style={{
        position: 'absolute',
        // backgroundColor: 'rgba(255, 255, 255, 0)',
        // alignSelf: 'flex-start',
        width: '100%',
        left: 0,
        bottom: 0,
      }}>
      <View
        style={{
          elevation: 1,
          zIndex: 1,
          height: 60,
          backgroundColor: '#292B2F',
          // width: '100%',

          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-around',
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }}>
        {bottomTabBarProps.state.routes.map((route, index: number) => {
          const isFocused = bottomTabBarProps.state.index === index;
          const { options } = bottomTabBarProps.descriptors[route.key];

          const onPress = () => {
            const event = bottomTabBarProps.navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              bottomTabBarProps.navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              testID={options.tabBarTestID}
              accessibilityRole="button">
              <BottomTab props={bottomTabBarProps} index={index} />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const TabHeader = ({ props }: { props: BottomTabHeaderProps }) => (
  <View
    style={{
      position: 'relative',
      width: '100%',
      height: 50,
      backgroundColor: '#292B2F',
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,

      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
    }}>
    <View style={{ marginLeft: 6 }}>
      <Text
        style={{
          color: '#DCDDDE',
          fontSize: 20,
          fontWeight: '500',
        }}>
        {/* Inventur 22 */}
        {props.route.name}
      </Text>
      <Text
        style={{
          color: '#DCDDDE',
          fontSize: 12,
          fontWeight: '500',
        }}>
        22.10.22
      </Text>
    </View>

    <View
      style={{
        marginHorizontal: 6,

        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Pressable
        style={{
          marginHorizontal: 6,

          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#202225',
          borderRadius: 8,
          width: 40,
          height: 40,
        }}
        onPress={() => {}}>
        <AntDesignIcon name="left" size={22} color="#DCDDDE"></AntDesignIcon>
      </Pressable>
      <Pressable
        style={{
          marginHorizontal: 6,

          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#202225',
          borderRadius: 8,
          width: 40,
          height: 40,
        }}
        onPress={() => {}}>
        <AntDesignIcon name="right" size={22} color="#DCDDDE"></AntDesignIcon>
      </Pressable>
      <Pressable
        style={{
          marginHorizontal: 6,

          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#202225',
          borderRadius: 8,
          width: 40,
          height: 40,
        }}
        onPress={() => {}}>
        <MaterialCommunityIcon
          name="share-variant"
          size={22}
          color="#DCDDDE"></MaterialCommunityIcon>
      </Pressable>
      <Pressable
        style={{
          marginHorizontal: 6,

          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#202225',
          borderRadius: 8,
          width: 40,
          height: 40,
        }}
        onPress={() => {}}>
        <MaterialCommunityIcon
          name="check-bold"
          size={20}
          color="#caffbf"></MaterialCommunityIcon>
      </Pressable>
    </View>
  </View>
);
