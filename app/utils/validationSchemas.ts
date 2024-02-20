import { z } from "zod";

export const IssueSchema = z.object({
  title: z.string().min(1, "1글자 이상 입력해야합니다").max(255),
  description: z.string().min(3, "3글자 이상 입력해야합니다."),
});
