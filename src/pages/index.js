import { PageLayout } from "../common/layouts/PageLayout";
import { showSuccessToast } from "../utils/Toast";
import { getSession } from "next-auth/react";

export default function Home() {
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
