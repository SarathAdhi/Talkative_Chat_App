import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ContextProvider } from "../common/context/Context";
import { ConditionalWrapper } from "../common/ConditionalWrapper";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ContextProvider>
        <ConditionalWrapper>
          <Component {...pageProps} />
        </ConditionalWrapper>
      </ContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
