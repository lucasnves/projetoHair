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
