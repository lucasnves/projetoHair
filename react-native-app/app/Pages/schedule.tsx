import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  ScrollView,
  View,
  TextInput,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Calendar } from "react-native-calendars";
import { useEffect, useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import { CardTeam } from "@/components/CardTeam";
import { create_appointment, get_company_services } from "@/services/store";
import { CompanyTeam, Service } from "../interfaces";
import { IconText } from "@/components/IconText";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const mockHours = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
];

export default function Schedule() {
  const { user_id, company_id } = useLocalSearchParams();

  const theme = useColorScheme() ?? "light";

  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];
  today.setDate(today.getDate() + 30);
  const maxDateStr = today.toISOString().split("T")[0];

  const [services, setServices] = useState([]);
  const [timeTable, setTimeTable] = useState<string[]>([]);

  const [selectedEmployee, setSelectedEmployee] = useState<CompanyTeam>();
  const [selectedService, setSelectedService] = useState<Service>();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedDateResume, setSelectedDateResume] = useState<string | null>(
    null
  );
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [textNotes, setTextNotes] = useState<string>();

  const handleDateSelect = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
    get_time_day(day.dateString);
    date_resume(day.dateString);
    setSelectedHour(null);
  };

  const date_resume = (selectDate: string) => {
    const [year, month, dayStr] = selectDate.split("-");
    const date = new Date(Number(year), Number(month) - 1, Number(dayStr));
    const weekday = date.toLocaleDateString("pt-BR", {
      weekday: "long",
    });
    const day = date.getDate();
    const monthName = date.toLocaleDateString("pt-BR", {
      month: "long",
    });
    setSelectedDateResume(
      `${
        weekday.charAt(0).toUpperCase() + weekday.slice(1).replace("-feira", "")
      }, ${day} de ${monthName.toLowerCase()}`
    );
  };

  const check_employee = (data: any) => {
    setSelectedEmployee(data);
  };

  const get_time_day = async (selectDay: string) => {
    setTimeTable(mockHours);
    const now = new Date();
    const [year, month, day] = selectDay.split("-");
    const filtered = mockHours.filter((hour) => {
      const [h, m] = hour.split(":");
      const dateTime = new Date(
        Number(year),
        Number(month) - 1,
        Number(day),
        Number(h),
        Number(m)
      );
      if (selectDay === now.toISOString().split("T")[0]) {
        return dateTime > now;
      }
      return true;
    });
    setTimeTable(filtered);
  };

  const handle_click = async () => {
    const data = {
      company_id: Number(company_id),
      user_id: Number(user_id),
      employee_id: selectedEmployee?.id,
      service_id: selectedService?.id,
      notes: textNotes,
      status_id: 1,
      appointment_time: selectedDate + " " + selectedHour + ":00",
    };

    const response = await create_appointment(data);
    console.log("!!", response);
  };

  const get_services = async () => {
    const data = await get_company_services(Number(company_id));
    setServices(data);
  };

  useEffect(() => {
    get_services();
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: Colors[theme].background }]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <ThemedView style={styles.main}>
          <ThemedView
            style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
          >
            <TouchableOpacity onPress={() => router.back()}>
              <MaterialIcons
                name="arrow-back-ios"
                size={20}
                color={Colors[theme].text}
              />
            </TouchableOpacity>
            <ThemedText type="extraMassiveBold">Agendamento</ThemedText>
          </ThemedView>

          {/* FUNCIONÁRIO */}
          <ThemedView style={styles.themedView}>
            <ThemedText type="hugeBold">Seleciona o funcionário:</ThemedText>
            <CardTeam
              company_id={Number(company_id)}
              choose={(data) => {
                check_employee(data);
              }}
            />
          </ThemedView>

          {/* SERVIÇO */}
          <ThemedView style={styles.themedView}>
            <ThemedText type="hugeBold">Selecione um serviço:</ThemedText>
            {services.map((item: any, key) => (
              <TouchableOpacity
                key={item.id ?? key}
                style={[
                  {
                    flexDirection: "row",
                    gap: 8,
                    alignItems: "center",
                  },
                ]}
                activeOpacity={0.8}
                onPress={() => setSelectedService(item)}
              >
                <View
                  style={{
                    width: 10,
                    height: 10,
                    backgroundColor:
                      selectedService?.id === item.id
                        ? Colors.primary
                        : Colors.disabled,
                    borderRadius: "50%",
                  }}
                ></View>
                <ThemedView
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                    flex: 1,
                  }}
                >
                  <ThemedText>{item.name}</ThemedText>
                  <ThemedText colorName="textSecondary">
                    R$ {item.price}
                  </ThemedText>
                </ThemedView>
              </TouchableOpacity>
            ))}
          </ThemedView>

          {/* DATA */}
          <ThemedView style={styles.themedView}>
            <ThemedText type="hugeBold">Selecione uma data:</ThemedText>
            <Calendar
              onDayPress={handleDateSelect}
              markedDates={
                selectedDate
                  ? {
                      [selectedDate]: {
                        selected: true,
                        selectedColor: Colors.primary,
                      },
                    }
                  : {}
              }
              minDate={todayStr}
              maxDate={maxDateStr}
              hideExtraDays
              theme={{
                calendarBackground: Colors[theme].background,
                textSectionTitleColor: Colors[theme].text,
                todayTextColor: Colors[theme].textSecondary,
                dayTextColor: Colors[theme].text,
                textDisabledColor: Colors[theme].tintHide,
                arrowColor: Colors[theme].text,
                monthTextColor: Colors[theme].text,
                textDayFontWeight: "500",
                textMonthFontWeight: "500",
                textDayHeaderFontWeight: "500",
                textMonthFontSize: 18,
              }}
            />
          </ThemedView>

          {/* HORÁRIO */}
          {selectedDate && (
            <ThemedView style={styles.themedView}>
              <ThemedText type="hugeBold">Horários disponíveis:</ThemedText>
              <ThemedView style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {timeTable.map((item, key) => (
                  <TouchableOpacity
                    key={key}
                    style={[
                      styles.hourItem,
                      selectedHour === item && {
                        backgroundColor: Colors.primary,
                      },
                      {
                        borderColor:
                          selectedHour === item
                            ? Colors.primary
                            : Colors[theme].tintSecondary,
                      },
                    ]}
                    onPress={() => setSelectedHour(item)}
                  >
                    <ThemedText
                      style={{
                        color:
                          selectedHour === item ? "white" : Colors[theme].text,
                        fontWeight: selectedHour === item ? "700" : "400",
                      }}
                    >
                      {item}
                    </ThemedText>
                  </TouchableOpacity>
                ))}
              </ThemedView>
            </ThemedView>
          )}

          {/* OBSERVAÇÃO */}
          <ThemedView style={styles.themedView}>
            <ThemedText type="hugeBold">Observação</ThemedText>
            <TextInput
              placeholder="Observação..."
              placeholderTextColor={Colors[theme].textSecondary}
              onChangeText={(e) => setTextNotes(e)}
              multiline
              style={[
                styles.textInput,
                {
                  borderColor: Colors[theme].tintSecondary,
                  color: Colors[theme].text,
                },
              ]}
            ></TextInput>
          </ThemedView>

          {/* RESUMO - BOTÃO */}
          {selectedEmployee &&
            selectedService &&
            selectedDate &&
            selectedHour && (
              <ThemedView style={{ gap: 32 }}>
                <ThemedView style={styles.themedView}>
                  <ThemedText type="hugeBold">Resumo</ThemedText>
                  <ThemedView
                    colorName="background_secondary"
                    style={[styles.resumeCard, { padding: 10, gap: 4 }]}
                  >
                    <ThemedView
                      colorName="background_secondary"
                      style={{
                        justifyContent: "space-between",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <ThemedText type="largeBold">
                        {selectedDateResume}
                      </ThemedText>
                      <ThemedView
                        style={{
                          backgroundColor: Colors.rescheduled,
                          padding: 4,
                          borderRadius: 4,
                        }}
                      >
                        <ThemedText type="largeBold" style={{ color: "white" }}>
                          {selectedHour}
                        </ThemedText>
                      </ThemedView>
                    </ThemedView>
                    <ThemedView
                      colorName="background_secondary"
                      style={{
                        justifyContent: "space-between",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <ThemedText numberOfLines={1}>
                        {selectedEmployee?.name} • {selectedService?.name}
                      </ThemedText>
                      <ThemedView
                        style={{
                          backgroundColor: Colors.successDark,
                          padding: 4,
                          borderRadius: 4,
                        }}
                      >
                        <ThemedText type="largeBold" style={{ color: "white" }}>
                          R$ {selectedService?.price}
                        </ThemedText>
                      </ThemedView>
                    </ThemedView>
                    <ThemedText type="small">{textNotes}</ThemedText>
                  </ThemedView>
                </ThemedView>

                <TouchableOpacity
                  onPress={() => handle_click()}
                  style={[
                    styles.scheduleButton,
                    { backgroundColor: Colors.primary },
                  ]}
                >
                  <ThemedText type="hugeBold" style={{ color: "white" }}>
                    AGENDAR
                  </ThemedText>
                </TouchableOpacity>
              </ThemedView>
            )}
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  main: { marginHorizontal: 12, marginTop: 8, gap: 28, paddingBottom: 8 },
  themedView: {
    gap: 16,
  },
  hourList: { gap: 10 },
  hourItem: {
    margin: 4,
    padding: 8,
    width: "30%",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 2,
  },
  textInput: {
    borderWidth: 1.6,
    borderRadius: 8,
    padding: 8,
  },
  resumeCard: {
    padding: 4,
    borderRadius: 8,
  },
  scheduleButton: {
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
    marginBottom: 24,
  },
});
