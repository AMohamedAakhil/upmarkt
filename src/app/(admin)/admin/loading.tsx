import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <div className="p-5">
      <Skeleton className="h-[50px] w-[300px] rounded-md" />
      <Skeleton className="mt-5 h-[30px] w-[200px] rounded-md" />
    </div>
  );
};

export default Loading;
