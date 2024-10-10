import axios from 'axios';
import Constants from 'expo-constants';

const api = axios.create({
  baseURL: Constants.expoConfig?.extra?.URL_API,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;