import { Dimensions, StyleSheet, View } from 'react-native';
import React, { useCallback, useImperativeHandle } from 'react';
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
  withTiming,
  Extrapolate,
  runOnJS,
} from 'react-native-reanimated';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const MAX_TRANSLATE_Y = -SCREEN_HEIGHT;
const SNAP_MAX_TRANSLATE_Y = -SCREEN_HEIGHT * 0.9;
const SNAP_MIN_TRANSLATE_Y = -SCREEN_HEIGHT * 0.5;
const ACTIVATE_TRANSLATE_Y = -SCREEN_HEIGHT * 0.8;

type BottomSheetProps = {
  children?: React.ReactNode;
  backgroundTapAction?: () => void;
};

export type BottomSheetRefProps = {
  activate: () => void;
  isActive: () => boolean;
};

const BottomSheet = React.forwardRef<BottomSheetRefProps, BottomSheetProps>(
  ({ children, backgroundTapAction }, ref) => {
    const translateY = useSharedValue(0);
    const active = useSharedValue(false);

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
          translateY.value = withTiming(-SCREEN_HEIGHT, { duration: 400 });
          active.value = true;
        } else if (translateY.value > SNAP_MIN_TRANSLATE_Y) {
          translateY.value = withTiming(0, { duration: 400 });
          active.value = false;
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
        translateY.value = withTiming(ACTIVATE_TRANSLATE_Y, { duration: 400 });
        active.value = true;
      } else {
        translateY.value = withTiming(0, { duration: 400 });
        active.value = false;
      }
    }, []);

    const isActive = useCallback(() => {
      return active.value;
    }, []);

    useImperativeHandle(ref, () => ({ activate, isActive }), [
      activate,
      isActive,
    ]);

    const tapGestureEvent =
      useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
        onEnd: () => {
          activate();
          if (backgroundTapAction) {
            runOnJS(backgroundTapAction)();
          }
        },
      });

    const rBottomSheetBackGroundStyle = useAnimatedStyle(() => {
      const opacity = interpolate(
        translateY.value,
        [0, MAX_TRANSLATE_Y],
        [0.0, 0.8],
      );

      const width = translateY.value == 0 ? 0 : '100%';

      return {
        backgroundColor: `rgba(0, 0, 0, ${opacity})`,
        width,
      };
    }, []);

    return (
      <>
        <TapGestureHandler onGestureEvent={tapGestureEvent}>
          <Animated.View
            style={[styles.bottomSheetBackGround, rBottomSheetBackGroundStyle]}
          />
        </TapGestureHandler>
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View
            style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
            <View style={styles.line} />
            {children}
          </Animated.View>
        </PanGestureHandler>
      </>
    );
  },
);

const styles = StyleSheet.create({
  bottomSheetBackGround: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 3,
  },
  bottomSheetContainer: {
    height: SCREEN_HEIGHT,
    width: '100%',
    backgroundColor: '#36393f',
    position: 'absolute',
    top: SCREEN_HEIGHT,
    borderRadius: 25,
    zIndex: 4,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: '#DCDDDE',
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 2,
  },
});

export default BottomSheet;
