import { Company } from "@/app/interfaces";
import { getCompanys } from "@/services/store";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

export function CardCompanie() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [likeCompany, setLikeCompany] = useState("heart-o");
  const router = useRouter();

  const handleClickLike = async () => {
    setLikeCompany(likeCompany == "heart" ? "heart-o" : "heart");
  };

  const handleClick = async (id: number) => {
    router.push(`/Pages/company?company_id=${id}`);
  };

  useEffect(() => {
    getCompanies();
    const interval = setInterval(() => {
      getCompanies();
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  const getCompanies = async () => {
    const data = await getCompanys();
    setCompanies(data);
  };

  return (
    <ThemedView>
      {companies ? (
        <FlatList
          data={companies}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={false}
          nestedScrollEnabled={true}
          renderItem={({ item: company, index }) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleClick(company.id)}
              activeOpacity={0.6}
            >
              <ThemedView
                style={styles.cardCompanie}
                colorName="background_secondary"
              >
                <ThemedView
                  colorName="background_secondary"
                  style={styles.cardCompanie}
                >
                  <ThemedView
                    colorName="tintSecondary"
                    style={{
                      width: 70,
                      height: 90,
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: 5,
                      borderRadius: 4,
                    }}
                  >
                    <Ionicons size={30} name="image-outline" />
                  </ThemedView>
                  <ThemedView
                    style={{ flexDirection: "column", flex: 1, gap: 5 }}
                    colorName="background_secondary"
                  >
                    <ThemedText type="extraLargeBold" numberOfLines={1}>
                      {company.name}
                    </ThemedText>
                    <ThemedView
                      style={{ flexDirection: "row", gap: 3 }}
                      colorName="background_secondary"
                    >
                      <ThemedView
                        style={{
                          flexDirection: "row",
                          gap: 3,
                          alignItems: "center",
                        }}
                        colorName="background_secondary"
                      >
                        <Ionicons size={13} name="star" color={"orange"} />
                        <ThemedText type="medium" numberOfLines={1}>
                          2.5 •
                        </ThemedText>
                      </ThemedView>
                      <ThemedText type="medium" numberOfLines={1}>
                        {company.phone_number}
                      </ThemedText>
                    </ThemedView>
                    <ThemedText type="medium" style={{}}>
                      {company.location}
                    </ThemedText>
                  </ThemedView>
                </ThemedView>
                <ThemedView
                  colorName="background_secondary"
                  style={{ justifyContent: "center", padding: 5 }}
                >
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => handleClickLike()}
                  >
                    <FontAwesome
                      size={18}
                      name={likeCompany}
                      color={likeCompany == "heart-o" ? "white" : "red"}
                    />
                  </TouchableOpacity>
                </ThemedView>
              </ThemedView>
            </TouchableOpacity>
          )}
        />
      ) : (
        <ThemedText>Sem nenhuma empresa.</ThemedText>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  main: {
    marginBottom: 10,
  },
  cardCompanie: {
    padding: 8,
    borderRadius: 8,
    flexDirection: "row",
    marginBottom: 8,
    flex: 1,
  },
  titleCardCompanie: {
    fontSize: 16,
    color: "black",
    fontWeight: "700",
  },
  textCardCompanie: {
    fontSize: 13,
    color: "black",
  },
});
