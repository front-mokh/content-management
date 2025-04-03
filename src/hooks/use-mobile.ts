import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  // Default to false (or whatever makes sense as default for your app)
  const [isMobile, setIsMobile] = React.useState<boolean>(false);

  // Add a state to track if we're on the client
  const [isClient, setIsClient] = React.useState(false);

  // First effect just to mark we're on client
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  // Second effect for the actual mobile detection logic
  React.useEffect(() => {
    if (!isClient) return;

    // Check if the window is defined
    if (typeof window !== "undefined") {
      const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
      const onChange = () => {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
      };

      // Set initial value
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

      // Add listener
      mql.addEventListener("change", onChange);

      // Cleanup
      return () => mql.removeEventListener("change", onChange);
    }
  }, [isClient]);

  return isMobile;
}
