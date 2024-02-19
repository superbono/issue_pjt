import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import { Metadata } from "next";
import IssueActions from "./IssueActions";
import { Link, IssueStatusBadge } from "../components";

export const metadata: Metadata = {
  title: "Issues Page",
  description: "이슈 페이지입니다",
};

export default async function IssuesPage() {
  const issues = await prisma.issue.findMany();

  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              CreatedAt(생성일자)
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>
                  <>
                    {issue.title}
                    <div className="block md:hidden">
                      <IssueStatusBadge status={issue.status} />
                    </div>
                  </>
                </Link>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}
