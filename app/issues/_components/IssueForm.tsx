"use client";

import { Button, Callout, TextField } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { IssueSchema } from "@/app/utils/validationSchemas";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { Issue } from "@prisma/client";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type IssueFormData = z.infer<typeof IssueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const {
    register,
    resetField,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(IssueSchema),
  });
  const [error, setError] = useState("");
  const [issueSubmited, setIssueSubmited] = useState(false);
  const router = useRouter();

  const handleResetClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    resetField("title");
    resetField("description");
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIssueSubmited(true);
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setIssueSubmited(false);
      setError("예상치 못한 오류가 발생했습니다.");
      resetField("title");
      resetField("description");
    }
  });

  return (
    <>
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form className="max-w-xl space-y-2" onSubmit={onSubmit}>
        <TextField.Root className="mb-3">
          <TextField.Input
            defaultValue={issue?.title}
            placeholder="Title"
            {...register("title")}
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          defaultValue={issue?.description}
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <div className="flex justify-end space-x-2">
          <Button
            onClick={handleResetClick}
            style={{ backgroundColor: "orange", cursor: "pointer" }}
          >
            Cancle
          </Button>
          <Button disabled={issueSubmited} style={{ cursor: "pointer" }}>
            {!issue ? "Create New" : "Update"} Issue{" "}
            {issueSubmited && <Spinner />}
          </Button>
        </div>
      </form>
    </>
  );
};

export default IssueForm;
