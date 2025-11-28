import { useEffect, useState } from "react";

export function useDebounce(value: string) {
  const [debounced, setDebounced] = useState<string>(value);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setDebounced(value);
    }, 800);

    return () => {
      clearTimeout(debounce);
    };
  }, [value]);

  return { debounced };
}
