import React from 'react';
import { ReactNode } from "react";
import Navbar from "./Navbar";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div>

      <Navbar />

      <main
        style={{
          padding: "20px"
        }}
      >
        {children}
      </main>

    </div>
  );
}