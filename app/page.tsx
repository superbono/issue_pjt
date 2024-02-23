import { Metadata } from "next";
import LatestIssues from "./LatestIssues";
import IssueSummary from "./IssueSummary";
import prisma from "@/prisma/client";
import IssueChart from "./IssueChart";

export const metadata: Metadata = {
  title: "Main Page",
  description: "메인 페이지입니다.",
};

export default async function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });

  return (
    <>
      <IssueSummary open={open} inProgress={inProgress} closed={closed} />
      <LatestIssues />
      <IssueChart open={open} inProgress={inProgress} closed={closed} />
    </>
  );
}
