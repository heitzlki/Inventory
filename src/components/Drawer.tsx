import React, {
  useCallback,
  useRef,
  useImperativeHandle,
  createContext,
  useContext,
  useReducer,
  useEffect,
} from 'react';

import {
  Dimensions,
  StyleSheet,
  Modal,
  View,
  Pressable,
  Text,
} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import type { SharedValue } from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const MAX_TRANSLATE_X = SCREEN_WIDTH - 50;

type DrawerSheetProps = {
  children?: React.ReactNode;
};

export type DrawerSheetRefProps = {
  scrollTo: (destination: number) => void;
  isOpen: boolean;
};

import { GestureHandlerRootView } from 'react-native-gesture-handler';

export type DrawerState = {
  activate: () => void;
  active: SharedValue<boolean>;
};

export const DrawerContext = createContext<DrawerState>({
  activate: () => {},
  active: { value: false },
});

import { useState } from 'react';

export type DrawerRefProps = {
  activate: () => void;
};

type DrawerProps = {
  children?: React.ReactNode;
};

const Drawer = React.forwardRef<DrawerRefProps, DrawerProps>(
  ({ children }, ref) => {
    // const drawerSheetRef = useRef<DrawerSheetRefProps>(null);

    const translateX = useSharedValue(0);
    // const active = useSharedValue(false);

    const active = useSharedValue(false);

    // setIsActive;

    const activate = useCallback(() => {
      console.log('Activate');
      console.log(active.value);

      if (active.value) {
        // setIsActive(false);
        scrollTo(0);
      } else {
        // setIsActive(true);
        scrollTo(MAX_TRANSLATE_X);
      }
    }, []);

    const panGestureEvent = useAnimatedGestureHandler<
      PanGestureHandlerGestureEvent,
      { x: number }
    >({
      onStart: (_, context) => {
        context.x = translateX.value;
      },

      onActive: (event, context) => {
        translateX.value = event.translationX + context.x;
        translateX.value =
          translateX.value >= MAX_TRANSLATE_X
            ? MAX_TRANSLATE_X
            : translateX.value;
      },
      onEnd: () => {
        if (translateX.value < MAX_TRANSLATE_X) {
          translateX.value = withSpring(0, { damping: 50 });
        }
      },
    });

    const rDrawerSheetStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: translateX.value }],
      };
    }, []);

    const scrollTo = (destination: number) => {
      'worklet';
      let a = destination <= 0 ? false : true;
      console.log(a);

      active.value = a;

      console.log(active);

      translateX.value = withSpring(destination, { damping: 50 });
      // drawerContext.setIsActive(active.value);
    };

    const tapGestureEvent =
      useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
        onEnd: () => {
          scrollTo(0);
        },
      });

    const rDrawerSheetBackGroundStyle = useAnimatedStyle(() => {
      const opacity = interpolate(
        translateX.value,
        [0, MAX_TRANSLATE_X],
        [0.0, 0.8],
      );

      const width = translateX.value == 0 ? 0 : '100%';

      return {
        backgroundColor: `rgba(0, 0, 0, ${opacity})`,
        width,
      };
    }, []);

    return (
      <DrawerContext.Provider value={{ active, activate }}>
        {children}

        {/* <Modal visible={isActive} transparent>
          <Pressable
            style={{
              backgroundColor: 'rgba(255,255,255,0.5)',
              flex: 1,
              position: 'absolute',
              top: 0,
              left: 0,
              width: '0%',
              height: '0%',
            }}
            onPress={() => setIsActive(false)}>
                      <GestureHandlerRootView
            style={{
              flex: 1,
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              // backgroundColor: 'red',
            }}>
            <TapGestureHandler onGestureEvent={tapGestureEvent}>
              <Animated.View
                style={[
                  styles.drawerSheetBackGround,
                  rDrawerSheetBackGroundStyle,
                ]}
              />
            </TapGestureHandler>
            <PanGestureHandler onGestureEvent={panGestureEvent}>
              <Animated.View
                style={[styles.drawerSheetContainer, rDrawerSheetStyle]}>
                {children}
              </Animated.View>
            </PanGestureHandler>
          </Pressable>
        </Modal> */}
      </DrawerContext.Provider>
    );
  },
);

const styles = StyleSheet.create({
  drawerSheetBackGround: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 3,
  },
  drawerSheetContainer: {
    position: 'absolute',
    top: 0,
    width: MAX_TRANSLATE_X,
    height: '100%',
    backgroundColor: 'white',
    right: SCREEN_WIDTH,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    zIndex: 4,
  },
});

export default Drawer;
