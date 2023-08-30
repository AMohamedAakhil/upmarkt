import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const Loading = () => {
  return (
    <div className="p-5">
        <Skeleton className="w-[300px] h-[50px] rounded-md" />
        <Skeleton className="w-[200px] h-[20px] rounded-md mt-2" />
        <Skeleton className="w-full h-[50rem] rounded-md mt-5" />
    </div>
  )
}

export default Loading