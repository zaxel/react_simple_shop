import { useEffect, useState } from "react";
import { $authHost, $host } from "../../http";

const useFetch = (url, params = {}, authorized = false) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const starParams = JSON.stringify(params);
  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const resp = await (authorized ? $authHost : $host).get(url, params);

        if (!cancelled) {
          setData(resp.data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [url, authorized, starParams]);

  return { data, error, isLoading };
};

export default useFetch;
