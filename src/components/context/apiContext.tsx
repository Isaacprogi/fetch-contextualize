import React, { createContext,useCallback,Context } from 'react';
import { ApiProviderPropsWithChildren,ApiContextType } from '../utils';

export const ApiContext: Context<ApiContextType> = createContext<ApiContextType>({} as ApiContextType);

export const ApiProvider: React.FC<ApiProviderPropsWithChildren> = ({ children, apiConfig, axiosInstance }) => {

  const configFactory = useCallback((name: string) => {
    const config = apiConfig.find(c => c.name === name);
    if (!config) {
      throw new Error(`API config for ${name} not found.`);
    }
    return { ...config, axiosInstance };
  }, [apiConfig, axiosInstance]);

  const contextValue: ApiContextType = { configFactory };

  return <ApiContext.Provider value={contextValue}>{children}</ApiContext.Provider>;
};

