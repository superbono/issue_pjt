import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";

export const metadata: Metadata = {
  title: "Issue Edit Page",
  description: "이슈 수정 페이지입니다",
};

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return (
    <div className="max-w-xl">
      <IssueForm issue={issue} />
    </div>
  );
};

export default EditIssuePage;
