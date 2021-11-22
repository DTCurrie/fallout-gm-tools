import { useCallback, useEffect, useState } from "react";
import useStorage from "./use-storage";

export default function useObjectStorage(key, initialValue) {
  const [item, setItem] = useStorage(
    key,
    initialValue ? JSON.stringify(initialValue) : initialValue
  );

  const getValue = useCallback(() => (item ? JSON.parse(item) : null), [item]);

  const [data, setData] = useState(getValue());

  const setValue = (value) => {
    setItem(JSON.stringify(value));
  };

  useEffect(() => {
    setData(getValue());
  }, [getValue, setData]);

  return [data, setValue];
}
