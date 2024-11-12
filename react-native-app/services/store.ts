import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";

export const getCompanys = async () => {
  const response = await api
    .get("companies")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("[ERROR COMPANIES]", error);
      return null;
    });

  return response;
};

export const getCompany = async (id: number) => {
  const response = await api
    .post("company", {
      company_id: id,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("[ERROR COMPANY]", error);
      return null;
    });

  return response;
};

export const getCompanyHairdressers = async (id: number) => {
  const response = await api
    .post("company-hairdressers", {
      company_id: id,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("[ERROR COMPANIES HAIRDRESSERS]", error);
      return null;
    });
  return response;
};

export const getAppointment = async (company_id: number) => {
  let response = null;
  const dataUser = await AsyncStorage.getItem("@user");
  if (dataUser) {
    const user = JSON.parse(dataUser);
    if (user) {
      response = await api
        .post("get-appointment", {
          user_id: user.id,
          company_id: company_id
        })
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.error("[ERROR APPOINTMENT]", error);
          return null;
        });
    }
  }
  return response;
};
