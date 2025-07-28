import { useLocalSearchParams, useRouter } from "expo-router";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Platform, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MapScreen() {
  const { lat, lng } = useLocalSearchParams();
  const router = useRouter();

  const companyLatitude = parseFloat(lat as string);
  const companyLongitude = parseFloat(lng as string);

  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.warn("Permissão de localização negada.");
          setLoading(false);
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        setLoading(false);
      } catch (error) {
        console.error("Erro ao obter localização:", error);
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFill}
        initialRegion={{
          latitude: companyLatitude,
          longitude: companyLongitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation={!!userLocation}
        showsMyLocationButton={Platform.OS === "android"}
      >
        <Marker
          coordinate={{ latitude: companyLatitude, longitude: companyLongitude }}
          title="Empresa"
          description="Local da empresa"
        />
      </MapView>

      <TouchableOpacity style={styles.backButton} onPress={router.back}>
        <Ionicons name="close" size={22} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: "absolute",
    top: 60,
    right: 20,
    backgroundColor: "black",
    borderRadius: 20,
    padding: 5,
    zIndex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});