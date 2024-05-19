import { useState } from 'react';

export const useApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const api = async (url: string) => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const json = await response.json();

      setLoading(false);

      return json;
    } catch (error: any) {
      console.log(error);
      setError(error);
      setLoading(false);
    }
  };

  return { error, loading, api };
};
