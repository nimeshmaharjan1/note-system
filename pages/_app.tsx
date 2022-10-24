import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { store } from "@store/index";
import { Provider } from "react-redux";
import { Session } from "next-auth";
import { SessionProvider as AuthProvider } from "next-auth/react";
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
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <AuthProvider session={session}>
      <Provider store={store}>{getLayout(<Component {...pageProps} />)}</Provider>
    </AuthProvider>
  );
}
