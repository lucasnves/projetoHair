import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
} from "react-native";

import { useEffect, useState } from "react";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import {
  getCompany,
  getCompanyHairdressers,
} from "@/services/store";

import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

interface Company {
  id: number;
  name: string;
  observation: string;
  location: string;
  email: string;
  phone_number: string;
  perfil_photo: string;
  created_at: string;
  updated_at: string;
}

interface Hairdresser {
  id: number;
  name: string;
  email: string;
  user_type: number;
  company_id: number;
  specialty: string;
  phone_number: string;
  created_at: string;
  updated_at: string;
}

export default function HomeScreen() {
  const [company, setCompany] = useState<Company>();
  const [hairdressers, setHairdressers] = useState<Hairdresser>();
  const { company_id } = useLocalSearchParams();
  const router = useRouter()

  const loadCompany = async () => {
    const company = await getCompany(Number(company_id));
    setCompany(company);
  };

  const loadCompanyHairdressers = async () => {
    const hairdressers = await getCompanyHairdressers(Number(company_id));
    setHairdressers(hairdressers);
  };
  
  useEffect(() => {
    loadCompany();
    loadCompanyHairdressers();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Ionicons size={120} name="storefront" style={styles.headerImage} />
      }
      handleBack={() => router.back()}
    >
      <Button title="aa" onPress={() => router.back()} />
        {
          company ? (
            <ThemedView style={{gap: 10}}>
              <ThemedText type="title">{company.name}</ThemedText>
              <ThemedText type="subtitle">{company.location}</ThemedText>
              <ThemedView style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                <ThemedText type="subtitle">{company.phone_number}</ThemedText>
                <ThemedText type="subtitle">{company.email}</ThemedText>
              </ThemedView>
              <ThemedText type="subtitle">{company.observation}</ThemedText>
            </ThemedView>
          )
          : (
            <ThemedView style={styles.titleContainer}>
              <ThemedText type="title">Não encontrado.</ThemedText>
            </ThemedView>
          )
        }
      <ThemedView style={styles.stepContainer}>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
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
