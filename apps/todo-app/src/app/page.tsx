"use client";

import { useEffect, useState } from "react";
import InitKeyHandler from "./components/InitKeyHandler";
import MissingKeyFallback from "./components/MissingKeyFallback";
import TodoPage from "./components/TodoPage";

export default function Page() {
  const [validKey, setValidKey] = useState<boolean | null>(null);

  useEffect(() => {
    const apiKey = sessionStorage.getItem("api-key");
    const apiUrl = sessionStorage.getItem("api-url");
    setValidKey(!!apiKey && !!apiUrl);
  }, []);

  if (validKey === null) return null; // loading state

  return (
    <>
      <InitKeyHandler />
      {validKey ? <TodoPage /> : <MissingKeyFallback />}
    </>
  );
}
