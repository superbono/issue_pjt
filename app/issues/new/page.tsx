import { Metadata } from "next";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

export const metadata: Metadata = {
  title: "New Page",
  description: "이슈 추가 페이지입니다",
};

const IssuesNewPage = () => {
  return (
    <div className="max-w-xl">
      <IssueForm />
    </div>
  );
};

export default IssuesNewPage;
