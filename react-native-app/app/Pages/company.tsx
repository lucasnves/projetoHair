import {
  Alert,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";

import { useEffect, useState, useContext } from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { get_company } from "@/services/store";

import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Appointment, Company, CompanyTeam } from "@/app/interfaces";
import { IconText } from "@/components/IconText";
import { Colors } from "@/constants/Colors";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-toast-message";
import { Linking } from "react-native";
import * as Location from "expo-location";
import { CardTeam } from "@/components/CardTeam";
import { AuthContext } from "@/context/GlobalContext";

export default function HomeScreen() {
  const theme = useColorScheme() ?? "light";
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const { company_id } = useLocalSearchParams();

  const [company, setCompany] = useState<Company>();

  const [companyCoords, setCompanyCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    loadCompany();
    // get_appointment();
  }, []);

  const copy_button = async (text: string) => {
    try {
      await Clipboard.setStringAsync(text);
      Toast.show({
        type: "success",
        text1: "Copiado com sucesso.",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Falha ao copiar.",
      });
    }
  };

  const openMapsOptions = (address: string) => {
    const lat = companyCoords?.latitude || 0;
    const lng = companyCoords?.longitude || 0;

    Alert.alert("Opções", "Escolha uma opção:", [
      {
        text: "Google Maps",
        onPress: () =>
          Linking.openURL(
            `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
          ),
      },
      {
        text: "Waze",
        onPress: () =>
          Linking.openURL(`https://waze.com/ul?ll=${lat},${lng}&navigate=yes`),
      },
      ...(Platform.OS === "ios"
        ? [
            {
              text: "Apple Maps",
              onPress: () =>
                Linking.openURL(
                  `http://maps.apple.com/?q=${encodeURIComponent(address)}`
                ),
            },
          ]
        : []),
      {
        text: "Copiar",
        onPress: () => copy_button(address),
      },
      { text: "Cancelar", style: "cancel" },
    ]);
  };

  const schedule = () => {
    router.push(`/Pages/schedule?company_id=${company_id}&user_id=${user?.id}`);
  };

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

  const loadCompany = async () => {
    const company = await get_company(Number(company_id));
    setCompany(company);

    if (company.address) {
      const coords = await getCoordinatesFromAddress(company.address);
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
    <SafeAreaView
      style={[styles.container, { backgroundColor: Colors[theme].background }]}
    >
      {company ? (
        <ThemedView style={styles.main}>
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
                  // colorName={company.active ? "online" : "offline"}
                  style={styles.openClose}
                >
                  <ThemedText type="largeBold">
                    {company.active ? "ABERTO" : "FECHADO"}
                  </ThemedText>
                </ThemedView>
                <ThemedView style={styles.like_container}>
                  <Ionicons name="star" size={18} color={Colors.warning} />
                  <ThemedText type="largeBold">2.3</ThemedText>
                  <ThemedText colorName="tintSecondary" type="mediumBold">
                    (23 avaliações)
                  </ThemedText>
                </ThemedView>
              </ThemedView>
              <ThemedView style={styles.view_top}>
                <TouchableOpacity onPress={() => copy_button(company.phone)}>
                  <IconText
                    text={company.phone}
                    textSize="largeBold"
                    icon={"Foundation"}
                    iconName={"telephone"}
                    iconSize={18}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => copy_button(company.email)}>
                  <IconText
                    text={company.email}
                    textSize="largeBold"
                    icon={"Foundation"}
                    iconName={"mail"}
                    iconSize={18}
                  />
                </TouchableOpacity>
              </ThemedView>
              <TouchableOpacity
                onPress={() => copy_button(company.description)}
              >
                <IconText
                  text={company.description}
                  textSize="large"
                  icon={"Entypo"}
                  iconName={"text"}
                  iconSize={18}
                  styleView={{ alignItems: "flex-start" }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  openMapsOptions(company.address + " - " + company.zip_code)
                }
              >
                <IconText
                  text={company.address + " - " + company.zip_code}
                  textSize="large"
                  icon={"Ionicons"}
                  iconName={"location-sharp"}
                  iconSize={18}
                />
              </TouchableOpacity>
            </ThemedView>
            <ThemedView style={styles.cardTeam}>
              <CardTeam company_id={Number(company_id)} />
            </ThemedView>
            <TouchableOpacity onPress={() => schedule()}>
              <ThemedText>Marcar Horário</ThemedText>
            </TouchableOpacity>
          </ScrollView>
        </ThemedView>
      ) : (
        <ThemedText>Carregando...</ThemedText>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
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
  cardTeam: {
    marginVertical: 20,
    flexDirection: "row",
  },
});
