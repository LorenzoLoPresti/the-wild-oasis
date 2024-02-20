import { useEffect, useState } from "react";

export function useSizeChecker(size = 1200) {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < size) {
        setAllowed(false);
      } else {
        setAllowed(true);
      }
    };

    window.addEventListener("resize", handleResize);

    // initial effect
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [size]);

  return { allowed };
}
