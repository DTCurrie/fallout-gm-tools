import { useCallback, useEffect, useRef, useState } from "react";

import useMount from "./use-mount";

export default function useStorage(key, initialValue = "") {
  const [value, setValue] = useState(initialValue);

  useMount(() => {
    const storedValue = localStorage.getItem(key);
    setValue(storedValue || initialValue);
  });

  const setItem = (newValue) => {
    setValue(newValue);
    localStorage.setItem(key, newValue);
  };

  const removeItem = () => {
    setValue(null);
    localStorage.removeItem(key);
  };

  const handleStorage = useCallback(
    (event) => {
      if (event.key === key && event.newValue !== value) {
        setValue(event.newValue || initialValue);
      }
    },
    [initialValue, key, value]
  );

  useEffect(() => {
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [handleStorage]);

  return [value, setItem, removeItem];
}
