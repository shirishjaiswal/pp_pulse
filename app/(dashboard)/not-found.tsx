import Link from "next/link";
import { Hammer, MoveLeft, TriangleAlert, Construction, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function NotFound() {
  return (
    <div className="flex h-[calc(100vh-12rem)] w-full flex-col items-center justify-center gap-6 px-4 text-center">
      {/* Development Badge */}
      <Badge variant="outline" className="flex items-center gap-2 border-yellow-500/50 bg-yellow-500/10 px-3 py-1 text-yellow-600 dark:text-yellow-400">
        <Construction className="h-3.5 w-3.5" />
        Site Under Development
      </Badge>

      <div className="relative">
        <div className="bg-muted flex h-24 w-24 items-center justify-center rounded-2xl rotate-3">
          <Hammer className="text-muted-foreground h-12 w-12 -rotate-12" />
        </div>
        <div className="absolute -bottom-2 -right-2 bg-background border-2 border-yellow-500 rounded-full p-1">
          <TriangleAlert className="h-5 w-5 text-yellow-500" />
        </div>
      </div>
      
      <div className="max-w-md space-y-3">
        <h2 className="text-4xl font-black tracking-tight">404: Missing Blueprint</h2>
        <p className="text-muted-foreground leading-relaxed">
          The page you're looking for hasn't been built yet! We are currently 
          <strong> polishing the gears</strong> and <strong>tightening the bolts</strong> of PP Pulse.
        </p>
        <div className="rounded-lg bg-secondary/50 p-3 text-xs font-mono text-muted-foreground border border-dashed border-muted-foreground/30">
          STATUS: ASYNC_BUILD_IN_PROGRESS // VER: 0.8.2-alpha
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <Button asChild variant="default" className="shadow-md">
          <Link href="/" className="flex items-center gap-2">
            <MoveLeft className="h-4 w-4" />
            Back to Base
          </Link>
        </Button>
        
        {/* Server-side "Refresh" via Link to the current path */}
        <Button asChild variant="outline">
          <Link href="" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Check for Updates
          </Link>
        </Button>
      </div>

      <p className="text-[10px] uppercase tracking-widest text-muted-foreground/50 mt-8">
        Thank you for your patience while we build the future of Casino Tracking.
      </p>
    </div>
  );
}