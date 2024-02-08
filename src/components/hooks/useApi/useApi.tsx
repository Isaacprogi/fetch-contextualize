import { useContext } from "react";
import { ApiContext } from "../../context";
import { useFetch } from "../useFetch";
import { UseApiReturn } from "../../utils";

export function useApi<T=any>(
  name: string,
  { onMount = false, dynamicPath }: { onMount?: boolean; dynamicPath?: string } = {}
): UseApiReturn<T> {
  const { configFactory } = useContext(ApiContext);
  const config = configFactory(name);
  
  const { data, error, loading, fetchData, cancel } = useFetch<T>({...config, onMount, dynamicPath });

  return { data, error, loading, fetchData, cancel };
};
