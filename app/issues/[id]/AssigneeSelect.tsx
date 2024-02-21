"use client";
import { Skeleton } from "@/app/components/Skeleton";
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
// import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

const AssigneeSelect = () => {
  // const [users, setUsers] = useState<User[]>([]);

  // useQuery 함수는 isLoading, error, data 반환
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    // 이전에 가져온 값을 갱신하려면 시간을 설정해야 서버에서 체크 가능
    staleTime: 60 * 1000,
    // 갱신된 데이터를 가져오는 것을 시도할 횟수 (실패할 수 있어서 체크)
    retry: 3,
  });

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const { data } = await axios.get<User[]>("/api/users");
  //     setUsers(data);
  //   };

  //   fetchUsers();
  // }, []);

  if (isLoading) return <Skeleton />;
  if (error) return null;

  return (
    <Select.Root>
      <Select.Trigger placeholder="담당자..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users?.map((user) => (
            <Select.Item value={user.id} key={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
