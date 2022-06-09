import { PageLayout } from "../common/layouts/PageLayout";
import { showSuccessToast } from "../utils/Toast";
import { useRouter } from "next/router";
import { useEffect, useContext } from "react";
import { isAuth } from "../common/ConditionalWrapper";
import { H1, H2 } from "../common/components/elements/Text";
import SignIn from "./auth";

export default function Home() {
  const router = useRouter();
  const _isAuth = isAuth();

  useEffect(() => {
    if (!_isAuth) {
      router.push("/auth");
    }
  }, []);

  if (_isAuth) {
    return (
      <PageLayout>
        <h1>Hello</h1>
      </PageLayout>
    );
  } else {
    return <PageLayout></PageLayout>;
  }
}
