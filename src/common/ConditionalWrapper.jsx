import { useSession } from "next-auth/react";
import React from "react";
import { useContext } from "react";
import { Context } from "./context/Context";

export const ConditionalWrapper = ({ children }) => {
  return <>{children}</>;
};

export const isAuth = () => {
  const { data: session } = useSession();
  if (session) return session;
  return false;
};
