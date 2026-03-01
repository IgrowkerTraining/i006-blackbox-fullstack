import React from "react"
import Layout from "./Layout"

interface AuthLayoutProps {
  children: React.ReactNode;
}


export default function AuthLayout ({ children }: AuthLayoutProps) {
  return (
    <Layout
    header={null}
    sidebar = {null}
    className= "flex items-center justify-center "
    >
      <div className="w-full max-w-md p-4">{children}</div>
    </Layout>
  )
}