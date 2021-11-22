import { useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const request = async (requestConfig, transformation) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error("request failed");
      }
      let data = await response.json();
      transformation(data);
    } catch (err) {
      setError(err.message || "something went wrong");
    }
    setIsLoading(false);
  };

  return {
    isLoading,
    request,
    error,
  };
};

export default useHttp;
