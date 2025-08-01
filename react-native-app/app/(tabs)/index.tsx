import { SafeAreaView, StyleSheet, useColorScheme } from "react-native";

import { CardCompanie } from "@/components/CardCompanie";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";

export default function HomeScreen() {
  const theme = useColorScheme() ?? "light";
  return (
    // <ParallaxScrollView
    //   headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
    //   headerImage={
    //     <Ionicons size={120} name="storefront" style={styles.headerImage} />
    //   }
    // >
    <SafeAreaView
      style={[styles.main, { backgroundColor: Colors[theme].background }]}
    >
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="extraLargeBold">Próximos de você</ThemedText>
        <CardCompanie />
      </ThemedView>
    </SafeAreaView>
    // </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  stepContainer: {
    marginHorizontal: 10,
    gap: 8,
    marginTop: 20,
  },
  headerImage: {
    color: "#808080",
    bottom: -20,
    left: -25,
    position: "absolute",
  },
});
