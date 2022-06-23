import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ContextProvider } from "../common/context/Context";
import { AllStateManagerWrapper } from "../common/AllStateManagerWrapper";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [showing, setShowing] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    setShowing(true);
  }, []);

  if (!showing) {
    return null;
  }

  if (typeof window === "undefined") {
    return <></>;
  } else {
    // document.addEventListener("contextmenu", (e) => {
    //   e.preventDefault();
    // });
    return (
      <SessionProvider session={session}>
        <ContextProvider>
          <AllStateManagerWrapper>
            <Component
              {...pageProps}
              isPageLoading={isPageLoading}
              setIsPageLoading={setIsPageLoading}
            />
          </AllStateManagerWrapper>
        </ContextProvider>
      </SessionProvider>
    );
  }
}

export default MyApp;
