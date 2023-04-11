import { View, ViewProps, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from 'store/index';

import { useStyles } from 'hooks/useStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Zocial from 'react-native-vector-icons/Zocial';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

export type IconSet =
  | 'AntDesign'
  | 'Entypo'
  | 'EvilIcons'
  | 'Feather'
  | 'FontAwesome'
  | 'FontAwesome5'
  | 'Fontisto'
  | 'Foundation'
  | 'Ionicons'
  | 'MaterialIcons'
  | 'MaterialCommunityIcons'
  | 'Octicons'
  | 'Zocial'
  | 'SimpleLineIcons';

export interface IconProps {
  set: IconSet;
  name: string;
  size?: number;
  color?: string;
}

const MyIcon = ({ set, name, size, color }: IconProps) => {
  const { styles } = useStyles();
  let icon;
  size = size ?? 26;
  color = color ?? styles.colors.paletteTextMain;

  switch (set) {
    case 'AntDesign':
      icon = <AntDesign name={name} size={size} color={color} />;
      break;
    case 'Entypo':
      icon = <Entypo name={name} size={size} color={color} />;

      break;
    case 'EvilIcons':
      icon = <EvilIcons name={name} size={size} color={color} />;

      break;
    case 'Feather':
      icon = <Feather name={name} size={size} color={color} />;

      break;
    case 'FontAwesome':
      icon = <FontAwesome name={name} size={size} color={color} />;

      break;
    case 'FontAwesome5':
      icon = <FontAwesome5 name={name} size={size} color={color} />;

      break;
    case 'Fontisto':
      icon = <Fontisto name={name} size={size} color={color} />;

      break;
    case 'Foundation':
      icon = <Foundation name={name} size={size} color={color} />;

      break;
    case 'Ionicons':
      icon = <Ionicons name={name} size={size} color={color} />;

      break;
    case 'MaterialIcons':
      icon = <MaterialIcons name={name} size={size} color={color} />;

      break;
    case 'MaterialCommunityIcons':
      icon = <MaterialCommunityIcons name={name} size={size} color={color} />;

      break;
    case 'Octicons':
      icon = <Octicons name={name} size={size} color={color} />;

      break;
    case 'Zocial':
      icon = <Zocial name={name} size={size} color={color} />;

      break;
    case 'SimpleLineIcons':
      icon = <SimpleLineIcons name={name} size={size} color={color} />;

      break;
    default:
      icon = <></>;
  }

  return icon;
};
export default MyIcon;
