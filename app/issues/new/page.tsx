"use client";

import { Button, TextField } from "@radix-ui/themes";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
export const metadata: Metadata = {
  title: "New Page",
  description: "이슈 추가 페이지입니다",
};

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

interface IssueForm {
  title: string;
  description: string;
}

const IssuesNewPage = () => {
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const router = useRouter();

  return (
    <form
      className="max-w-xl space-y-2"
      onSubmit={handleSubmit(async (data) => {
        await axios.post("/api/issues", data);
        router.push("/issues");
      })}
    >
      <TextField.Root className="mb-3">
        <TextField.Input placeholder="Title" {...register("title")} />
      </TextField.Root>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
      />
      <Button type="submit">Create New Issue</Button>
    </form>
  );
};

export default IssuesNewPage;
