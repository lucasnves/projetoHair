import { Hairdresser } from "@/app/interfaces";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { getCompanyHairdressers } from "@/services/store";

export function CardHairdresser({ company_id }: any) {
  const [hairdressers, setHairdressers] = useState<Hairdresser[]>([]);

  const loadCompanyHairdressers = async () => {
    const hairdressers = await getCompanyHairdressers(Number(company_id));
    setHairdressers(hairdressers);
  };

  useEffect(() => {
    loadCompanyHairdressers();
  }, []);

  return (
    <ThemedView>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {hairdressers.length > 0 ? (
          hairdressers.map((hairdresser, key) => (
            <ThemedView
              key={key}
              style={{
                gap: 5,
                marginRight: 8,
                alignItems: "center",
                width: 90,
              }}
            >
              <ThemedView
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 50,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                colorName="tintSecondary"
              >
                <Ionicons size={25} name="image-outline" />
              </ThemedView>
              <ThemedText type="small" style={{ width: '80%', textAlign: "center" }}>
                {hairdresser.name}
              </ThemedText>
            </ThemedView>
          ))
        ) : (
          <ThemedText>Nenhum cabeleireiro registrado.</ThemedText>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({});
