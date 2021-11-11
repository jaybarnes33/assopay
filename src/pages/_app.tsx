import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import { AppProps } from "next/app";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
