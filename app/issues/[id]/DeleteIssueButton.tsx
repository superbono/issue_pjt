"use client";

import prisma from "@/prisma/client";
import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  issueId: number;
}

const DeleteIssueButton = ({ issueId }: Props) => {
  const router = useRouter();
  const handleBackMove = () => {
    router.push("/issues");
  };
  return (
    <>
      <Button color="red">
        <TrashIcon />
        Delete Issue
      </Button>
    </>
  );
};

export default DeleteIssueButton;
