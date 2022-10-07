import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider, SessionProviderProps } from "next-auth/react";
import { useEffect } from "react";
import { setCssVars } from "ui";
import { ITheme } from "types";
import { Navbar } from "../components";
import AuthContextProvider from "../context/Auth.context";

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
      <div className='root'>
        <Navbar />
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}

export default MyApp;
