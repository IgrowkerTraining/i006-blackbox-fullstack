import React from "react";
import Layout from "./Layout";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <Layout
      header={null}
      sidebar={null}
      // Removes default page background so auth pages can have their own
      className="bg-[#e8e6e0]"
    >
      {/*
        This div fills the full available height of <main> and centers
        the auth card both vertically and horizontally.
      */}
      <div className="flex items-center justify-center min-h-full w-full">
        {children}
      </div>
    </Layout>
  );
}