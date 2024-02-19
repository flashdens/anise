import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from "@/components/navbar/Navbar";
import React from "react";
import {DarkModeProvider} from "@/context/DarkModeContext";
import FlashMessage from "@/components/FlashMessage";
import {FlashMessageProvider} from "@/context/FlashMessageContext";

export default function App({ Component, pageProps }: AppProps) {
  return  (
        <FlashMessageProvider>
          <DarkModeProvider>
            <Navbar/>
            <Component {...pageProps} />
          </DarkModeProvider>
        </FlashMessageProvider>
  )
}
