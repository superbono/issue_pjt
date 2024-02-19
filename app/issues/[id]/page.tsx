import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Card, Heading, Text, Flex, Grid, Button, Box } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import ReactMarkdown from "react-markdown";

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
      <Grid columns={{ initial: "1", md: "2" }} gap="5">
        <Box>
          <Heading>{issue.title}</Heading>
          <Flex my="2" className="space-x-3 my-30" mt="5">
            <IssueStatusBadge status={issue.status} />
            <Text>{issue.createdAt.toDateString()}</Text>
          </Flex>
          <Card className="prose" mt="4">
            <ReactMarkdown>{issue.description}</ReactMarkdown>
          </Card>
        </Box>
        <Box>
          <Button>
            <Pencil2Icon />
            <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
          </Button>
        </Box>
      </Grid>
    </div>
  );
};

export default IssueDetailPage;
