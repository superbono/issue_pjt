"use client";
import { Button, TextField } from "@radix-ui/themes";
import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const IssuesNewPage = () => {
  const handleClick = () => {
    alert("클릭");
  };

  return (
    <div className="max-w-xl space-y-2">
      <TextField.Root className="mb-3">
        <TextField.Input placeholder="title" />
      </TextField.Root>
      <SimpleMDE placeholder="Description" />
      <Button onClick={handleClick}>Create New Issue</Button>
    </div>
  );
};

export default IssuesNewPage;
