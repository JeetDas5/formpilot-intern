"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function InitKeyHandler() {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const apiKey = params.get("api");
    const apiUrl = params.get("url");

    if (apiKey && apiUrl) {
      sessionStorage.setItem("api-key", apiKey);
      sessionStorage.setItem("api-url", apiUrl);
      console.log("✅ API Key & URL stored in session");

      // Clean URL
      router.replace("/");
    }
  }, [params]);

  return null;
}
