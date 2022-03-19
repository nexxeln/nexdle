import { useEffect, useRef } from "react";

function usePrevious<T>(value: T): T {
  const ref: any = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export default usePrevious;

// const usePrevious = <T extends unknown>(value: T): T | undefined => {
//   const ref = useRef<T>();

//   useEffect(() => {
//     ref.current = value;
//   }, [value]);

//   return ref.current;
// };
