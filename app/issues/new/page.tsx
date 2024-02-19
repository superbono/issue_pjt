import { Metadata } from "next";
import "easymde/dist/easymde.min.css";
import IssueForm from "../_components/IssueForm";

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
