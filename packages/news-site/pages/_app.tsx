import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  SessionProvider,
  SessionProviderProps,
  useSession,
  signOut,
} from "next-auth/react";
import React, { useEffect } from "react";
import { setCssVars } from "ui";
import { ITheme } from "types";
import { Navbar } from "../components";

const theme: ITheme = {
  backgroundColor: "#242424",
  primaryColor: "#646cff",
  secondaryColor: "#1a1a1a",
  textColor: "#ffffff",
};
function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: SessionProviderProps["session"] }>) {
  useEffect(() => {
    setCssVars(theme);
  }, []);
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { data, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && data.accessToken) {
      localStorage.setItem("token", data.accessToken as string);
    }
  }, [status, data?.accessToken]);

  return (
    <div className='root'>
      <Navbar />
      {children}
    </div>
  );
};
export default MyApp;
