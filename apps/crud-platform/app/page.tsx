"use client";

import React from "react";
import Dashboard from "./components/Dashboard";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

interface Props {
  session: Session | null;
}

const Home: React.FC<Props> = ({ session }) => {
  return (
    <>
      <SessionProvider session={session}>
        <Dashboard />
      </SessionProvider>
    </>
  );
};

export default Home;
