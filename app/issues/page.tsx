import { Button } from "@radix-ui/themes";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Issues Page",
  description: "이슈 페이지입니다",
};

export default function IssuesPage() {
  return (
    <div>
      <p>Issues</p>
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </div>
  );
}
