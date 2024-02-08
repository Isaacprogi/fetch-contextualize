import { renderHook } from '@testing-library/react-hooks';
import { useFetch } from './useFetch'; 
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const mock = new MockAdapter(axios);


// describe('useFetch', () => {
//   it('fetches data successfully', async () => {
//     mock.onGet('/test').reply(200, { data: 'test data' });

//     const { result, waitForNextUpdate } = renderHook(() =>
//       useFetch({ path: '/test', method: 'GET', onMount: true })
//     );

//     await waitForNextUpdate();

//     expect(result.current.data).toEqual({ data: 'test data' });
//     expect(result.current.loading).toBeFalsy();
//     expect(result.current.error).toBeNull();
//   });

//   it('does not fetch', async () => {
//     mock.onGet('/tes').reply(200, { data: 'test data' });

//     const { result } = renderHook(() =>
//       useFetch({ path: '/tes', method: 'GET', onMount:false })
//     );

//     expect(result.current.data).toBeNull()
//     expect(result.current.loading).toBeFalsy();
//     expect(result.current.error).toBeNull();
//   });



//   it('it uses dynamic path instead of path', async () => {
//       mock.onGet('/test').reply(200, { data: 'test data' });
//       mock.onGet('/test2').reply(200, { data: 'test data 2' });
  
//     const { result,waitForNextUpdate } = renderHook(() =>
//       useFetch({ path: '/test', dynamicPath:"/test2", method: 'GET', onMount: true })
//     );

//     await waitForNextUpdate();
    
//     expect(result.current.data).toEqual({ data: 'test data 2'});
//     expect(result.current.loading).toBeFalsy();
//     expect(result.current.error).toBeNull();
//   });

// });


it('handles errors', async () => {
    mock.onGet('/test').networkError();
  
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch({ path: '/test', method: 'GET', onMount: true })
    );
  
    await waitForNextUpdate();
  
    expect(result.current.error).toBeDefined();
    expect(result.current.loading).toBeFalsy();
  });



  afterEach(() => {
  mock.reset();
    });
