import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <div className="p-5">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-[50px] w-[300px] rounded-md" />
          <Skeleton className="mt-2 h-[20px] w-[200px] rounded-md" />
        </div>
        <Skeleton className="mt-2 h-[40px] w-[150px] rounded-md" />
      </div>
      <Skeleton className="mt-5 h-screen w-full rounded-md" />
    </div>
  );
};

export default Loading;
