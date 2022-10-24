import Header from "@components/shared/Header";
import Head from "next/head";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>DanD</title>
        <meta
          name="description"
          content="Dand repair shop located at 123 location. Repair any tech related issue."
        />
      </Head>
      <div className="min-h-screen">
        <Header></Header>
        <main className="container">{children}</main>
      </div>
    </>
  );
};

export default MainLayout;
