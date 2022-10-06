import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { setCssVars } from "ui";
import { ITheme } from "types";
import { Navbar } from "../components";

const theme: ITheme = {
  backgroundColor: "#242424",
  primaryColor: "#646cff",
  secondaryColor: "#1a1a1a",
  textColor: "#ffffff",
};
function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    setCssVars(theme);
  }, []);
  return (
    <div className='root'>
      <Navbar />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
