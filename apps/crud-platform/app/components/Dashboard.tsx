"use client";
import { signIn, useSession, signOut } from "next-auth/react";

export default function Page() {
  const { status } = useSession();
  const { data: session } = useSession();

  if (status === "loading") return <p>Loading session...</p>;

  return (
    <main className="p-8 max-w-2xl mx-auto bg-white/60 backdrop-blur-md shadow-xl rounded-3xl border border-blue-100 mt-10">
      <h1 className="text-3xl font-extrabold text-blue-700 mb-6 text-center drop-shadow-sm">
        FormPilot CRUD Platform
      </h1>

      {session ? (
        <>
          <h2 className="text-2xl font-semibold text-zinc-800 mb-2">
            👋 Welcome,{" "}
            <span className="text-blue-600">{session.user?.name}</span>
          </h2>
          <div className="space-y-2 text-zinc-700 text-base">
            <p>
              📧{" "}
              <span className="font-medium text-zinc-900">
                Email: {session.user?.email}
              </span>
            </p>
            <p>
              🆔{" "}
              <span className="font-mono text-sm bg-blue-50 text-blue-800 px-2 py-1 rounded-md">
                Your API Key: {session.user?.apiKey}
              </span>
            </p>
            <p>
              🌐{" "}
              <span className="font-mono text-sm bg-green-50 text-green-800 px-2 py-1 rounded-md">
                Your API Url: {session.user?.apiUrl}
              </span>
            </p>
            <p>
              🎯{" "}
              <span className="text-blue-600 font-semibold">Credits Used:</span>{" "}
              {session.user?.creditsUsed}
            </p>
            <p>
              🎯{" "}
              <span className="text-green-600 font-semibold">
                Credits Left:
              </span>{" "}
              {session.user?.creditsLeft}
            </p>
          </div>

          <button
            className="mt-6 inline-block bg-red-500 hover:bg-red-600 text-white font-medium px-5 py-2.5 rounded-xl transition shadow-sm"
            onClick={() => signOut()}
          >
            🚪 Logout
          </button>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center gap-3 mt-8">
            <button
              onClick={() => signIn("google")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-3 rounded-xl shadow-md transition"
            >
              🔐 Sign in with Google
            </button>
            <p className="text-zinc-600">
              Please sign in to view your details.
            </p>
          </div>
        </>
      )}
    </main>
  );
}
