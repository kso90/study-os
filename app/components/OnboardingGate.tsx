"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isOnboardingComplete } from "../lib/onboarding";

export default function OnboardingGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (isOnboardingComplete()) {
      setReady(true);
    } else {
      router.replace("/onboarding");
    }
  }, [router]);

  if (!ready) return <div className="min-h-screen bg-linen" />;
  return <>{children}</>;
}
