"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isSessionDataPresent } from "@/utils/storage/local/session-operations";

export default function SessionValidation({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState<boolean>(true);

  useEffect(() => {
    const hasSession = isSessionDataPresent();

    // 1. Define "Public" routes that don't need a session (like Login or Home)
    const isPublicRoute = pathname === "/" || pathname === "/login";

    if (!hasSession && !isPublicRoute) {
      // 2. Redirect to home if session is missing and route is private
      router.push("/");
    } else {
      // 3. Allow rendering
      setTimeout(() => setIsChecking(false), 500);
    }
  }, [pathname, router]);

  // Prevent "flicker" of private content while checking localStorage
  if (isChecking && pathname !== "/") {
    return null; // Or a loading spinner
  }

  return <>{children}</>;
}
