import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { Appointment } from "../app/interfaces";
// import { get_all_appointments_user } from "@/services/store";

export function AppointmentHistory() {
  const [data, setData] = useState<Appointment[]>([]);

  const load = async () => {
    // const data = await get_all_appointments_user();
    // setData(data);
  };

  useEffect(() => {
    // load();
  }, []);

  return (
    <ThemedView style={{ flex: 1, gap: 10 }}>
      {data ? (
        data.map((data, key) => (
          <ThemedView
            style={{ backgroundColor: "blue", borderTopEndRadius: 20, borderTopStartRadius: 20, borderRadius: 8 }}
            key={key}
          >
            <ThemedView key={key} style={styles.card}>
              <ThemedText type="largeBold" numberOfLines={1}>
                {data.company}
              </ThemedText>
              <ThemedText type="medium" numberOfLines={1}>
                {data.employee} - {data.service} - {data.price}
              </ThemedText>
              <ThemedText type="medium" numberOfLines={1} style={styles.bottom}>
                {data.notes}
              </ThemedText>
            </ThemedView>
            <ThemedView
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                backgroundColor: "blue",
                borderRadius: 40,
                paddingHorizontal: 10,
                padding: 2,
              }}
            >
              <ThemedText style={{ color: "white" }} type="mediumBold">
                {data.appointment_time}
              </ThemedText>
              <ThemedText style={{ color: "white" }} type="mediumBold">
                {data.status}
              </ThemedText>
            </ThemedView>
          </ThemedView>
        ))
      ) : (
        <ThemedText>Nenhum histórico.</ThemedText>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    // backgroundColor: "red",
    borderRadius: 8,
    padding: 10,
  },
  bottom: {
    justifyContent: "space-between",
  },
});
