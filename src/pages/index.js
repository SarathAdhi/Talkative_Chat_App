import { getSession } from "next-auth/react";
import { PageLayout } from "../common/layouts/PageLayout";
import { showSuccessToast } from "../utils/Toast";
import axios from "axios";
import { Url } from "../common/constants/Url";

export default function Home({ response }) {
  // showSuccessToast({ title: response });

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
  } else {
    const { data } = await axios.post(`${Url}/auth`, {
      email: session.user.email,
      userImage: session.user.image,
    });
    return {
      props: {
        response: data.message,
      },
    };
  }
}
