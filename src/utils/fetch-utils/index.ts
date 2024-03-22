import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { Token } from '../localStorage/data';

export const generateInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
  headers: {
    Authorization: 'Bearer ' + Token,
  },
});

generateInstance.interceptors.request.use(config => {
  return config;
});

generateInstance.interceptors.response.use(
  (response: AxiosResponse<any, any>) => {
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
  (error: AxiosError) => {
    const responseStatusCode = error.response;
    console.log(error);
    toast.error(error.message);
    switch (responseStatusCode?.status) {
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
        toast.error('Something went wrong !');
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
