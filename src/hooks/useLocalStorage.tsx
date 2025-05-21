import { useState, useEffect } from "react";
import { retrieveFromLocalStorage, saveToLocalStorage } from "../util/actions/localStorage";

// The custom hook that handles getting and setting data from/to localStorage
function useLocalStorage(key: string, defaultValue: any) {
  const [storedValue, setStoredValue] = useState<any>(defaultValue || []);

  useEffect(() => {
    // Retrieve the value from localStorage on initial load
    const savedValue = retrieveFromLocalStorage(key);
    if (savedValue) {
      setStoredValue(savedValue);
    }
  }, [key]);

  const setValue = (value: any) => {
    // Update state
    setStoredValue(value);

    // Save the value to localStorage
    saveToLocalStorage(key, value);
  };

  return [storedValue, setValue] as const;
}

export default useLocalStorage;
