import * as React from "react";

/**
 * Returns true when screen width is less than 768px (Tailwind's md breakpoint)
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    // Set initial value
    setIsMobile(window.innerWidth < 768);

    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}