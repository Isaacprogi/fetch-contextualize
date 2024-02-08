import { AxiosInstance,AxiosRequestConfig,AxiosError } from "axios";
import { ReactNode } from "react";

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';

export interface ApiConfig {
  name: string;
  method: HttpMethod
  path?: string;
  extra?: AxiosRequestConfig; 
}

export interface UseFetchParams {
  method: HttpMethod
  path?: string;
  extraConfig?: AxiosRequestConfig; 
  axiosInstance?: AxiosInstance;
  onMount?:boolean;
  dynamicPath?:string;
}



export interface ApiProviderProps {
  children: React.ReactNode;
  apiConfig: ApiConfig[];
  axiosInstance?:AxiosInstance
}

export interface ApiProviderPropsWithChildren extends ApiProviderProps {
  children: ReactNode;
}

export interface FetchDataParams<T extends object = {}> {
  data?: T;
  params?: T;
}

export interface UseApiReturn<T> {
  data: T | null;
  loading: boolean;
  error: Error | AxiosError | null;
  fetchData: (value?: FetchDataParams) => void;
  cancel: () => void; 
}

export interface ConfigFactoryFunction {
  (name: string): ApiConfig
}

export interface ApiContextType {
  configFactory: ConfigFactoryFunction;
}