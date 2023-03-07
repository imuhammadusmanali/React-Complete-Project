import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('userProfile')) {
    const auth = JSON.parse(localStorage.getItem('userProfile')).token;
    req.headers.authToken = `${auth}`;
  }
  return req;
});

export default API;
