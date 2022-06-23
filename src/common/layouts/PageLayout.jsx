import clsx from "clsx";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Sidebar } from "../components/sidebar/Sidebar";
import { Context } from "../context/Context";
import { Layout } from "./Layout";
import MobileNavbar from "../components/sidebar/MobileNavbar";

export const PageLayout = ({ title, description, className, children }) => {
  const { _user } = useContext(Context);
  const [userData, setUserData] = _user;

  const { _isPageLoading } = useContext(Context);
  const [isPageLoading, setIsPageLoading] = _isPageLoading;

  const router = useRouter();

  useEffect(() => {
    setTimeout(() => setIsPageLoading(false), 2000);
    if (!isPageLoading) if (!userData) router.replace("/auth");
  }, [userData, isPageLoading]);

  if (!isPageLoading) {
    return (
      <>
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Layout>
          <div className="w-full h-full flex flex-col lg:flex-row bg-[#2A0944] text-white rounded-lg ">
            {userData && (
              <>
                <Sidebar userData={userData} />
                <MobileNavbar userData={userData} />
              </>
            )}

            <div
              className={clsx(
                "w-full h-full p-2 lg:p-3  flex flex-col bg-[#2A0944] text-white rounded-lg",
                className
              )}
            >
              {children}
            </div>
          </div>
        </Layout>
      </>
    );
  } else {
    return (
      <Layout>
        <img src="/loading2.gif" className="p-5 w-1/2 md:w-40 rounded-full" />
      </Layout>
    );
  }
};
