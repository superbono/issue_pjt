"use client";

import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";

const IssuesNewPage = () => {
  return (
    <div className="max-w-xl space-y-2">
      <TextField.Root className="mb-3">
        <TextField.Input placeholder="title" />
      </TextField.Root>
      <TextArea placeholder="Description" />
      <Button>Create New Issue</Button>
    </div>
  );
};

export default IssuesNewPage;
