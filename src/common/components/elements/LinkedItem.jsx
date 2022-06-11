import Link from "next/link";
import React from "react";
import clsx from "clsx";

export const LinkedItem = ({ href, className, children, onClick }) => {
  return (
    <Link href={href} scroll={false}>
      <a onClick={onClick} className={clsx("", className)}>
        {children}
      </a>
    </Link>
  );
};
