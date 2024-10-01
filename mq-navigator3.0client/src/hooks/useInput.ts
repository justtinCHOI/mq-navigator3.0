import { Dispatch, SetStateAction, useCallback, useState } from 'react';

type Handler = (e: any) => void;
type ReturnTypes<T = any> = [T, Handler, Dispatch<SetStateAction<T>>];
const useInput = <T = any>(initialValue: T): ReturnTypes<T> => {
  const [value, setValue] = useState(initialValue);
  const handler = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setValue(e.target.value as T);
  }, []);
  return [value, handler, setValue];
};

export default useInput;
