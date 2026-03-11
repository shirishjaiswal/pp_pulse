import Link from "next/link";
import { Hammer, MoveLeft, TriangleAlert, Construction, RefreshCw, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[calc(100vh-12rem)] w-full flex-col items-center justify-center gap-8 px-4 py-12 text-center overflow-hidden">
      
      {/* Background Spotlight Glow */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-500/5 blur-[120px]" />

      <div className="flex flex-col items-center gap-6">
        <Badge variant="outline" className="flex items-center gap-2 border-yellow-500/50 bg-yellow-500/10 px-3 py-1 text-yellow-600 dark:text-yellow-400 animate-pulse">
          <Construction className="h-3.5 w-3.5" />
          Site Under Development
        </Badge>

        <div className="relative">
          <div className="bg-muted flex h-24 w-24 items-center justify-center rounded-2xl rotate-3 shadow-inner">
            <Hammer className="text-muted-foreground h-12 w-12 -rotate-12" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-background border-2 border-yellow-500 rounded-full p-1 shadow-lg">
            <TriangleAlert className="h-5 w-5 text-yellow-500" />
          </div>
        </div>
        
        <div className="max-w-md space-y-3">
          <h2 className="text-4xl font-black tracking-tight lg:text-5xl">404: Missing Blueprint</h2>
          <p className="text-muted-foreground leading-relaxed">
            The page you're looking for hasn't been built yet! We are currently 
            <strong> polishing the gears</strong> and <strong>tightening the bolts</strong> of PP Pulse.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild variant="default" size="lg" className="shadow-lg hover:scale-105 transition-transform">
            <Link href="/" className="flex items-center gap-2">
              <MoveLeft className="h-4 w-4" />
              Back to Base
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg">
            <Link href="" className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Check for Updates
            </Link>
          </Button>
        </div>
      </div>

      {/* --- SPOTLIGHT CONTACT SECTION --- */}
      {/* --- COMPACT INLINE SPOTLIGHT --- */}
<div className="group relative mt-6 flex items-center justify-center">
  {/* Subtle glow/spotlight under the inline element */}
  <div className="absolute -inset-x-4 -inset-y-2 rounded-full bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-yellow-500/20 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100"></div>

  <div className="relative flex items-center gap-3 rounded-full border border-border bg-card/50 px-4 py-2 shadow-sm backdrop-blur-sm transition-all hover:border-yellow-500/50 hover:shadow-md">
    {/* Avatar/Icon Section */}
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500/10 text-yellow-600 dark:text-yellow-400">
      <User className="h-4 w-4" />
    </div>

    {/* Text Section */}
    <div className="flex flex-col items-start leading-tight">
      <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground/80">Developer</span>
      <span className="text-sm font-semibold tracking-tight">Shirish Jaiswal</span>
    </div>

    {/* Inline Divider */}
    <div className="h-6 w-[1px] bg-border mx-1"></div>

    {/* Compact Action */}
    <a 
      href="mailto:shirish.jaiswal@example.com" 
      className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
    >
      <Mail className="h-3.5 w-3.5" />
      <span>Get Access</span>
    </a>
  </div>
</div>

      <p className="text-[10px] uppercase tracking-widest text-muted-foreground/40 mt-4 italic">
        Building the future of Casino Tracking // PP Pulse 0.8.2-alpha
      </p>
    </div>
  );
}