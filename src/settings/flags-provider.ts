import { useCallback } from "react";
import { defaultFlags, IFlags } from "./flags";

const useFlags = () => {
  const setFlags = useCallback((flags: IFlags) => 
    localStorage.setItem("flags", JSON.stringify(flags)), []);
    
  const getFlags = useCallback((): IFlags => 
    JSON.parse(localStorage.getItem("flags") ?? JSON.stringify(defaultFlags)), []);
    
  return { getFlags, setFlags };
}

export { useFlags };
