import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { useEffect, useState } from "react";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { getAppointment, getCompany } from "@/services/store";

import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Appointment, Company } from "../interfaces";
import { CardHairdresser } from "@/components/CardHairdresser";
import { IconText } from "@/components/IconText";
import { Colors } from "@/constants/Colors";

import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function HomeScreen() {
  const router = useRouter();
  const { company_id } = useLocalSearchParams();

  const [company, setCompany] = useState<Company>();
  const [appointment, setAppointment] = useState<Appointment>();
  const [closeOpen, setCloseOpen] = useState<boolean>(false);
  const [handleAppointment, setHandleAppointment] = useState<string>("pedding");

  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  }>();
  const [companyCoords, setCompanyCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    loadCompany();
    get_appointment();
    getUserLocation();
  }, []);

  console.log(userLocation);

  const getCoordinatesFromAddress = async (address: string) => {
    try {
      const geocode = await Location.geocodeAsync(address);
      if (geocode.length > 0) {
        return {
          latitude: geocode[0].latitude,
          longitude: geocode[0].longitude,
        };
      }
    } catch (error) {
      console.error("Erro ao geocodificar o endereço:", error);
    }
    return null;
  };

  const getUserLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permissão de localização negada");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const userLoc = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    setUserLocation(userLoc);
  };

  const handleCloseOpen = async () => {
    setCloseOpen(!closeOpen);
  };

  const handleAppointments = async () => {
    console.log("a");
  };

  const get_appointment = async () => {
    const data = await getAppointment(Number(company_id));
    console.log(data);
    setAppointment(data);
  };

  const loadCompany = async () => {
    const company = await getCompany(Number(company_id));
    console.log(company);
    setCompany(company);

    if (company.location) {
      const coords = await getCoordinatesFromAddress(company.location);
      setCompanyCoords(coords);
    }
  };

  type Status = {
    label: string;
    icon: string;
  };

  const appointment_status: Record<number, Status> = {
    1: { label: "pending", icon: "time-outline" },
    2: { label: "completed", icon: "checkmark-circle-outline" },
    3: { label: "accepted", icon: "checkmark" },
    4: { label: "rescheduled", icon: "refresh" },
    5: { label: "canceled", icon: "close-circle" },
  };

  return (
    <SafeAreaView style={styles.main}>
      {company ? (
        <ThemedView>
          <ThemedView style={styles.header}>
            <TouchableOpacity onPress={router.back}>
              <ThemedView colorName="tintTertiary" style={styles.backButton}>
                <Ionicons name="chevron-down" size={25} />
              </ThemedView>
            </TouchableOpacity>
            <TouchableOpacity>
              <ThemedView colorName="tintTertiary" style={styles.like}>
                <FontAwesome size={20} name={"heart-o"} />
              </ThemedView>
            </TouchableOpacity>
          </ThemedView>
          <ScrollView>
            <ThemedView style={styles.container_top}>
              <ThemedText type="hugeBold">{company.name}</ThemedText>
              <ThemedView style={styles.view_top}>
                <ThemedView
                  colorName={company.is_open ? "online" : "offline"}
                  style={styles.openClose}
                >
                  <ThemedText colorName={"white"} type="largeBold">
                    {company.is_open ? "ABERTO" : "FECHADO"}
                  </ThemedText>
                </ThemedView>
                <ThemedView style={styles.like_container}>
                  <Ionicons name="star" size={18} color={Colors.dark.pending} />
                  <ThemedText colorName="pending" type="largeBold">
                    2.3
                  </ThemedText>
                  <ThemedText colorName="tintSecondary" type="mediumBold">
                    (23 avaliações)
                  </ThemedText>
                </ThemedView>
              </ThemedView>
              <ThemedView style={styles.view_top}>
                <IconText
                  text={company.phone_number}
                  textSize="largeBold"
                  icon={"Foundation"}
                  iconName={"telephone"}
                  iconSize={18}
                />
                <IconText
                  text={company.email}
                  textSize="largeBold"
                  icon={"Foundation"}
                  iconName={"mail"}
                  iconSize={18}
                />
              </ThemedView>
              <ThemedText>{company.observation}</ThemedText>
              <ThemedText>{company.location}</ThemedText>

              {companyCoords && userLocation && (
                <View style={styles.mapContainer}>
                  <MapView
                    style={styles.map}
                    initialRegion={{
                      latitude: companyCoords.latitude,
                      longitude: companyCoords.longitude,
                      latitudeDelta: 0.005,
                      longitudeDelta: 0.005,
                    }}
                    showsUserLocation={!!userLocation}
                    showsMyLocationButton={Platform.OS === "android"}
                  >
                    <Marker
                      coordinate={companyCoords}
                      title={company.name}
                      description={company.location}
                    />
                  </MapView>

                  <TouchableOpacity
                    style={styles.expandButton}
                    onPress={() =>
                      router.push({
                        pathname: "/Pages/mapScreen",
                        params: {
                          lat: companyCoords.latitude.toString(),
                          lng: companyCoords.longitude.toString(),
                        },
                      })
                    }
                  >
                    <Ionicons name="expand-outline" size={18} color="white" />
                  </TouchableOpacity>
                </View>
              )}
            </ThemedView>
          </ScrollView>
        </ThemedView>
      ) : (
        <ThemedText>Carregando...</ThemedText>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    marginHorizontal: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
  },
  backButton: {
    padding: 4,
    borderRadius: 20,
  },
  like: {
    padding: 7,
    borderRadius: 20,
  },
  container_top: {
    marginTop: 20,
    gap: 10,
  },
  view_top: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  openClose: {
    padding: 5,
    borderRadius: 5,
  },
  like_container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  mapContainer: {
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
    width: "100%",
    height: 140,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  expandButton: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "black",
    padding: 6,
    borderRadius: 20,
  },
});
