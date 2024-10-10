import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import { useContext, useEffect, useState } from "react";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { getCompanys } from "@/services/store";
import { AuthContext } from "@/context/GlobalContext";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

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

export default function HomeScreen() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const { user } = useContext(AuthContext);
  const router = useRouter()

  const getCompanies = async () => {
    const data = await getCompanys();
    setCompanies(data);
  };

  const handleClick = async (id: number) => {
    router.push(`/Pages/company?company_id=${id}`);
  }

  useEffect(() => {
    getCompanies();
    const interval = setInterval(() => {
      getCompanies();
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Ionicons size={120} name="storefront" style={styles.headerImage} />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText numberOfLines={1} type="title">Olá, <ThemedText type="posTitle">{user?.name}</ThemedText></ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Text style={{ fontSize: 20, color: "white" }}> aa</Text>
        <View style={{ gap: 12 }}>
          {companies ? (
            companies.map((company, key) => (
              <TouchableOpacity key={key} style={styles.cardCompanie}
                onPress={() => handleClick(company.id)}
              >
                <View
                  style={{
                    width: 70,
                    height: 100,
                    backgroundColor: "red",
                    marginRight: 5,
                    borderRadius: 4,
                  }}
                ></View>
                <View style={{ flexDirection: "column", flex: 1, gap: 5 }}>
                  <Text style={styles.titleCardCompanie} numberOfLines={1}>
                    {company.name}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.textCardCompanie}>
                      {company.location}
                    </Text>
                    <Text style={styles.textCardCompanie}>
                      {company.phone_number}
                    </Text>
                  </View>
                  <Text style={styles.textCardCompanie} numberOfLines={2}>
                    {company.observation}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={{ color: "white" }}>Não tem</Text>
          )}
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    maxWidth: '90%'
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
