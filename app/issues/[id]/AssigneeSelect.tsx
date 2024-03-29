"use client";
import { Skeleton } from "@/app/components/Skeleton";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
// import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  // const [users, setUsers] = useState<User[]>([]);

  // useQuery 함수는 isLoading, error, data 반환
  const { data: users, error, isLoading } = useUsers();

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const { data } = await axios.get<User[]>("/api/users");
  //     setUsers(data);
  //   };

  //   fetchUsers();
  // }, []);

  const assignIssue = (userId: string) => {
    axios
      .patch("/api/issues/" + issue.id, {
        assignedToUserId: userId === "unassigned" ? null : userId,
      })
      .catch(() => {
        toast.error("담당자 업데이트에 문제가 발생했습니다.");
      });
  };

  if (isLoading) return <Skeleton />;
  if (error) return null;

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || "unassigned"}
        onValueChange={assignIssue}
      >
        <Select.Trigger placeholder="담당자..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="unassigned">
              담당자가 존재하지 않습니다.
            </Select.Item>
            {users?.map((user) => (
              <Select.Item value={user.id} key={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    // 이전에 가져온 값을 갱신하려면 시간을 설정해야 서버에서 체크 가능
    staleTime: 60 * 1000,
    // 갱신된 데이터를 가져오는 것을 시도할 횟수 (실패할 수 있어서 체크)
    retry: 3,
  });

export default AssigneeSelect;
