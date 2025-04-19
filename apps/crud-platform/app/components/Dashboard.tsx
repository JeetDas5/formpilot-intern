"use client";
import { signIn, useSession, signOut } from "next-auth/react";

export default function Page() {
  const { status } = useSession();
  const { data: session } = useSession();

  if (status === "loading") return <p>Loading session...</p>;

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold">FormPilot CRUD Platform</h1>

      {session ? (
        <>
          <h1 className="text-xl">Welcome, {session.user?.name}</h1>
          <p>📧 {session.user?.email}</p>
          <p>🆔 API Key: {session.user?.apiKey}</p>
          <p>🌐 API URL: {session.user?.apiUrl}</p>
          <p>🎯 Credits Used: {session.user?.creditsUsed}</p>
          <p>🎯 Credits Left: {session.user?.creditsLeft}</p>
          <button
            className="mt-4 m-2 p-3 rounded-lg bg-red-500"
            onClick={() => signOut()}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => signIn("google")}
            className="bg-black text-white p-2 mt-4"
          >
            Sign in with Google
          </button>
          <p>Please sign in to view your details.</p>
        </>
      )}
    </main>
  );
}
