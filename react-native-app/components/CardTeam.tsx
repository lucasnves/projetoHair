import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { CompanyTeam } from "@/app/interfaces";
import { get_company_team } from "@/services/store";

type props = {
  company_id: number;
  choose?: (team: CompanyTeam) => void;
};

export function CardTeam({ company_id, choose }: props) {
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
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <ThemedView style={{ flex: 1, gap: 10, flexDirection: "row" }}>
        {team ? (
          team.map((team, key) => (
            <ThemedView key={key}>
              <TouchableOpacity
                disabled={choose ? false : true}
                onPress={() => choose && choose(team)}
                style={{
                  flex: 1,
                  gap: 5,
                  alignItems: "center",
                }}
              >
                <ThemedView
                  style={{
                    width: 65,
                    height: 70,
                    borderRadius: 10,
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
              </TouchableOpacity>
            </ThemedView>
          ))
        ) : (
          <ThemedText>Nenhum funcionário registrado.</ThemedText>
        )}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
