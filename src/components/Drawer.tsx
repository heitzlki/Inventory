import React, { useCallback, createContext, useEffect } from 'react';

import { Dimensions, Pressable, StyleSheet, Text } from 'react-native';
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
  withTiming,
  Easing,
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

export type DrawerState = {
  activate: () => void;
  active: SharedValue<boolean>;
};

export const DrawerContext = createContext<DrawerState>({
  activate: () => {},
  active: { value: false },
});

export type DrawerRefProps = {
  activate: () => void;
};

type DrawerProps = {
  children?: React.ReactNode;
};

import { RootStackScreenProps, RootStackParamList } from 'navigation/types';
import { activate } from 'store/drawer';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

const DrawerRoute = ({
  action,
  title,
}: {
  action?: () => void;
  title: string;
}) => {
  return (
    <Pressable
      style={{
        height: 34,
        width: '95%',
        backgroundColor: '#2f3136',
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
      }}
      onPress={action}>
      <Text
        style={{
          color: '#DCDDDE',
          fontWeight: '500',
          fontSize: 16,
          left: 4,
        }}>
        {title}
      </Text>
    </Pressable>
  );
};

const Drawer = ({ route, navigation }: RootStackScreenProps<'Drawer'>) => {
  const drawer = useSelector((state: RootState) => state.drawerReducer);
  const dispatch = useDispatch();

  const translateX = useSharedValue(0);

  const activeReal = useSharedValue(false);

  const duringAnimation = useSharedValue(false);

  // const fnVal = useSharedValue(navigation.navigate('Home'));

  const closeModal = () => {
    dispatch(activate());

    navigation.goBack();
  };

  const scrollTo = useCallback((destination: number, callback?: () => void) => {
    'worklet';

    activeReal.value = destination <= 0 ? false : true;

    translateX.value = withTiming(destination, { duration: 400 }, callback);
  }, []);

  const activateAnimation = useCallback(() => {
    'worklet';

    if (activeReal.value) {
      activeReal.value = false;

      duringAnimation.value = true;

      scrollTo(0, () => {
        duringAnimation.value = false;

        runOnJS(closeModal)();
        // runOnJS(a)();
        // runOnJS(dispatch)(activate);
        // runOnJS(navigation.navigate)("Home" );
        // navigation.navigate('Home');
      });

      // translateX.value = withSpring(0, { damping: 50 }, () => {
      //   duringAnimation.value = false;
      //   runOnJS(closeModal)();
      // });
    } else {
      scrollTo(MAX_TRANSLATE_X);
    }
  }, []);

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number }
  >({
    onStart: (_, context) => {
      if (!duringAnimation.value) {
        context.x = translateX.value;
      }
    },

    onActive: (event, context) => {
      if (!duringAnimation.value) {
        translateX.value = event.translationX + context.x;
        translateX.value =
          translateX.value >= MAX_TRANSLATE_X
            ? MAX_TRANSLATE_X
            : translateX.value;
      }
    },
    onEnd: () => {
      if (translateX.value < MAX_TRANSLATE_X && !duringAnimation.value) {
        activateAnimation();
      }
    },
  });

  const rDrawerSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
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
        <Animated.View style={[styles.drawerSheetContainer, rDrawerSheetStyle]}>
          <Pressable
            style={{
              height: 34,
              width: '95%',
              backgroundColor: '#2f3136',
              borderTopRightRadius: 8,
              borderBottomRightRadius: 8,
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
            }}
            onPress={() => {
              activateAnimation();
            }}>
            <Text
              style={{
                color: '#DCDDDE',
                fontWeight: '500',
                fontSize: 16,
                left: 4,
              }}>
              Settings
            </Text>
          </Pressable>
          {/* <DrawerRoute
            action={() => {
              activateAnimation(() => {
                navigation.navigate('Home');
              });
            }}
            title={'Home'}
          />
          <DrawerRoute
            action={() => {
              // navigation.navigate('Settings');
              activateAnimation(() => {
                navigation.navigate('Settings');
              });
            }}
            title={'Home'}
          /> */}
        </Animated.View>
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
    backgroundColor: '#36393f',
    right: SCREEN_WIDTH,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    zIndex: 4,
    flex: 1,
    alignItems: 'flex-start',
  },
});

export default Drawer;
