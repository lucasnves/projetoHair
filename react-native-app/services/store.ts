// import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appointment } from "@/app/interfaces";
import api from "./api";

export const get_companys = async () => {
  const response = await api
    .get("companies")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("[get_companys]", error);
      return null;
    });

  return response;
};

export const get_company = async (id: number) => {
  const response = await api
    .post("company", {
      company_id: id,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("[get_company]", error);
      return null;
    });

  return response;
};

export const get_company_team = async (id: number) => {
  const response = await api
    .post("company-team", {
      company_id: id,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("[get_company_team]", error);
      return null;
    });
  return response;
};

export const get_company_services = async (id: number) => {
  const response = await api
    .post("get-company-services", {
      company_id: id,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("[get_company_services]", error);
      return null;
    });
  return response;
};

export const create_appointment = async (data: Appointment) => {
  const response = await api
    .post("create-appointment", {
      data,
    })
    .then((response) => {
      console.log(response.data)
      if(!response.data.error) {
        return response.data;
      }
      console.log(response.data.details);
    })
    .catch((error) => {
      console.error("[create_appointment]", error);
      return null;
    });
  return response;
};
