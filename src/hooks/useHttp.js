import {useCallback, useState} from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(process.env.REACT_APP_BACKENDURL + requestConfig.path, {
        headers: requestConfig.headers ?? {},
        method: requestConfig.method ?? 'GET',
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });
      console.log(response)
      if (!response.ok) {
        console.log(response.error)
        throw new Error('request failed!')
      }
      const data = await response.json();
      applyData(data);
    } catch (err) {
      setError(err.message)
    }
    setIsLoading(false);
  },[]);
  return {
    isLoading,
    error,
    sendRequest,
  }
}

export default useHttp;
