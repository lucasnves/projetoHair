import { StyleSheet, Text, View } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import { useContext } from "react";
import { CardCompanie } from "@/components/CardCompanie";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { AuthContext } from "@/context/GlobalContext";

import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const { user } = useContext(AuthContext);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Ionicons size={120} name="storefront" style={styles.headerImage} />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText numberOfLines={1} type="extraMassiveBold">
          Olá, <ThemedText type="massiveBold">{user?.name}</ThemedText>
        </ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="extraLargeBold">Empresas</ThemedText>
        <CardCompanie />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    maxWidth: "90%",
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  headerImage: {
    color: "#808080",
    bottom: -20,
    left: -25,
    position: "absolute",
  },
  cardCompanie: {
    backgroundColor: "#efefef",
    padding: 8,
    borderRadius: 8,
    flexDirection: "row",
  },
  textCardCompanie: {
    fontSize: 13,
    color: "black",
  },
  titleCardCompanie: {
    fontSize: 16,
    color: "black",
    fontWeight: "700",
  },
});
