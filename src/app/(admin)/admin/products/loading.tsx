import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const Loading = () => {
  return (
    <div className="p-5">
        <div className="flex justify-between items-center">
        <div>
        <Skeleton className="w-[300px] h-[50px] rounded-md" />
        <Skeleton className="w-[200px] h-[20px] rounded-md mt-2" />
        </div>
        <Skeleton className="w-[150px] h-[40px] rounded-md mt-2" />
        </div>
        <Skeleton className="w-full h-screen rounded-md mt-5" />
    </div>
  )
}

export default Loading