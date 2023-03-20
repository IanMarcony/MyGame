import axios from 'axios';

const api = axios.create({
  baseURL: 'http://154.53.35.101:3333',
});

export default api;
