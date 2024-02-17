"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { GoTasklist } from "react-icons/go";

const NavBar = () => {
  const currentPath = usePathname();

  console.log(currentPath);

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 items-center h-14 ">
      <Link href="/" className="font-extrabold">
        <GoTasklist size={30} />
      </Link>
      <ul className="flex space-x-6">
        {links.map((item) => (
          <li key={item.label}>
            <Link
              className={`${
                item.href === currentPath
                  ? "text-zinc-900 font-medium"
                  : "text-zinc-500"
              } hover:text-zinc-800 transition-colors`}
              // className="text-zinc-500 hover:text-zinc-800 transition-colors"
              href={item.href}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
