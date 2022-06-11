import { useState, useEffect } from "react";

export default function useActiveElement(){
    const [active, setActive] = useState(document.activeElement);
    
    const handleFocusIn = (e) => {
      setActive(document.activeElement);
    }
    
    useEffect(() => {
      document.addEventListener('focusin', handleFocusIn)
      return () => {
        document.removeEventListener('focusin', handleFocusIn)
    };
    }, [])
    
    return active;
  }