import { Dimensions, StyleSheet, View, ViewStyle } from 'react-native';
import React, { useRef, useCallback, useImperativeHandle } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/index';

import { useStyles } from 'hooks/useStyles';
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
  Easing,
  Value,
  timing,
} from 'react-native-reanimated';
import { AnimateStyle } from 'react-native-reanimated';

// const { height: SCREEN_HEIGHT } = Dimensions.get('window');

type ModalProps = {
  activate: () => void;
  isActive: boolean;

  children?: React.ReactNode;
  backgroundTapAction?: () => void;
  modalBackgroundStyle?: AnimateStyle<ViewStyle>;
  modalContainerStyle?: AnimateStyle<ViewStyle>;
};

// export type ModalRefProps = {
//   activate: () => void;
//   isActive: () => boolean;
// };

const Modal: React.FC<ModalProps> = ({
  activate,
  isActive,
  children,
  backgroundTapAction,
  modalBackgroundStyle,
  modalContainerStyle,
}) => {
  const { styles } = useStyles();

  const modalBackgroundCombinedStyle = StyleSheet.flatten<
    AnimateStyle<ViewStyle>
  >([
    {
      flex: 1,
      // position: 'absolute',
      // top: 0,
      // left: 0,
      // width: '100%',
      // height: '100%',
      zIndex: 3,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalBackgroundStyle,
  ]);

  const modalContainerCombinedStyle = StyleSheet.flatten<
    AnimateStyle<ViewStyle>
  >([
    {
      // height: SCREEN_HEIGHT,
      // width: '100%',
      backgroundColor: styles.colors.paletteThree,
      // position: 'absolute',
      // top: SCREEN_HEIGHT,
      zIndex: 4,

      padding: 20,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 25,
    },
    modalContainerStyle,
  ]);

  // const translateY = useSharedValue(0);
  // const active = useSharedValue(false);
  const opacity = useSharedValue(0);

  // const panGestureEvent = useAnimatedGestureHandler<
  //   PanGestureHandlerGestureEvent,
  //   { y: number }
  // >({
  //   onStart: (_, context) => {
  //     context.y = translateY.value;
  //   },

  //   onActive: (event, context) => {
  //     translateY.value = event.translationY + context.y;

  //     translateY.value =
  //       translateY.value < -SCREEN_HEIGHT ? -SCREEN_HEIGHT : translateY.value;
  //   },
  //   onEnd: () => {
  //     if (translateY.value < SNAP_MAX_TRANSLATE_Y) {
  //       translateY.value = withTiming(-SCREEN_HEIGHT, { duration: 400 });
  //       active.value = true;
  //     } else if (translateY.value > SNAP_MIN_TRANSLATE_Y) {
  //       translateY.value = withTiming(0, { duration: 400 });
  //       active.value = false;
  //     }
  //   },
  // });

  // const rBottomSheetStyle = useAnimatedStyle(() => {
  //   const borderRadius = interpolate(
  //     translateY.value,
  //     [SNAP_MAX_TRANSLATE_Y, MAX_TRANSLATE_Y],
  //     [25, 5],
  //     Extrapolate.CLAMP,
  //   );
  //   return {
  //     borderRadius,
  //     transform: [{ translateY: translateY.value }],
  //   };
  // }, []);

  // const activate = useCallback(() => {
  //   'worklet';

  //   if (translateY.value == 0) {
  //     // translateY.value = withTiming(ACTIVATE_TRANSLATE_Y, { duration: 400 });
  //     active.value = true;
  //   } else {
  //     // translateY.value = withTiming(0, { duration: 400 });
  //     active.value = false;
  //   }
  // }, []);

  // const isActive = useCallback(() => {
  //   return active.value;
  // }, []);

  // useImperativeHandle(ref, () => ({ activate, isActive }), [
  //   activate,
  //   isActive,
  // ]);

  // const tapGestureEvent =
  //   useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
  //     onEnd: () => {
  //       activate();
  //       if (backgroundTapAction) {
  //         runOnJS(backgroundTapAction)();
  //       }
  //     },
  //   });

  // const rBottomSheetBackgroundStyle = useAnimatedStyle(() => {
  //   const opacity = interpolate(
  //     translateY.value,
  //     [0, MAX_TRANSLATE_Y],
  //     [0.0, 0.8],
  //   );

  //   const width = translateY.value == 0 ? 0 : '100%';

  //   return {
  //     backgroundColor: `rgba(0, 0, 0, ${opacity})`,
  //     width,
  //   };
  // }, []);

  return (
    <>
      <TapGestureHandler onGestureEvent={tapGestureEvent}>
        <Animated.View
          style={[
            bottomSheetBackgroundCombinedStyle,
            rBottomSheetBackgroundStyle,
          ]}
        />
      </TapGestureHandler>
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View
          style={[bottomSheetContainerCombinedStyle, rBottomSheetStyle]}>
          {children}
        </Animated.View>
      </PanGestureHandler>
    </>
  );
};

export default Modal;
