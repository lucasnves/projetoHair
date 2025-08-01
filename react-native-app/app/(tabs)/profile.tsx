import { Image, StyleSheet, Platform, Button } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/context/GlobalContext";
import { AppointmentHistory } from "@/components/AppointmentHistory";
import { HelloWave } from "@/components/HelloWave";
import { useContext } from "react";
import { AuthContext } from "@/context/GlobalContext";

export default function HomeScreen() {
  const { signOut } = useAuth();
  const { user } = useContext(AuthContext);

  const handleSignOut = () => {
    signOut();
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Ionicons size={180} name="person" style={styles.headerImage} />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText numberOfLines={1} type="extraMassiveBold">
          Olá, <ThemedText type="massiveBold">{user?.name}</ThemedText>
        </ThemedText>
        <HelloWave />
      </ThemedView>
      <Button title="Log Out" onPress={handleSignOut} />
      <AppointmentHistory />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerImage: {
    color: "#dcdcdc",
    bottom: -45,
    left: 55,
    position: "absolute",
  },
});
