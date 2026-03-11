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
    const isRootRoute = pathname === "/";

    // Scenario A: No session and trying to access protected routes
    if (!hasSession && !isRootRoute) {
      router.push("/"); 
      // Note: Usually, if no session exists, you'd send them back to the form (/)
    } 
    
    // Scenario B: Session exists and user is sitting on the login/form page (/)
    else if (hasSession && isRootRoute) {
      router.push("/casino-details");
    } 

    // Scenario C: Everything is fine, stop the loading state
    else {
      // Small timeout to prevent flicker during fast transitions
      const timer = setTimeout(() => setIsChecking(false), 500);
      return () => clearTimeout(timer);
    }
  }, [pathname, router]);

  // Prevent rendering children while redirecting or checking
  // This avoids a "flash" of the form if the user is already logged in
  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-sm text-muted-foreground animate-pulse">Verifying session...</p>
      </div>
    );
  }

  return <>{children}</>;
}