import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Main Page",
  description: "메인 페이지입니다.",
};

export default function Home() {
  return (
    <div>
      <p>Hello World!</p>
    </div>
  );
}
