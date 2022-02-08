import {useEffect, useState} from "react";
import useToken from "./useToken";

const useApiResult = (request) => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = useToken();

  useEffect(() => {
    const [url, options] = request;
    fetch(url, {
      method: options.method,
      headers: {
        'X-AUTH-TOKEN': token.token,
      },
    })
      .then(async (response) => {
        if (response.ok) {
          setResults(await response.json());
          setError(null);
        } else {
          setError(await response.text());
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        console.log(err.message);
        setLoading(false);
      });
  }, [request, token.token]);

  return [results, error, loading];
};

export default useApiResult;
