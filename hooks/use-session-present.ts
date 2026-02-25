"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import isSessionDataPresent from "@/utils/storage/local/session-operations";

export function useSessionPresent() {
  const router = useRouter();

  useEffect(() => {
    const hasSession = isSessionDataPresent();

    if (!hasSession) {
      router.push("/");
    }
  }, [router]);
}
