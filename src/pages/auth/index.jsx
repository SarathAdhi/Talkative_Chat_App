import { getProviders, getSession, signIn, useSession } from "next-auth/react";
import { PageLayout } from "../../common/layouts/PageLayout";
import { GoogleSVG } from "../../assets/Svg";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { isAuth } from "../../common/ConditionalWrapper";

export default function SignIn({ providers }) {
  const router = useRouter();
  const _isAuth = isAuth();

  useEffect(() => {
    if (_isAuth) router.push("/");
  }, []);

  return (
    <PageLayout className="justify-center items-center">
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
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
