import { getProviders, getSession, signIn } from "next-auth/react";
import { PageLayout } from "../../common/layouts/PageLayout";
import { GoogleSVG } from "../../assets/Svg";
import Axios from "../../lib/axios";
import { H3 } from "../../common/components/elements/Text";

export default function GoogleSignIn({ providers }) {
  return (
    <PageLayout title="Login" className="justify-center items-center gap-y-10">
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
    const { data } = await Axios.post("/auth", {
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    });

    return {
      redirect: {
        permanent: false,
        // destination: `/`,
        destination: `/?msg=${data.message}`,
      },
    };
  } else {
    const providers = await getProviders();
    return {
      props: { providers },
    };
  }
}
