import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';

export function useThemeColorByName(colorName: keyof typeof Colors.light) {
  const theme = useColorScheme() ?? 'light';
  return Colors[theme][colorName];
}