import {useCallback, useEffect, useState} from 'react';

/**
 * hook for retrieving a file from the root or public directory of the UI's host.
 * @param params {{ hostFilePath: string }}
 * @returns {[boolean, any , function(): Promise<void>]}
 * - [0]: A boolean indicating if the hook is currently fetching data
 * - [1]: the retrieved data
 * - [2]: A function that re-fetches the data. immediately sets the fetched data to null on invocation
 */
const useFetchHostFile = (params) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const pathString = params?.hostFilePath || '';

  const fetchFile = useCallback(async () => {
    setLoading(true);
    setData(null);
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

  return [loading, data, fetchFile];
};

export { useFetchHostFile };
