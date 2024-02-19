import prisma from "@/prisma/client";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  issueId: number;
}

const EditIssueButton = async ({ issueId }: Props) => {
  return (
    <div>
      <Button>
        <Pencil2Icon />
        <Link href={`/issues/${issueId}/edit`}>Edit Issue</Link>
      </Button>
    </div>
  );
};

export default EditIssueButton;
