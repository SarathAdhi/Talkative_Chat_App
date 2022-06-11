import clsx from "clsx";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { Context } from "../context/Context";
import { Layout } from "./Layout";
import { useSession } from "next-auth/react";

export const PageLayout = ({ title, description, className, children }) => {
  const { _user } = useContext(Context);
  const [userData, setUserData] = _user;

  const router = useRouter();

  useEffect(() => {
    if (!userData) router.push("/auth");
  }, [userData]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="w-full h-full flex bg-[#2A0944] text-white rounded-lg ">
          {userData.length !== 0 && <Sidebar userData={userData} />}

          <div
            className={clsx(
              "w-full h-full flex flex-col bg-[#2A0944] text-white rounded-lg",
              className
            )}
          >
            {children}
          </div>
        </div>
      </Layout>
    </>
  );
};
