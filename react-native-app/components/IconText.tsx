import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import {
  Entypo,
  Feather,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { ThemedText, ThemedTextProps } from "./ThemedText";
import { useThemeColorByName } from "@/hooks/useThemeColorByName";
import { Colors } from "@/constants/Colors";

const IconMap = {
  Ionicons: Ionicons,
  Foundation: Foundation,
  Feather: Feather,
  MaterialCommunityIcons: MaterialCommunityIcons,
  Entypo: Entypo,
};

export function IconText({
  colorView = "background",
  styleView,
  text,
  textSize = "large",
  icon,
  iconName,
  iconSize = 15,
  colorName = "text",
}: {
  colorView?: keyof typeof Colors.light & keyof typeof Colors.dark;
  styleView?: StyleProp<ViewStyle>;
  text: string;
  textSize?: ThemedTextProps["type"];
  icon: keyof typeof IconMap;
  iconName: any;
  iconSize?: number;
  colorName?: keyof typeof Colors.light & keyof typeof Colors.dark;
}) {
  const colorIcon = useThemeColorByName(colorName);
  const IconComponent = IconMap[icon];

  return (
    <ThemedView style={[styles.main, styleView]} colorName={colorView}>
      {IconComponent ? (
        <IconComponent name={iconName} size={iconSize} color={colorIcon} />
      ) : null}
      <ThemedText colorName={colorName} type={textSize}>
        {text}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
});
