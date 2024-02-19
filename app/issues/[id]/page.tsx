import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Card, Heading, Text, Flex } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
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
      <Heading>{issue.title}</Heading>
      <Flex my="2" className="space-x-3 my-30" style={{ marginTop: "20px" }}>
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card style={{ marginTop: "15px" }}>
        <p>{issue.description}</p>
      </Card>
    </div>
  );
};

export default IssueDetailPage;
