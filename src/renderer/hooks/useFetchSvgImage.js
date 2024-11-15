import {useCallback, useEffect, useState} from 'react';

/**
 * hook for retrieving the svg data from the root or public directory of the UI's host.
 * @param params {{ hostFilePath: string }}
 * @returns {[boolean, any , function(): Promise<void>]}
 * - [0]: A boolean indicating if the hook is currently fetching data
 * - [1]: the svg URL containing the base 64 encoded SVG data. to be set as image tag src
 * - [2]: A function that re-fetches the svg data. immediately sets the fetched data to null on invocation
 */
const useFetchSvgContent = (params) => {
  const [svgContentUrl, setSvgContentUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const pathString = params?.hostFilePath || '';

  const fetchSVG = useCallback(async () => {
    setLoading(true);
    setSvgContentUrl('');
    try {
      const response = await fetch(pathString);
      if (response.ok) {
        const svgContent = await response.text();
        const svgContentUrl = `data:image/svg+xml;base64,${btoa(svgContent)}`;
        setSvgContentUrl(svgContentUrl);
      } else {
        setSvgContentUrl('');
      }
    } catch (error) {
      setSvgContentUrl('');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSVG();
  }, [fetchSVG]);

  return [loading, svgContentUrl, fetchSVG];
};

export { useFetchSvgContent };
