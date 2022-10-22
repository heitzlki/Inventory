import * as React from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import Home from 'screens/home/index';
import type { AppTabParamList } from 'navigation/types';

import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

const Tab = createBottomTabNavigator<AppTabParamList>();

const BottomTab = ({ name }: { name: string }) => {
  return (
    <View>
      <Text style={{ color: '#DCDDDE' }}>{name}</Text>
    </View>
  );
};

const TabBar = (bottomTabBarProps: BottomTabBarProps) => {
  return (
    <View>
      <View
        style={{
          elevation: 1,
          zIndex: 1,
          height: 60,
          backgroundColor: '#292B2F',
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-around',
          borderTopLeftRadius: 45,
          borderTopRightRadius: 45,
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
              <BottomTab name={route.name} />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const AppNavigation = () => {
  return (
    //
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'transparent',
          opacity: 0,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-around',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        },
      }}
      tabBar={(props: BottomTabBarProps) => <TabBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigation;
