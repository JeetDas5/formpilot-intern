"use client";

import Link from "next/link";

type ErrorPageProps = {
  errorMessage: string;
};

export default function ErrorPage({ errorMessage }: ErrorPageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-white dark:bg-zinc-900 text-zinc-800 dark:text-white">
      <h1 className="text-4xl font-bold text-red-600 mb-4">⚠️ Oops!</h1>
      <p className="text-lg font-medium mb-4 max-w-md">
        {errorMessage}
      </p>
      <Link
        href="/"
        className="inline-block mt-4 px-6 py-2 bg-black text-white rounded hover:bg-zinc-800 transition"
      >
        ⬅ Go Back Home
      </Link>
    </div>
  );
}
