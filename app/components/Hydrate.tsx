"use client";

import { useThemeStore } from "@/store";
import { ReactNode, useEffect, useState } from "react";

const Hydrate = ({ children }: { children: ReactNode }) => {
  const [isHydrated, setHydrated] = useState(false);
  const { mode } = useThemeStore();

  useEffect(() => {
    setHydrated(true);
  }, []);

  return isHydrated ? (
    <body className="px-4 md:px-48 font-roboto" data-theme={mode}>
      {children}
    </body>
  ) : (
    <body></body>
  );
};

export default Hydrate;
