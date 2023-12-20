"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const UserProfile = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push("/profile")}
      className="mt-1.5 cursor-pointer"
    >
      <h1 className="text-sm font-bold text-slate-500 -mb-1">My Account</h1>
      <Link href="/profile" className="text-xs text-slate-500">
        View Profile
      </Link>
    </div>
  );
};

export default UserProfile;
