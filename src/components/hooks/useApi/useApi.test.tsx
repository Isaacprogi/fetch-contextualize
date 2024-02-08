import React, { ReactNode } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useApi } from './useApi';
import { ApiContext } from '../../context';
import * as useFetchModule from '../useFetch';


jest.mock('../useFetch', () => ({
  useFetch: jest.fn(),
}));


const mockedUseFetch = useFetchModule.useFetch as jest.MockedFunction<typeof useFetchModule.useFetch>;

describe('useApi', () => {
  it('calls useFetch with the correct parameters from ApiContext', async () => {
    
    const mockUseFetchReturn = {
      data: null,
      error: null,
      loading: false,
      fetchData: jest.fn(),
      cancel: jest.fn(),
    };

    mockedUseFetch.mockImplementation(() => mockUseFetchReturn);

    const configFactory = jest.fn().mockReturnValue({name:"testApi", path: '/test-endpoint', method: 'GET' });
    const wrapper = ({ children }:{children:ReactNode}) => (
      <ApiContext.Provider value={{ configFactory }}>
        {children}
      </ApiContext.Provider>
    );

    const { result } = renderHook(() => useApi('testApi', { onMount: true }), { wrapper });

    expect(configFactory).toHaveBeenCalledWith('testApi');
    expect(mockedUseFetch).toHaveBeenCalledWith({
      path: '/test-endpoint',
      method: 'GET',
      onMount: true,
      name:'testApi',
    });
    expect(result.current).toEqual(mockUseFetchReturn);
  });
});
