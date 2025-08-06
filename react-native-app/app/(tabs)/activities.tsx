import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, FlatList, useColorScheme } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { get_all_appointments_user } from "@/services/store";
import { useCallback, useContext, useState } from "react";
import { AuthContext } from "@/context/GlobalContext";
import { LoadAppointment } from "../interfaces";
import { Colors } from "@/constants/Colors";
import { useFocusEffect } from "expo-router";

export default function Activities() {
  const { user } = useContext(AuthContext);
  const theme = useColorScheme() ?? "light";

  const [appointments, setAppointments] = useState<LoadAppointment[]>([]);

  type Status = {
    label: string;
    icon: string;
  };

  const appointment_status: Record<number, Status> = {
    1: { label: "pending", icon: "time-outline" },
    2: { label: "confirmed", icon: "checkmark-circle-outline" },
    3: { label: "completed", icon: "checkmark" },
    4: { label: "canceled", icon: "close-circle" },
  };

  const load_appointments = async () => {
    const data = await get_all_appointments_user(Number(user?.id));
    setAppointments(data.appointment);
  };

  useFocusEffect(
    useCallback(() => {
      load_appointments();
    }, [])
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons
          size={160}
          name="calendar-outline"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={{ flex: 1, gap: 16 }}>
        <ThemedText type="massiveBold">Agendamentos</ThemedText>
        {appointments && appointments.length > 0 ? (
          <FlatList
            data={appointments}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false}
            nestedScrollEnabled={true}
            renderItem={({ item, index }) => (
              <ThemedView key={index} style={{ marginBottom: 16 }}>
                <ThemedView style={{ gap: 8 }}>
                  <ThemedView
                    style={{
                      // borderWidth: 1.5,
                      borderRadius: 8,
                      // borderColor: Colors[theme].tintSecondary,
                      backgroundColor: Colors[theme].background_secondary,
                      padding: 8,
                      gap: 8,
                    }}
                  >
                    <ThemedText type="extraLargeBold" numberOfLines={1}>
                      {item.company}
                    </ThemedText>
                    <ThemedView
                      style={{
                        flexDirection: "row",
                        flex: 1,
                      }}
                      colorName="background_secondary"
                    >
                      <ThemedText
                        type="medium"
                        numberOfLines={1}
                        style={{ maxWidth: "36%" }}
                      >
                        {item.employee}
                      </ThemedText>
                      <ThemedText
                        type="medium"
                        style={{ maxWidth: "36%" }}
                        numberOfLines={1}
                      >
                        {""} • {item.service}
                      </ThemedText>
                      <ThemedText
                        type="medium"
                        style={{ flex: 1 }}
                        numberOfLines={1}
                      >
                        {""} • R$ {item.price}
                      </ThemedText>
                    </ThemedView>
                    <ThemedView
                      style={{
                        justifyContent: "space-between",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                      colorName="background_secondary"
                    >
                      <ThemedText type="medium">
                        {item.appointment_time}
                      </ThemedText>
                      <ThemedView
                        style={{
                          backgroundColor:
                            Colors[
                              appointment_status[item.status_id]
                                .label as keyof typeof Colors
                            ],
                          padding: 2,
                          borderRadius: 4,
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 4,
                          width: 110,
                          justifyContent: "center",
                        }}
                      >
                        <ThemedText
                          type="mediumBold"
                          style={{ color: "white" }}
                          numberOfLines={1}
                        >
                          {item.status}
                        </ThemedText>
                      </ThemedView>
                    </ThemedView>
                  </ThemedView>
                </ThemedView>
              </ThemedView>
            )}
          />
        ) : (
          <ThemedText>Sem agendamentos ainda.</ThemedText>
        )}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -75,
    left: 10,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
