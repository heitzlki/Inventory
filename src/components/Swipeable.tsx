import { Dimensions, StyleSheet, View } from 'react-native';
import React, { useCallback, useImperativeHandle } from 'react';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  runOnJS,
  withTiming,
} from 'react-native-reanimated';

type BottomSheetProps = {
  children?: React.ReactNode;
  childrenBehind?: React.ReactNode;
  activation: number;
};

const Swipeable = ({
  children,
  childrenBehind,
  activation,
}: BottomSheetProps) => {
  const translateX = useSharedValue(0);

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number }
  >({
    onStart: (_, context) => {
      context.x = translateX.value;
    },

    onActive: (event, context) => {
      'worklet';
      translateX.value = event.translationX + context.x;
      console.log(translateX.value);
      translateX.value =
        translateX.value <= -activation ? -activation : translateX.value;
      translateX.value = translateX.value >= 0 ? 0 : translateX.value;

      // if (event.translationX <= -activation) {
      //   console.log('Test');

      //   // runOnJS(action)();

      //   console.log('Test');
      // }
    },
    onEnd: () => {
      if (translateX.value != -activation) {
        translateX.value = withTiming(0, { duration: 400 });
      }
    },
  });

  const rSwipeableStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  }, []);

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View style={[styles.children, rSwipeableStyle]}>
          {children}
        </Animated.View>
      </PanGestureHandler>
      <View style={styles.childrenBehind}>{childrenBehind}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  children: {
    top: 0,
    left: 0,
    zIndex: 1,
  },
  childrenBehind: {
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0,
    // zIndex: 1,
  },
});

export default Swipeable;
