import { Text, type TextProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | "link"
    | "extraSmall"
    | "extraSmallBold"
    | "small"
    | "smallBold"
    | "medium"
    | "mediumBold"
    | "large"
    | "largeBold"
    | "extraLarge"
    | "extraLargeBold"
    | "huge"
    | "hugeBold"
    | "extraHuge"
    | "extraHugeBold"
    | "massive"
    | "massiveBold"
    | "extraMassive"
    | "extraMassiveBold";
    colorName?: keyof typeof Colors.light & keyof typeof Colors.dark;
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "large",
  colorName = "text",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, colorName);

  return (
    <Text
      style={[
        { color },
        type === "link" ? styles.link : undefined,
        type === "extraSmall" ? styles.extraSmall : undefined,
        type === "extraSmallBold" ? styles.extraSmallBold : undefined,
        type === "small" ? styles.small : undefined,
        type === "smallBold" ? styles.smallBold : undefined,
        type === "medium" ? styles.medium : undefined,
        type === "mediumBold" ? styles.mediumBold : undefined,
        type === "large" ? styles.large : undefined,
        type === "largeBold" ? styles.largeBold : undefined,
        type === "extraLarge" ? styles.extraLarge : undefined,
        type === "extraLargeBold" ? styles.extraLargeBold : undefined,
        type === "huge" ? styles.huge : undefined,
        type === "hugeBold" ? styles.hugeBold : undefined,
        type === "extraHuge" ? styles.extraHuge : undefined,
        type === "extraHugeBold" ? styles.extraHugeBold : undefined,
        type === "massive" ? styles.massive : undefined,
        type === "massiveBold" ? styles.massiveBold : undefined,
        type === "extraMassive" ? styles.extraMassive : undefined,
        type === "extraMassiveBold" ? styles.extraMassiveBold : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
  extraSmall: {
    fontSize: 10,
    lineHeight: 12,
  },
  extraSmallBold: {
    fontSize: 10,
    lineHeight: 12,
    fontWeight: "bold",
  },
  small: {
    fontSize: 12,
    lineHeight: 14,
  },
  smallBold: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "bold",
  },
  medium: {
    fontSize: 14,
    lineHeight: 16,
  },
  mediumBold: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "bold",
  },
  large: {
    fontSize: 16,
    lineHeight: 18,
  },
  largeBold: {
    fontSize: 16,
    lineHeight: 18,
    fontWeight: "bold",
  },
  extraLarge: {
    fontSize: 18,
    lineHeight: 20,
  },
  extraLargeBold: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: "bold",
  },
  huge: {
    fontSize: 20,
    lineHeight: 22,
  },
  hugeBold: {
    fontSize: 20,
    lineHeight: 22,
    fontWeight: "bold",
  },
  extraHuge: {
    fontSize: 22,
    lineHeight: 24,
  },
  extraHugeBold: {
    fontSize: 22,
    lineHeight: 24,
    fontWeight: "bold",
  },
  massive: {
    fontSize: 24,
    lineHeight: 26,
  },
  massiveBold: {
    fontSize: 24,
    lineHeight: 26,
    fontWeight: "bold",
  },
  extraMassive: {
    fontSize: 26,
    lineHeight: 28,
  },
  extraMassiveBold: {
    fontSize: 26,
    lineHeight: 28,
    fontWeight: "bold",
  },
});
