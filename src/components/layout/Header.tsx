"use client";

import { usePathname } from "next/navigation";

import { HeaderHome } from "./HeaderHome";
import { HeaderSecondary } from "./HeaderSecondary";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return isHome ? <HeaderHome /> : <HeaderSecondary />;
}
