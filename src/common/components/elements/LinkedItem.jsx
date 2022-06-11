import Link from "next/link";
import React from "react";
import clsx from "clsx";

export const LinkedItem = ({ href, className, children }) => {
  return (
    <Link href={href}>
      <a className={clsx("", className)}>{children}</a>
    </Link>
  );
};
