import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ContextProvider } from "../common/context/Context";
import { AllStateManagerWrapper } from "../common/AllStateManagerWrapper";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [showing, setShowing] = useState(false);

  useEffect(() => {
    setShowing(true);
  }, []);

  if (!showing) {
    return null;
  }

  if (typeof window === "undefined") {
    return <></>;
  } else {
    return (
      <SessionProvider session={session}>
        <ContextProvider>
          <AllStateManagerWrapper>
            <Component {...pageProps} />
          </AllStateManagerWrapper>
        </ContextProvider>
      </SessionProvider>
    );
  }
}

export default MyApp;
