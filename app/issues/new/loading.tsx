import { Skeleton } from "@/app/components/Skeleton";
import { Box } from "@radix-ui/themes";

const CreatedIssuePageLoading = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Skeleton height="20rem" />
    </Box>
  );
};

export default CreatedIssuePageLoading;
