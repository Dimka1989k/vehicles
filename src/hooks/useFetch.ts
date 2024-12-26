import { useState, useEffect } from "react";

export const useFetch = <T,>(url: string): { data: T | null; error: string | null } => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch");
        const result = await response.json();
        setData(result.Results);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message); 
        } else {
          setError("An unknown error occurred");
        }
      }
    };

    fetchData();
  }, [url]);

  return { data, error };
};