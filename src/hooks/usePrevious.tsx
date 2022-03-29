import { useRef, useEffect } from "react";

export function usePrevious<T>(value: T): T | undefined {
  const ref: React.MutableRefObject<T | undefined> = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
