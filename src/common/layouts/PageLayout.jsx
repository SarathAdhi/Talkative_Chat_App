import clsx from "clsx";
import Head from "next/head";
import React from "react";
import { Sidebar } from "../components/Sidebar";
import { Layout } from "./Layout";

export const PageLayout = ({ title, description, className, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="w-full h-full flex bg-[#2A0944] text-white rounded-lg ">
          <Sidebar />

          <div
            className={clsx(
              "w-full h-full p-5 flex flex-col bg-[#2A0944] text-white rounded-lg",
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
