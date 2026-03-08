"use client";

import * as React from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = React.useState<T>(initialValue);
  const initialValueRef = React.useRef(initialValue);

  React.useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        setStoredValue(JSON.parse(item) as T);
        return;
      }

      setStoredValue(initialValueRef.current);
    } catch {
      setStoredValue(initialValueRef.current);
    }
  }, [key]);

  const setValue = React.useCallback(
    (value: T | ((previousValue: T) => T)) => {
      setStoredValue((previousValue) => {
        const valueToStore =
          value instanceof Function ? value(previousValue) : value;

        try {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch {}

        return valueToStore;
      });
    },
    [key],
  );

  return [storedValue, setValue] as const;
}
