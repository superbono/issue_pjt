"use client";

import prisma from "@/prisma/client";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  issueId: number;
}

const EditIssueButton = ({ issueId }: Props) => {
  const router = useRouter();
  const handleBackMove = () => {
    router.push("/issues");
  };
  return (
    <div className="space-x-2">
      <Button
        onClick={handleBackMove}
        style={{
          backgroundColor: "orange",
          cursor: "pointer",
        }}
      >
        Back
      </Button>
      <Button>
        <Pencil2Icon />
        <Link href={`/issues/${issueId}/edit`}>Edit Issue</Link>
      </Button>
    </div>
  );
};

export default EditIssueButton;
