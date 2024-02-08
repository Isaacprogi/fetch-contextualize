 # Fetch-contextualize
`fetch-contextualize` is a lightweight, powerful React library designed to simplify the process of making API calls within your React applications. 
Utilizing the React Context API for configuration management and Axios for making HTTP requests, this library provides
a custom hook, useApi, for fetching data with ease, handling loading states, errors, and the cancellation of requests efficiently

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Setup](#setup)
  - [Axios Configuration](#axios-configuration)
    - [Axios Instance](#axios-instance)
    - [Single api extra configuration](#Single-api-extra-configuration)
- [Usage](#usage)
  - [Passing Data](#passing-data)
    - [Query Parameters](#query-parameters)
    - [Passing Body](#passing-body)
  - [Dynamic Path](#dynamic-path)
- [API Reference](#api-reference)
  - [useApi Hook](#useapi-hook)
- [Contributing](#contributing)
- [License](#license)

## Features

- Simplified API calls with Axios.
- Global configuration using the React Context API.
- Automatic handling of request states (loading, success, error).
- Support for cancellation of ongoing requests.



## Installation

To install the package, run the following command in your project directory:

```bash
npm install fetch-contextualize
```

## Setup

Before using the `useApi` hook, you need to set up the `ApiContext` in your application. Wrap your root component with `ApiContext.Provider` and pass in the necessary configuration.

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { ApiConfig,ApiProvider} from 'fetch-contextualize'
import App from './App';

const apiConfig:ApiConfig[] = [
  { name: 'users', method: 'GET', path: '/users' },
  { name: 'posts', method: 'GET', path: '/posts' },
];

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApiProvider apiConfig={apiConfig}>
       <App />
    </ApiProvider>
  </React.StrictMode>,
)
```

### Axios configuration

#### Axios Instance
You can use an axios instance in conjuction with the apiConfig

```jsx
const instance = axios.create({
  baseURL: 'https://your-api-domain.com/api',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApiProvider axiosInstance={instance} apiConfig={apiConfig}>
       <App />
    </ApiProvider>
  </React.StrictMode>,
)
```

#### Single api extra configuration
You can pass extra configuration to a single api by doing the following.
 ```jsx
 const apiConfig:ApiConfig[] = [
 { name: 'users', method: 'GET', path:'/users' extra:{
  params: {  
    userId: 12345 
  },
  timeout: 5000,
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN_HERE'
  },
  responseType: 'json'
 }},
 
 { name: 'posts', method: 'POST', path: '/posts' extra:{
 data: {  
    itemName: "NewExampleItem",
    quantity: 5
  },
  params: {
    userId: 12345
  },
  timeout: 5000,
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN_HERE'
  },
  responseType: 'json'

 } }
];

```
`note`: The data and params in extra configuration will override the values passed to the fetchData function.


## Usage

After setting up the `ApiContext`, you can use the `useApi` hook in your components to make API calls. Here's how to use it.
You can always call fetchData what you want
```jsx
 const { data, error, loading, fetchData, searchValue, cancel } = useApi<User[]>('users');
``

```jsx
import React from 'react';
import { useApi } from 'fetch-contextualize';

interface User {
  name:string,
  email:string,
}

function MyComponent() {
  const { data, error, loading, fetchData, cancel } = useApi<User[]>('users', { onMount: true });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <button onClick={() => fetchData()}>Fetch Data</button>
      <button onClick={() => cancel()}>Cancel Request</button>
      <div>Data: {JSON.stringify(data)}</div>
    </div>
  );
}
```
If onmount is set to true,the api is called when component mounts and vise versa if onMount is false.By default onMount is false;
The following will not be called when component mounts.

```jsx
  const { data, error, loading, fetchData, cancel } = useApi<User[]>('users');
  const { data, error, loading, fetchData, cancel } = useApi<User[]>('users', { onMount: false });
```
### Passing Data
#### Query Parameters: How to pass query parameters
The query parameters should be put within the params object.
```jsx
  fetchData(params:{
    id:"blabla",
    name:"blabla"
  })
```
#### Passing body: How to include a request body
The body should be put within the data object.

```jsx
  fetchData(data:{
    name:"blabla",
    email:"blabla.com"
  })
```
## Dynamic path 
You can `dynamically` change the value of `path parameters` of a url by passing the url to the dynamicPath option.
You can choose to call the fetch function whenever ever id changes or set onMount to true which will cause a rerender.

```jsx
import React from 'react';
import { useApi } from 'fetch-contextualize';
import {useState} from 'react'

interface User {
  name:string,
  email:string,
}

function MyComponent() {
 const [id, setId] = useState<string>(1)
 const { data, error, loading, fetchData } = useApi<User>('users', { onMount: false, dynamicPath:``api/users/${id}`` });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

 useEffect(()=>{
 fetchData()
  },[id])

  return (
    <div>
      <button onClick={() => setId(prev=>prev+1)}>Change Id</button>
      <div>Data: {JSON.stringify(data)}</div>
    </div>
  );
}

```
You can remove the useEffect and fetchData and simply set onMount to true.

```jsx
const { data, error, loading } = useApi<User>('users', { onMount: true, dynamicPath:'api/users/${id}' });
```

### API Reference
This section outlines the useApi hook, which facilitates API requests within React applications. It details the hook's parameters, configuration options, and the types of values it returns, providing essential insights for effectively fetching data, handling loading states, and managing errors.
This succinct introduction offers a quick overview of what the reader can expect from the API Reference section, focusing on the practical aspects of using the useApi hook.

### useApi

Hook for making API requests within React components.

#### Parameters

- `name` (string): The name identifier for the API endpoint configuration.
- `second option`(Object): Optional. Configuration options for the API request.
  - `onMount` (boolean): If true, the API request will be made when the component mounts. Default is `false`.
  - `dynamicPath` (string): A dynamic path segment to be appended to the base URL.This will replace the main path in the the apiConfig even if it is set

#### Returns

- `data` (T): The response data from the API call.You specify T when you call the `useApi` like this useApi<Your response type>.
- `error` (Error): An error object if the request fails.
- `loading` (boolean): Indicates if the request is in progress.
- `fetchData` (function): A function to manually trigger the API request.
- `cancel` (function): A function to cancel the ongoing API request if necessary.
  
## Contributing
We welcome contributions to improve this package. If you have suggestions, bug reports, or want to contribute code, please feel free to open an issue or submit a pull request on our GitHub repository.

## License
This project is licensed under the MIT License - see the LICENSE file for details.




