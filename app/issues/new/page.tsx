"use client";

import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createIssueSchema } from "@/app/utils/validationSchemas";
import ErrorMessage from "@/app/components/ErrorMessage";

export const metadata: Metadata = {
  title: "New Page",
  description: "이슈 추가 페이지입니다",
};

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

// interface IssueForm {
//   title: string;
//   description: string;
// }

type IssueForm = z.infer<typeof createIssueSchema>;

const IssuesNewPage = () => {
  const {
    register,
    resetField,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleResetClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    resetField("title");
    resetField("description");
  };

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form
        className="max-w-xl space-y-2"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setError("예상치 못한 오류가 발생했습니다.");
            resetField("title");
            resetField("description");
          }
        })}
      >
        <TextField.Root className="mb-3">
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <div className="flex justify-end space-x-2">
          <Button
            onClick={handleResetClick}
            style={{ backgroundColor: "orange" }}
          >
            Cancle
          </Button>
          <Button>Create New Issue</Button>
        </div>
      </form>
    </div>
  );
};

export default IssuesNewPage;
