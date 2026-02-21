import { useState, useEffect } from 'react';

export const useStorage = (key, initialValue) => {
  const [value, setValue] = useState(initialValue);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await window.storage.get(key);
        if (data) {
          setValue(JSON.parse(data.value));
        }
        setIsLoaded(true);
      } catch (error) {
        console.log(`${key} 로드 중 오류:`, error);
        setIsLoaded(true);
      }
    };
    loadData();
  }, [key]);

  useEffect(() => {
    if (isLoaded && JSON.stringify(value) !== JSON.stringify(initialValue)) {
      window.storage.set(key, JSON.stringify(value));
    }
  }, [key, value, isLoaded, initialValue]);

  return [value, setValue];
};