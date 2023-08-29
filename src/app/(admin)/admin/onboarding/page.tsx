import React from "react";
import OnboardingForm from "./OnboardingForm";
import { currentUser } from "@clerk/nextjs";
const Onboarding = async () => {
  const user = await currentUser();
  const emailAddress = user?.emailAddresses[0]!.emailAddress!;
  return (
    <div className="p-5">
      <OnboardingForm emailAddress={emailAddress} />
    </div>
  );
};

export default Onboarding;
