"use client";

import { Suspense } from "react";
import { SearchPageClient } from "@/app/search/SearchPageClient";

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPageClient />
    </Suspense>
  );
}
