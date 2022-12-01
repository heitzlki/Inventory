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
  runOnJS,
  cancelAnimation,
} from 'react-native-reanimated';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/index';

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

import { RootStackScreenProps } from 'navigation/types';
import { activate } from 'store/drawer';

const Drawer = ({ route, navigation }: RootStackScreenProps<'Drawer'>) => {
  const drawer = useSelector((state: RootState) => state.drawerReducer);
  const dispatch = useDispatch();

  const translateX = useSharedValue(0);

  const activeReal = useSharedValue(false);

  const duringAnimation = useSharedValue(false);

  const closeModal = () => {
    navigation.goBack();
  };

  const activateAnimation = useCallback(() => {
    'worklet';

    if (activeReal.value) {
      activeReal.value = false;

      duringAnimation.value = true;

      translateX.value = withSpring(0, { damping: 50 }, () => {
        duringAnimation.value = false;
        runOnJS(closeModal)();
      });
    } else {
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
        activateAnimation();
      }
    },
  });

  const rDrawerSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  }, []);

  const scrollTo = useCallback((destination: number) => {
    'worklet';

    activeReal.value = destination <= 0 ? false : true;

    translateX.value = withSpring(destination, { damping: 50 });
  }, []);

  const tapGestureEvent =
    useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
      onEnd: () => {
        if (!duringAnimation.value) {
          activateAnimation();
        }
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

  useEffect(() => {
    activateAnimation();
  }, [drawer.active]);

  return (
    <>
      <TapGestureHandler onGestureEvent={tapGestureEvent}>
        <Animated.View
          style={[styles.drawerSheetBackGround, rDrawerSheetBackGroundStyle]}
        />
      </TapGestureHandler>
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View
          style={[
            styles.drawerSheetContainer,
            rDrawerSheetStyle,
          ]}></Animated.View>
      </PanGestureHandler>
    </>
  );
};

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
