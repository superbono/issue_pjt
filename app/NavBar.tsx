"use client";

import {
  Box,
  Flex,
  Container,
  DropdownMenu,
  Avatar,
  Text,
} from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { GoTasklist } from "react-icons/go";
import { Skeleton } from "./components/Skeleton";

/*
 로그인(GET) -> /api/auth/signin
 로그아웃(GET) -> /api/auth/signout
*/

const NavBar = () => {
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/" className="font-extrabold mr-2">
              <GoTasklist size={30} />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <ul className="flex space-x-6">
      {links.map((item) => (
        <li key={item.href}>
          <Link
            className={`${
              item.href === currentPath
                ? "text-zinc-900 font-medium"
                : "text-zinc-500"
            } hover:text-zinc-800 transition-colors`}
            href={item.href}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <Skeleton width="3rem" />;
  if (status === "unauthenticated")
    return <Link href="/api/auth/signin">Login</Link>;

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          {/*
            사용자 이미지가 존재하지 않는 상황을 대비해서 무조건 값이 할당되어있다는 표시로
            !를 추가하여 작성합니다.
          */}
          <Avatar
            src={session!.user!.image!}
            fallback="?"
            size="2"
            radius="full"
            className="cursor-pointer"
            referrerPolicy="no-referrer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text>{session!.user!.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Text>
              <Link href="/api/auth/signout">Logout</Link>
            </Text>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default NavBar;
