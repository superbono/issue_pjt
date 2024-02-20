"use client";

import prisma from "@/prisma/client";
import { TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface Props {
  issueId: number;
}

const DeleteIssueButton = ({ issueId }: Props) => {
  const [error, setError] = useState("");
  const router = useRouter();
  const [errorStatus, setErrorStatus] = useState(false);

  const onDelete = async () => {
    try {
      setErrorStatus(false);
      await axios.delete(`/api/issues/${issueId}`);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setErrorStatus(true);
      setError("예상치 못한 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red">
            <TrashIcon />
            Delete Issue
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Delete</AlertDialog.Title>
          <AlertDialog.Description>
            정말 삭제하시겠습니까?
          </AlertDialog.Description>
          <Flex mt="4" gap="2">
            <AlertDialog.Action>
              <Button onClick={onDelete} variant="soft" color="orange">
                확인
              </Button>
            </AlertDialog.Action>
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                취소
              </Button>
            </AlertDialog.Cancel>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={errorStatus}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            이슈를 삭제할 수 없습니다. (오류 발생)
          </AlertDialog.Description>
          <Button
            onClick={() => setErrorStatus(false)}
            mt="4"
            variant="soft"
            color="gray"
          >
            확인
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
