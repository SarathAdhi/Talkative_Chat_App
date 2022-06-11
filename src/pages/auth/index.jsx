import { getProviders, getSession, signIn, useSession } from "next-auth/react";
import { PageLayout } from "../../common/layouts/PageLayout";
import { GoogleSVG } from "../../assets/Svg";
import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Url } from "../../common/constants/Url";
import { H3 } from "../../common/components/elements/Text";

export default function SignIn({ providers }) {
  const router = useRouter();

  return (
    <PageLayout className="justify-center items-center gap-y-10">
      <H3>Login with Google to continue.</H3>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="bg-white px-3 py-2 rounded-lg text-black text-2xl font-medium flex items-center justify-center gap-2"
            onClick={() => signIn(provider.id)}
          >
            <GoogleSVG />
            {provider.name}
          </button>
        </div>
      ))}
    </PageLayout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session !== null) {
    await axios.post(Url + "/auth", {
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    });
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  } else {
    const providers = await getProviders();
    return {
      props: { providers },
    };
  }
}
