import { API_BASE_URL } from '@/constants/endpoint';
import axios from 'axios';

export const generateInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});
