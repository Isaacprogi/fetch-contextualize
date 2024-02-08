import { useState, useCallback, useEffect } from 'react';
import axios, { AxiosInstance, AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import { UseFetchParams } from '../../utils';
import { UseApiReturn, FetchDataParams } from '../../utils';

export function useFetch<T = any>({
  method,
  path,
  extraConfig,
  axiosInstance,
  onMount,
  dynamicPath,
}: UseFetchParams): UseApiReturn<T> {
  const effectiveAxios: AxiosInstance = axiosInstance || axios;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | Error | null>(null);


  const [cancel, setCancel] = useState<() => void>(() => () => { });

  const fetchData = useCallback(async (dataOptions: FetchDataParams = {}) => {
    setLoading(true);

    const source = axios.CancelToken.source();
    setCancel(() => () => source.cancel("Operation canceled due to component unmounting or fetchData re-invocation"));

    try {
      const requestConfig: AxiosRequestConfig = {
        method,
        url: dynamicPath || path || '',
        cancelToken: source.token,
        ...(method === 'GET' ? { params: dataOptions.params } : { data: dataOptions.data }),
        ...extraConfig,
      };

      const response: AxiosResponse<T> = await effectiveAxios(requestConfig);
      setData(response.data);
      setError(null);
    } catch (err) {
      if (axios.isCancel(err)) {
        if (process.env.NODE_ENV === 'development') {
          console.log('Request was canceled:', err.message);
        }
      } else if (axios.isAxiosError(err)) {
        setError(err);
      } else {
        setError(new Error('An unexpected error occurred'));
      }
    } finally {
      setLoading(false);
    }
  }, [method, path, dynamicPath, extraConfig, effectiveAxios]);

  useEffect(() => {
    return () => {
      cancel();
    };
  }, [cancel]);


  useEffect(() => {
    if (onMount) {
      fetchData();
    }
  }, [onMount, fetchData]);

  return { data, loading, error, fetchData, cancel };



}