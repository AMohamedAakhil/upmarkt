import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <div className="w-full">
    <div>

    </div>
      <Skeleton className="h-[50px] w-full" />
    </div>
  );
};

export default Loading;
