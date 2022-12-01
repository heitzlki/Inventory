import { Dimensions, StyleSheet, View } from 'react-native';
import React, { useCallback, useImperativeHandle } from 'react';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  Extrapolate,
} from 'react-native-reanimated';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const MAX_TRANSLATE_Y = -SCREEN_HEIGHT;
const SNAP_MAX_TRANSLATE_Y = -SCREEN_HEIGHT * 0.8;
const SNAP_MIN_TRANSLATE_Y = -SCREEN_HEIGHT * 0.2;
const ACTIVATE_TRANSLATE_Y = -SCREEN_HEIGHT * 0.3;

type BottomSheetProps = {
  children?: React.ReactNode;
};

export type BottomSheetRefProps = {
  activate: () => void;
};

const BottomSheet = React.forwardRef<BottomSheetRefProps, BottomSheetProps>(
  ({ children }, ref) => {
    const translateY = useSharedValue(0);

    const panGestureEvent = useAnimatedGestureHandler<
      PanGestureHandlerGestureEvent,
      { y: number }
    >({
      onStart: (_, context) => {
        context.y = translateY.value;
      },

      onActive: (event, context) => {
        translateY.value = event.translationY + context.y;

        translateY.value =
          translateY.value < -SCREEN_HEIGHT ? -SCREEN_HEIGHT : translateY.value;
      },
      onEnd: () => {
        if (translateY.value < SNAP_MAX_TRANSLATE_Y) {
          translateY.value = withSpring(-SCREEN_HEIGHT, { damping: 50 });
        } else if (translateY.value > SNAP_MIN_TRANSLATE_Y) {
          translateY.value = withSpring(0, { damping: 50 });
        }
      },
    });

    const rBottomSheetStyle = useAnimatedStyle(() => {
      const borderRadius = interpolate(
        translateY.value,
        [SNAP_MAX_TRANSLATE_Y, MAX_TRANSLATE_Y],
        [25, 5],
        Extrapolate.CLAMP,
      );
      return {
        borderRadius,
        transform: [{ translateY: translateY.value }],
      };
    }, []);

    const activate = useCallback(() => {
      'worklet';

      if (translateY.value == 0) {
        translateY.value = withSpring(ACTIVATE_TRANSLATE_Y, { damping: 50 });
      } else {
        translateY.value = withSpring(0, { damping: 50 });
      }
    }, []);

    useImperativeHandle(ref, () => ({ activate }), [activate]);

    return (
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
          <View style={styles.line} />
          {children}
        </Animated.View>
      </PanGestureHandler>
    );
  },
);

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: SCREEN_HEIGHT,
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    top: SCREEN_HEIGHT,
    borderRadius: 25,
    zIndex: 2,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: 'grey',
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 2,
  },
});

export default BottomSheet;
