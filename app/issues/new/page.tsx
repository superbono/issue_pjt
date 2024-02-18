"use client";

import { Button, TextField } from "@radix-ui/themes";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import React from "react";

export const metadata: Metadata = {
  title: "New Page",
  description: "이슈 추가 페이지입니다",
};

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const IssuesNewPage = () => {
  const handleClick = () => {
    alert("클릭");
  };

  return (
    <div className="max-w-xl space-y-2">
      <TextField.Root className="mb-3">
        <TextField.Input placeholder="Title" />
      </TextField.Root>
      <SimpleMDE placeholder="Description" />
      <Button onClick={handleClick}>Create New Issue</Button>
    </div>
  );
};

export default IssuesNewPage;
