import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ContextProvider } from "../common/context/Context";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ContextProvider>
        <Component {...pageProps} />
      </ContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
