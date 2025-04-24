"use client";

import { useState } from "react";

export default function MissingKeyFallback() {
  const [apiKey, setApiKey] = useState("");
  const [apiUrl, setApiUrl] = useState("");

  const handleSave = () => {
    if (!apiKey || !apiUrl) return alert("Fill both fields!");
    sessionStorage.setItem("api-key", apiKey);
    sessionStorage.setItem("api-url", apiUrl);
    location.reload(); // re-run the app
  };

  return (
<div className="min-h-screen flex flex-col items-center justify-center text-center p-8 bg-gradient-to-br from-blue-50 via-white to-green-50 text-zinc-800">
  <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 border border-blue-100">
    <h2 className="text-2xl font-bold text-blue-700 mb-4">🔒 API Key Required</h2>
    <p className="mb-6 text-sm text-zinc-600">
      Please provide your API Key and API URL to access the Todo App.
    </p>

    <input
      className="mb-3 px-4 py-2 rounded-lg border border-zinc-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-blue-50 placeholder:text-zinc-500"
      placeholder="API Key"
      value={apiKey}
      onChange={(e) => setApiKey(e.target.value)}
    />

    <input
      className="mb-6 px-4 py-2 rounded-lg border border-zinc-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-blue-50 placeholder:text-zinc-500"
      placeholder="API URL"
      value={apiUrl}
      onChange={(e) => setApiUrl(e.target.value)}
    />

    <button
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition shadow-sm cursor-pointer"
      onClick={handleSave}
    >
      Save & Continue
    </button>
  </div>
</div>

  );
}
