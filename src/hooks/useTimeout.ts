import {useEffect, useRef} from 'react';

function useTimeout(callback: () => void, delay: number | null) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!delay) {
      return;
    }
    const timeout = setTimeout(() => callbackRef.current(), delay);
    return () => clearTimeout(timeout);
  }, [delay]);
}

export default useTimeout;
