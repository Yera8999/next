import type { AppProps } from "next/app";
import "../styles/globals.css";
import Head from "next/head";
import MenuAppBar from "../components/MenuAppBar";
import React from "react";
import { AuthContextProvider } from "../context/authContext";
import "../node_modules/react-quill/dist/quill.snow.css";
import NextNProgress from "nextjs-progressbar";
import "highlight.js/styles/atom-one-dark.css";
import { AuthModal } from "../components/AuthModal";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <>
        <Head>
          <link
            rel="shortcut icon"
            href="https://dr.habracdn.net/qna/6138751d/images/favicons/favicon.ico"
          />
          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"
          />
        </Head>
        <NextNProgress
          color="#29D"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          showOnShallow={true}
        />
        <MenuAppBar />
        <AuthModal />
        <Component {...pageProps} />
      </>
    </AuthContextProvider>
  );
}
export default MyApp;
