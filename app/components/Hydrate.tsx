"use client";

import { ReactNode, useEffect, useState } from "react";

const Hydrate = ({ children }: { children: ReactNode }) => {
  const [isHydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return isHydrated ? <>{children}</> : <div>Loading...</div>;
};

export default Hydrate;
