import { API_BASE_URL } from '@/constants/endpoint';
import axios from 'axios';
import { toast } from 'react-toastify';

export const generateInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

generateInstance.interceptors.request.use(config => {
  return config;
});

generateInstance.interceptors.response.use(
  response => {
    console.log(response);
    const responsestatusCode = response.status;
    switch (responsestatusCode) {
      case 200: {
        toast.success(response.data.message);
        break;
      }
      default: {
        toast.error(response.data.message);
      }
    }
    return response;
  },
  error => {
    const responseStatusCode = error.response;
    toast.error('Request Timed Out');
    switch (responseStatusCode.status) {
      case 404: {
        toast.error('URL does not exist on specified resource');
        break;
      }
      case 401: {
        toast.error('User Unauthorized');
        break;
      }
      case 500: {
        toast.error('Technical Server Error');
        break;
      }
      default: {
        toast.error(error.response.data.message);
      }
    }
    if (error.response && error.response.data) {
      console.log(error);
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error.message);
  }
);

class FetchUtilClass {
  getRequest = async (url: string) => {
    return generateInstance.get(url);
  };
  postRequest = async (url: string, data: any) => {
    return generateInstance.post(url, data);
  };
}

const FetchUtils = new FetchUtilClass();
export { FetchUtils };
