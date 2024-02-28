import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Card, Heading, Text, Flex, Grid, Button, Box } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { cache } from "react";
import ReactMarkdown from "react-markdown";
import EditIssueButton from "./EditIssueButton";
import IssueDetail from "./IssueDetail";
import { Metadata } from "next";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import AuthOptions from "@/app/auth/AuthOptions";
import AssigneeSelect from "./AssigneeSelect";

interface Props {
  params: { id: string };
}

const fetchUser = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(AuthOptions);
  const numbericId = parseInt(params.id, 10);

  if (isNaN(numbericId) || numbericId.toString() !== params.id) {
    notFound();
  }

  const issue = await fetchUser(parseInt(params.id));

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

export async function generateMetadata({ params }: Props) {
  const issues = await fetchUser(parseInt(params.id));

  // console.log(issues[0].title);

  return {
    title: issues?.title,
    description: "이슈 상세페이지 - " + issues?.id + "번째 게시물",
  };
}

// export const metadata: Metadata = {
//   title: "Issue Detail Page",
//   description: "이슈 디테일 페이지입니다",
// };

export default IssueDetailPage;
