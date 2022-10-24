import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { store } from "@store/index";
import { Provider } from "react-redux";
import { Session } from "next-auth";
import { SessionProvider as AuthProvider } from "next-auth/react";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import Router from "next/router";
import React from "react";
import Spinner from "@components/shared/Spinner";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  pageProps: { session?: Session };
};

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const [isLoading, setIsLoading] = React.useState(false);

  Router.events.on("routeChangeStart", (url) => {
    setIsLoading(true);
  });
  Router.events.on("routeChangeComplete", (url) => {
    setIsLoading(false);
  });
  Router.events.on("routeChangeError", (url) => {
    setIsLoading(false);
  });
  Router.events.on("beforeHistoryChange", (url) => {
    setIsLoading(false);
  });
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <AuthProvider session={session}>
      <Spinner isVisible={isLoading}></Spinner>
      <Provider store={store}>{getLayout(<Component {...pageProps} />)}</Provider>
      <ToastContainer />
    </AuthProvider>
  );
}
