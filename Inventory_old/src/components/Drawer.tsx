import React, { useCallback, createContext, useEffect } from 'react';
import { Dimensions, Pressable, StyleSheet } from 'react-native';
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
  runOnJS,
  withTiming,
} from 'react-native-reanimated';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/index';

import { useStyles } from 'hooks/useStyles';
import { useLang } from 'hooks/useLang';

import MyText from 'components/custom/MyText';
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

const DrawerRoute = ({
  action,
  title,
}: {
  action?: () => void;
  title: string;
}) => {
  const { styles } = useStyles();

  return (
    <Pressable
      style={{
        height: 34,
        width: '95%',
        backgroundColor: styles.colors.paletteFour,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
      }}
      onPress={action}>
      <MyText
        text={title}
        style={{ fontWeight: '500', fontSize: 16, marginLeft: 4 }}
      />
    </Pressable>
  );
};

const Drawer = ({ route, navigation }: RootStackScreenProps<'Drawer'>) => {
  const { styles } = useStyles();
  const { translations } = useLang();
  const drawer = useSelector((state: RootState) => state.drawerReducer);
  const dispatch = useDispatch();

  const translateX = useSharedValue(0);

  const activeReal = useSharedValue(false);

  const duringAnimation = useSharedValue(false);

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

        runOnJS(dispatch)(activate);
        runOnJS(navigation.goBack)();
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

  const handleNav = useCallback((navFn: () => void) => {
    'worklet';
    activeReal.value = false;

    duringAnimation.value = true;

    translateX.value = withTiming(0, { duration: 400 }, () => {
      duringAnimation.value = false;
      runOnJS(dispatch)(activate);
      runOnJS(navigation.goBack)();
      runOnJS(navFn)();
    });
  }, []);

  const rDrawerSheetBackGroundStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [0, MAX_TRANSLATE_X],
      [0.0, 0.8],
    );

    let width = activeReal ? '100%' : '0%';

    return {
      width,
      backgroundColor: `rgba(0, 0, 0, ${opacity})`,
    };
  }, [activeReal]);

  useEffect(() => {
    activateAnimation();
  }, [drawer.active]);

  const drawerSheetStyles = StyleSheet.create({
    background: {
      flex: 1,
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 3,
    },
    container: {
      position: 'absolute',
      top: 0,
      width: MAX_TRANSLATE_X,
      height: '100%',
      backgroundColor: styles.colors.paletteThree,
      right: SCREEN_WIDTH,
      borderTopRightRadius: 25,
      borderBottomRightRadius: 25,
      zIndex: 4,
      flex: 1,
      alignItems: 'flex-start',
    },
  });

  return (
    <>
      <TapGestureHandler onGestureEvent={tapGestureEvent}>
        <Animated.View
          style={[drawerSheetStyles.background, rDrawerSheetBackGroundStyle]}
        />
      </TapGestureHandler>
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View style={[drawerSheetStyles.container, rDrawerSheetStyle]}>
          <DrawerRoute
            action={() => {
              handleNav(() => {});
            }}
            title={translations.home}
          />
          <DrawerRoute
            action={() => {
              handleNav(() => {
                navigation.navigate('Catalog');
              });
            }}
            title={translations.catalog}
          />

          <DrawerRoute
            action={() => {
              handleNav(() => {
                navigation.navigate('Settings');
              });
            }}
            title={translations.settings}
          />
        </Animated.View>
      </PanGestureHandler>
    </>
  );
};

export default Drawer;
