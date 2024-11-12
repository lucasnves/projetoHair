import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useEffect, useState } from "react";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { getAppointment, getCompany } from "@/services/store";

import { Foundation, Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Appointment, Company } from "../interfaces";
import { CardHairdresser } from "@/components/CardHairdresser";

export default function HomeScreen() {
  const [company, setCompany] = useState<Company>();
  const [appointment, setAppointment] = useState<Appointment>();
  const [closeOpen, setCloseOpen] = useState<boolean>(false);
  const [handleAppointment, setHandleAppointment] = useState<string>("pedding");
  const { company_id } = useLocalSearchParams();
  const router = useRouter();

  const handleCloseOpen = async () => {
    setCloseOpen(!closeOpen);
  };

  const handleAppointments = async () => {
    // console.log(await getAppointment());
  };

  const get_appointment = async () => {
    const data = await getAppointment(Number(company_id));
    console.log(data)
    setAppointment(data);
  };

  const loadCompany = async () => {
    const company = await getCompany(Number(company_id));
    setCompany(company);
  };

  useEffect(() => {
    loadCompany();
    get_appointment();
  }, []);

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
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Ionicons size={120} name="storefront" style={styles.headerImage} />
      }
      handleBack={() => router.back()}
    >
      {company ? (
        <ThemedView style={{ gap: 10 }}>
          <ThemedView
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 4,
            }}
          >
            <ThemedText type="extraMassiveBold" style={{ flex: 1 }}>
              {company.name}
            </ThemedText>
            <ThemedView
              colorName={closeOpen ? "offline" : "online"}
              style={{ padding: 4, borderRadius: 4 }}
            >
              <TouchableOpacity activeOpacity={1} onPress={handleCloseOpen}>
                <ThemedText type="largeBold" colorName="white">
                  {closeOpen ? "FECHADO" : "ABERTO"}
                </ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>
          <ThemedView
            style={{ justifyContent: "space-between", flexDirection: "row" }}
          >
            <ThemedView style={styles.iconText}>
              <Foundation name="mail" size={18} color={"#fff"} />
              <ThemedText type="large">{company.email}</ThemedText>
            </ThemedView>
            <ThemedView style={styles.iconText}>
              <Foundation name="telephone" size={18} color={"#fff"} />
              <ThemedText type="large">{company.phone_number}</ThemedText>
            </ThemedView>
          </ThemedView>
          <ThemedView style={styles.iconText}>
            <Ionicons name="location-sharp" size={15} color={"#fff"} />
            <ThemedText type="large">{company.location}</ThemedText>
          </ThemedView>
          <ThemedText type="large">{company.observation}</ThemedText>

          {/* MARCAR HORÁRIO */}
          <ThemedView
            colorName="background_secondary"
            style={{
              marginTop: 20,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              padding: 10,
              borderRadius: 8,
            }}
          >
            <ThemedView
              colorName={appointment ? 'rescheduled' : "tint"}
              style={{
                borderRadius: 6,
                flex: 1,
              }}
            >
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleAppointments}
                style={{ height: 40, justifyContent: "center" }}
              >
                <ThemedText type="hugeBold" style={{ textAlign: "center" }}>
                  {appointment && (Number(appointment.status) != 5) ? 'REMARCAR HORÁRIO' : 'MARCAR HORÁRIO'}
                </ThemedText>
              </TouchableOpacity>
            </ThemedView>
            {appointment && (
              <ThemedView
                colorName={
                  appointment_status[appointment.status]?.label || "tint"
                }
                style={{
                  height: 35,
                  justifyContent: "center",
                  paddingHorizontal: 6,
                  borderRadius: 6,
                }}
              >
                <Ionicons
                  name={appointment_status[appointment.status].icon}
                  size={24}
                  color="#FFFFFF"
                />
              </ThemedView>
            )}
          </ThemedView>

          <ThemedView style={{ marginTop: 20, gap: 14 }}>
            <ThemedText type="extraHugeBold">Cabeleleiros</ThemedText>
            <CardHairdresser company_id={Number(company_id)} />
          </ThemedView>
        </ThemedView>
      ) : (
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="largeBold">Não encontrado.</ThemedText>
        </ThemedView>
      )}
      <ThemedView style={styles.stepContainer}></ThemedView>
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
  iconText: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
});
