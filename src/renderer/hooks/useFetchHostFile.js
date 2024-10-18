import { useCallback, useEffect, useState } from 'react';

const useFetchHostFile = (params) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const pathString = params?.hostFilePath || '';

  const fetchFile = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(pathString);
      if (response.ok) {
        const json = await response.json();
        setData(json);
      } else {
        setData(null);
      }
    } catch (error) {
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFile();
  }, [fetchFile]);

  return [loading, data, () => fetchFile];
};

export { useFetchHostFile };
