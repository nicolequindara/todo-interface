import { useState, useEffect, useCallback } from 'react';

const BASE_URL = `http://localhost:5062`;

export function useApi<TResponse, TBody = undefined>() 
  {
  const [data, setData] = useState<TResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async (url: string, 
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: TBody) => {
    setLoading(true);
    setError(null);

    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }
    try {
      const response = await fetch(`${BASE_URL}${url}`, options);

      if (!response.ok) {
        const errorData: Error = await response.json();
        setError(errorData)
      }

      const data: TResponse = await response.json();
      setData(data);
    } catch (error) {
      console.error('API request failed:', error);
      setError(error as Error)
    } finally {
      setLoading(false)
    }
  }, []);

  return { fetchData, data, loading, error };
}