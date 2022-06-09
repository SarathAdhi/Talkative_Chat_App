import clsx from "clsx";
import React from "react";

export const H1 = ({ className, children }) => {
  return <h1 className={clsx("text-white text-4xl", className)}>{children}</h1>;
};

export const H2 = ({ className, children }) => {
  return <h2 className={clsx("text-white text-2xl", className)}>{children}</h2>;
};

export const H3 = ({ className, children }) => {
  return <h3 className={clsx("text-white text-xl", className)}>{children}</h3>;
};

export const H4 = ({ className, children }) => {
  return <h4 className={clsx("text-white text-lg", className)}>{children}</h4>;
};

export const H5 = ({ className, children }) => {
  return (
    <h5 className={clsx("text-white text-base", className)}>{children}</h5>
  );
};

export const H6 = ({ className, children }) => {
  return <h6 className={clsx("text-white text-sm", className)}>{children}</h6>;
};

export const P = ({ className, children }) => {
  return <p className={clsx("text-white text-sm", className)}>{children}</p>;
};
