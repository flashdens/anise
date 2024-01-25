import { Html, Head, Main, NextScript } from 'next/document'
import Navbar from "@/components/navbar/Navbar";
import React from "react";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className={"dark:bg-black dark:text-white"}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
