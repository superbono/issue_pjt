import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Card, Heading, Text, Flex, Grid, Button, Box } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import ReactMarkdown from "react-markdown";
import EditIssueButton from "./EditIssueButton";
import IssueDetail from "./IssueDetail";
import { Metadata } from "next";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import AuthOptions from "@/app/auth/AuthOptions";
import AssigneeSelect from "./AssigneeSelect";

export const metadata: Metadata = {
  title: "Issue Detail Page",
  description: "이슈 디테일 페이지입니다",
};

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(AuthOptions);
  const numbericId = parseInt(params.id, 10);

  if (isNaN(numbericId) || numbericId.toString() !== params.id) {
    notFound();
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return (
    <div>
      <Grid columns={{ initial: "1", md: "5" }} gap="5">
        {/* <Box className="md:col-span-4"> */}
        <Box className="lg:col-span-4">
          <IssueDetail issue={issue} />
        </Box>
        {session && (
          <Box className="col-span-1">
            <Flex direction="column" gap="2">
              <AssigneeSelect issue={issue} />
              <EditIssueButton issueId={issue.id} />
              <DeleteIssueButton issueId={issue.id} />
            </Flex>
          </Box>
        )}
      </Grid>
    </div>
  );
};

export default IssueDetailPage;
