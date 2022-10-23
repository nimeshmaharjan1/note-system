import Header from "@components/shared/Header";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      <Header></Header>
      <main className="container">{children}</main>
    </div>
  );
};

export default MainLayout;
