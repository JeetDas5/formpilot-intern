/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { signIn, useSession, signOut } from "next-auth/react";
import { ClipboardIcon } from "@heroicons/react/24/outline";
import { Toaster, toast } from "react-hot-toast";
import ErrorPage from "./ErrorPage";
import Loader from "./Loader";
import axios from "axios";
import { useState } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Footer from "./Footer";

export default function Page() {

  const [isLoading, setIsLoading] = useState(false);


  const { status } = useSession();
  const { data: session } = useSession();

  const CrudPlatformUrl = process.env.NEXT_PUBLIC_NEXTAUTH_URL;
  const TodoUrl = process.env.NEXT_PUBLIC_NEXTAUTH_TODO_URL;


  if (status === "loading") return <Loader />;


  const handleRecharge = async () => {
    setIsLoading(true)
    try {
      if (session == null) return <ErrorPage errorMessage="Session not found" />;
      await axios.post(
        `${CrudPlatformUrl}/api/recharge`,
        {},
        { headers: { "x-api-key": `${session.user?.apiKey}` } }
      );
      toast.success("Recharge successful!");
    } catch (error: any) {
      if (error.response?.status == 403) {
        toast.error("Credits exhausted. Cannot recharge again.");
      }
    }
    setIsLoading(false);
  };
  return (
    <>
      <Toaster position="top-right" />
      {
        isLoading && <Loader />
      }
      <Navbar />
      <Hero />
      <main id="#dashboard" className="p-8 max-w-2xl mx-auto bg-white/60 backdrop-blur-md shadow-xl rounded-3xl border border-blue-100 mt-10">
        <h1 className="text-3xl font-extrabold text-blue-600 mb-6 text-center drop-shadow-sm">
          Dashboard
        </h1>

        {session ? (
          <>
            <h2 className="text-2xl font-semibold text-zinc-800 mb-2">
              👋 Welcome,{" "}
              <span className="text-blue-600">{session.user?.name}</span>
            </h2>

            <div className="space-y-3 text-zinc-700 text-base">
              <p>
                📧{" "}
                <span className="font-medium text-zinc-900">
                  Email: {session.user?.email}
                </span>
              </p>

              <div className="flex items-center gap-2">
                🆔{" "}
                <span className="font-mono text-sm bg-blue-50 text-blue-800 px-2 py-1 rounded-md">
                  Your API Key: {session.user?.apiKey}
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(session.user?.apiKey || "");
                    toast.success("API Key copied!");
                  }}
                  className="text-blue-600 hover:text-blue-800"
                  title="Copy API Key"
                >
                  <ClipboardIcon className="h-5 w-5" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                🌐{" "}
                <span className="font-mono text-sm bg-green-50 text-green-800 px-2 py-1 rounded-md">
                  Your API URL: {session.user?.apiUrl}
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(session.user?.apiUrl || "");
                    toast.success("API URL copied!");
                  }}
                  className="text-green-600 hover:text-green-800"
                  title="Copy API URL"
                >
                  <ClipboardIcon className="h-5 w-5" />
                </button>
              </div>

              <p>
                🎯{" "}
                <span className="text-blue-600 font-semibold">
                  Credits Used:
                </span>{" "}
                {session.user?.creditsUsed}
              </p>
              <p>
                🎯{" "}
                <span className="text-green-600 font-semibold">
                  Credits Left:
                </span>{" "}
                {session.user?.creditsLeft}
              </p>
              {session.user?.creditsUsed == session.user?.creditsLimit && (
                <div className="bg-white/90 rounded w-fit px-2">
                  <p className="text-sm text-red-600">
                    Credits Exhausted. Please Recharge!
                  </p>
                  <button
                    className="bg-blue-500/90 hover:bg-blue-700/90 rounded-xl text-white font-medium px-5 py-2.5 mt-2 inline-block"
                    onClick={handleRecharge}
                  >
                    {" "}
                    Recharge
                  </button>
                </div>
              )}
            </div>

            <button
              className="mt-6 inline-block bg-red-500 hover:bg-red-600 text-white font-medium px-5 py-2.5 rounded-xl transition shadow-sm"
              onClick={() => signOut()}
            >
              Logout
            </button>

            <a
              href={TodoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-6 text-center text-blue-600 hover:underline font-medium cursor-pointer"
            >
              👉 Go to Todo App
            </a>
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
              <p className="text-sm text-red-500">New users might have to sign in twice.</p>
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
