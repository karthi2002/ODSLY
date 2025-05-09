import axios from 'axios';
import { BACKEND_URL } from '../config/url';

const api = axios.create({
  baseURL: BACKEND_URL, // or your deployed backend URL
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
