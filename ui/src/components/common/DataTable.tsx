import React from 'react';
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function DataTable({
  children
}: Props) {

  return (
    <table
      border={1}
      style={{
        width: "100%"
      }}
    >
      {children}
    </table>
  );
}