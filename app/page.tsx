import { Metadata } from "next";
import LatestIssues from "./LatestIssues";

export const metadata: Metadata = {
  title: "Main Page",
  description: "메인 페이지입니다.",
};

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return <LatestIssues />;
}
