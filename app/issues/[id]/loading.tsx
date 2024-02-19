import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const IssueDetailPageLoading = () => {
  return (
    <Box>
      <Skeleton width="10rem" />
      <Flex my="2" className="space-x-3 my-30" mt="5">
        <Skeleton width="5rem" />
        <Skeleton width="7rem" />
      </Flex>
      <Card className="prose" mt="4">
        <Skeleton count={3} />
      </Card>
    </Box>
  );
};

export default IssueDetailPageLoading;
