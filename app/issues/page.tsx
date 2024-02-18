import { Button } from "@radix-ui/themes";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Issues Page",
  description: "이슈 페이지입니다",
};

export default function Issues() {
  return (
    <div>
      <p>Issues</p>
      <Button>Edit profile</Button>
    </div>
  );
}
