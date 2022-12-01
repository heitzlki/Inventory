import { Dimensions, StyleSheet } from 'react-native';
import React, { useEffect, useImperativeHandle, useContext } from 'react';
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

import { DrawerContext } from 'components/Drawer';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const MAX_TRANSLATE_X = SCREEN_WIDTH - 50;

type DrawerSheetProps = {
  children?: React.ReactNode;
};

export type DrawerSheetRefProps = {
  scrollTo: (destination: number) => void;
  isOpen: boolean;
};

const DrawerSheet = React.forwardRef<DrawerSheetRefProps, DrawerSheetProps>(
  ({ children }, ref) => {
    const drawerContext = useContext(DrawerContext);

    const translateX = useSharedValue(0);
    const active = useSharedValue(false);

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
      active.value = destination <= 0 ? false : true;

      console.log('Agdsgsjidhskjhf');

      translateX.value = withSpring(destination, { damping: 50 });
      // drawerContext.setIsActive(active.value);
    };

    const isOpen = active.value;

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

    useImperativeHandle(ref, () => ({ scrollTo, isOpen }), [scrollTo, isOpen]);

    return (
      <>
        <TapGestureHandler onGestureEvent={tapGestureEvent}>
          <Animated.View
            style={[styles.drawerSheetBackGround, rDrawerSheetBackGroundStyle]}
          />
        </TapGestureHandler>
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View
            style={[styles.drawerSheetContainer, rDrawerSheetStyle]}>
            {children}
          </Animated.View>
        </PanGestureHandler>
      </>
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

export default DrawerSheet;
