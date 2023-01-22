import { Pressable, PressableProps } from 'react-native';

import MyIcon, { IconSet } from 'components/custom/MyIcon';

interface Props extends PressableProps {
  set: IconSet;
  name: string;
  size?: number;
  color?: string;
}

const MyPressableIcon = ({
  onPress,
  set,
  name,
  size,
  color,
  style,
  ...props
}: Props) => {
  return (
    <Pressable style={style} onPress={onPress} {...props}>
      <MyIcon set={set} name={name} color={color} size={size} />
    </Pressable>
  );
};
export default MyPressableIcon;
