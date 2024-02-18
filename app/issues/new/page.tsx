"use client";
import { Button, TextField } from "@radix-ui/themes";
import React from "react";
import { SimpleMdeReact } from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const IssuesNewPage = () => {
  return (
    <div className="max-w-xl space-y-2">
      <TextField.Root className="mb-3">
        <TextField.Input placeholder="title" />
      </TextField.Root>
      <SimpleMdeReact placeholder="Description" />
      <Button>Create New Issue</Button>
    </div>
  );
};

export default IssuesNewPage;
