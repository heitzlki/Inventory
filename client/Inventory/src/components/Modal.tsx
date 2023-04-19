import { useStyles } from 'hooks/useStyles';
import React, { ReactNode, useEffect, useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  BackHandler,
} from 'react-native';
import {
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withDecay,
  withDelay,
  withSpring,
  withTiming,
  Easing,
} from 'react-native-reanimated';

interface ModalProps {
  activate: boolean;
  onBackgroundTap: () => void;
  onReturn: () => void;
  children?: ReactNode;
  modalBackgroundStyle?: StyleProp<ViewStyle>;
  modalContainerStyle?: StyleProp<Animated.AnimateStyle<ViewStyle>>;
  modalContainerWrapperStyle?: StyleProp<ViewStyle>;
}

const Modal: React.FC<ModalProps> = ({
  activate,
  onBackgroundTap,
  onReturn,
  children,
  modalBackgroundStyle,
  modalContainerStyle,
  modalContainerWrapperStyle,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { styles } = useStyles();

  const backgroundAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: isOpen ? '100%' : '0%',
    };
  });

  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(isOpen ? 1 : 0, {
            duration: 100,
            easing: Easing.linear,
          }),
        },
      ],
    };
  });

  const backgroundGestureHandler =
    useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
      onFinish: () => {
        runOnJS(onBackgroundTap)();
      },
    });

  useEffect(() => {
    setIsOpen(activate);
  }, [activate]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (isOpen) {
          onReturn();
          return true;
        } else {
          return false;
        }
      },
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  const modalBackgroundCombinedStyle = StyleSheet.flatten<ViewStyle>([
    {
      flex: 1,
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 3,
      backgroundColor: `rgba(0, 0, 0, ${isOpen ? 0.4 : 0})`,
    },
    modalBackgroundStyle,
  ]);

  const modalContainerCombinedStyle = StyleSheet.flatten<
    Animated.AnimateStyle<ViewStyle>
  >([
    {
      backgroundColor: styles.colors.paletteThree,
      zIndex: 4,
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 25,
    },
    modalContainerStyle,
  ]);

  const wrapperAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: isOpen ? '100%' : withDelay(100, withTiming('0%')),
      height: isOpen ? '100%' : withDelay(100, withTiming('0%')),
    };
  });

  return (
    <Animated.View
      style={[
        { zIndex: 2 },
        StyleSheet.absoluteFill,
        modalContainerWrapperStyle,
        wrapperAnimatedStyle,
      ]}>
      <TapGestureHandler onGestureEvent={backgroundGestureHandler}>
        <Animated.View
          style={[modalBackgroundCombinedStyle, backgroundAnimatedStyle]}
        />
      </TapGestureHandler>

      <TapGestureHandler>
        <Animated.View
          style={[modalContainerCombinedStyle, containerAnimatedStyle]}>
          {children}
        </Animated.View>
      </TapGestureHandler>
    </Animated.View>
  );
};

export default Modal;
