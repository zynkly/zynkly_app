import axios from 'axios';

// NOTE:
// - For emulator/device testing, replace `localhost` with your machine's LAN IP
//   e.g. http://192.168.1.5:5000
// - You can also wire this to an env variable (e.g. using react-native-config)
//   if you want different URLs for dev/prod.
const API_BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};

export default api;


