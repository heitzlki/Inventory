import { Pressable, PressableProps } from 'react-native';

import MyIcon, { IconProps } from 'components/custom/MyIcon';

interface PressableIconProps extends PressableProps, IconProps {}

const MyPressableIcon = ({
  onPress,
  set,
  name,
  size,
  color,
  style,
  ...props
}: PressableIconProps) => {
  return (
    <Pressable style={style} onPress={onPress} {...props}>
      <MyIcon set={set} name={name} color={color} size={size} />
    </Pressable>
  );
};
export default MyPressableIcon;
