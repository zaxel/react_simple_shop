import { useLayoutEffect, useState } from "react";

export default function useWindowSize(){
    let width = window.innerWidth;
    let height = window.innerHeight;
    const [size, setSize] = useState([width, height]);
    useLayoutEffect(()=>{
        function updateSize(){
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize)
    }, []);
    return size;
}