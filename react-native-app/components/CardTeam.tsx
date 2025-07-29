import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { CompanyTeam } from "@/app/interfaces";
import { get_company_team } from "@/services/store";

export function CardTeam({ company_id }: any) {
  const [team, setTeam] = useState<CompanyTeam[]>([]);

  const loadCompanyHairdressers = async () => {
    const team = await get_company_team(Number(company_id));
    if (!team.error) {
      setTeam(team.data);
    }
  };

  useEffect(() => {
    loadCompanyHairdressers();
  }, []);

  return (
    <ThemedView style={{ flex: 1 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {team.length > 0 ? (
          team.map((team, key) => (
            <ThemedView
              key={key}
              style={{
                flex: 1,
                gap: 5,
                alignItems: "center",
                width: 80,
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
              <ThemedText
                type="small"
                style={{ width: "80%", textAlign: "center" }}
                numberOfLines={2}
              >
                {team.name}
              </ThemedText>
            </ThemedView>
          ))
        ) : (
          <ThemedText>Nenhum funcionário registrado.</ThemedText>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({});
