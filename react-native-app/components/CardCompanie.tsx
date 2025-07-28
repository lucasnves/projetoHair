import { Company } from "@/app/interfaces";
import { getCompanys } from "@/services/store";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useThemeColorByName } from "@/hooks/useThemeColorByName";
import { IconText } from "./IconText";

export function CardCompanie() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [likeCompany, setLikeCompany] = useState("heart-o");
  const colorIcon = useThemeColorByName("text");
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
              disabled={company.is_open ? false : true}
              onPress={() => handleClick(company.id)}
              activeOpacity={0.6}
            >
              <ThemedView
                style={[styles.cardMain, {opacity: company.is_open ? 1 : 0.5 }]}
                colorName="background_secondary"
              >
                <ThemedView
                  colorName="background_secondary"
                  style={styles.cardCompanie}
                >
                  <ThemedView colorName="tintSecondary" style={styles.image}>
                    <Ionicons size={30} name="image-outline" />
                  </ThemedView>
                  <ThemedView
                    style={styles.cardInfos}
                    colorName="background_secondary"
                  >
                    <ThemedText type="extraLargeBold" numberOfLines={1}>
                      {company.name}
                    </ThemedText>
                    <ThemedView
                      style={styles.cardInfosLadoALado}
                      colorName="background_secondary"
                    >
                      <IconText
                        text={"2.5"}
                        textSize="mediumBold"
                        icon={"Ionicons"}
                        iconName={"star"}
                        iconSize={13}
                        colorName="pending"
                      />
                      <IconText
                        text={company.phone_number}
                        textSize="medium"
                        icon={"Foundation"}
                        iconName={"telephone"}
                        iconSize={14}
                      />
                    </ThemedView>
                    <ThemedText type="medium">{company.location}</ThemedText>
                  </ThemedView>
                </ThemedView>
                <ThemedView
                  colorName="background_secondary"
                  style={styles.cardLike}
                >
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => handleClickLike()}
                  >
                    <FontAwesome
                      size={18}
                      name={likeCompany}
                      color={likeCompany == "heart-o" ? colorIcon : "red"}
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
  cardMain: {
    borderRadius: 8,
    padding: 6,
    marginBottom: 8,
    flexDirection: "row",
  },
  cardCompanie: {
    flexDirection: "row",
    flex: 1,
  },
  image: {
    width: 70,
    height: 90,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
    borderRadius: 4,
  },
  cardInfos: {
    flexDirection: "column",
    flex: 1,
    gap: 5,
  },
  cardInfosLadoALado: {
    flexDirection: "row",
    gap: 10,
  },
  cardLike: {
    justifyContent: "center",
    padding: 5,
    marginLeft: 8,
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
