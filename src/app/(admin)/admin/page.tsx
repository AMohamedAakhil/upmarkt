import React from "react";
import SamplePage from "./samplePage";

export default function Admin() {
  return (
    <div className="p-5">
      <h1 className="mb-5 text-xl">Dashboard</h1>
      <div>
        <SamplePage />
      </div>
    </div>
  );
}
