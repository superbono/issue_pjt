import { Metadata } from "next";
import Pagination from "./components/Pagination";

export const metadata: Metadata = {
  title: "Main Page",
  description: "메인 페이지입니다.",
};

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  console.log(searchParams);
  return (
    <div>
      <Pagination
        itemCount={100}
        pageSize={10}
        currentPage={parseInt(searchParams.page)}
      />
    </div>
  );
}
