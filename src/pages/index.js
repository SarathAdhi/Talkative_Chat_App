import { PageLayout } from "../common/layouts/PageLayout";
import { showSuccessToast } from "../utils/Toast";
import { useRouter } from "next/router";
import { isAuth } from "../common/ConditionalWrapper";
import { H1, H2 } from "../common/components/elements/Text";
import { getSession } from "next-auth/react";

export default function Home() {
  const router = useRouter();
  const _isAuth = isAuth();

  return (
    <PageLayout>
      <h1>Hello</h1>
    </PageLayout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session === null) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth",
      },
    };
  }
  return {
    props: {
      user: session.user,
    },
  };
}
