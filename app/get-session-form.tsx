"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { setSessionData } from "@/utils/storage/local/session-operations";

// 1. Zod Schema for validation
const sessionSchema = z.object({
  jsessionId: z.string().min(1, "JSessionID is required"),
  oAuthCookie1: z.string().min(1, "oAuthCookie1 is required"),
  oAuthCookie2: z.string().min(1, "oAuthCookie2 is required"),
  sid: z.string().min(1, "Sid is required"),
});

type SessionData = z.infer<typeof sessionSchema>;

export default function GetSessionForm() {
  // 2. Manual State Management
  const [formData, setFormData] = useState<SessionData>({
    jsessionId: "",
    oAuthCookie1: "",
    oAuthCookie2: "",
    sid: "",
  });

  const [isSaved, setIsSaved] = useState(false);

  // 3. Load from Local Storage on mount
  useEffect(() => {
    const saved = localStorage.getItem("session_config");
    if (saved) {
      setTimeout(() => {
        setFormData(JSON.parse(saved));
        setIsSaved(true);
      }, 0);
    }
  }, []);

  // 4. Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // 5. Manual Submission & Validation
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const result = sessionSchema.safeParse(formData);

    if (!result.success) {
      const firstError = result.error.issues[0].message;
      toast.error(firstError);
      return;
    }
    setSessionData(
      formData.jsessionId,
      formData.oAuthCookie1,
      formData.oAuthCookie2,
      formData.sid
    );
    setIsSaved(true);
    toast.success("Session data stored locally");
  };

  const handleClear = () => {
    localStorage.removeItem("session_config");
    setFormData({
      jsessionId: "",
      oAuthCookie1: "",
      oAuthCookie2: "",
      sid: "",
    });
    setIsSaved(false);
    toast.info("Cleared local storage");
  };

  return (
    // Wrapper to center the form on the page
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-slate-50">
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Session Manager</CardTitle>
            {isSaved && (
              <span className="text-[10px] bg-green-500/10 text-green-600 px-2 py-0.5 rounded border border-green-200 uppercase font-bold">
                Stored
              </span>
            )}
          </div>
          <CardDescription>
            Manage your Backoffice and Kibana session tokens.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form id="session-form" onSubmit={handleSave} className="space-y-6">
            {/* Backoffice Section */}
            <div className="space-y-3">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-tight">
                Backoffice
              </p>
              <div className="grid gap-1.5">
                <Label htmlFor="jsessionId">JSessionID</Label>
                <Input
                  id="jsessionId"
                  value={formData.jsessionId}
                  onChange={handleChange}
                  placeholder="Paste JSessionID..."
                />
              </div>
            </div>

            <div className="h-px bg-border w-full" />

            {/* Kibana Section */}
            <div className="space-y-3">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-tight">
                Kibana
              </p>
              <div className="grid gap-1.5">
                <Label htmlFor="oAuthCookie1">oAuthCookie1</Label>
                <Input
                  id="oAuthCookie1"
                  value={formData.oAuthCookie1}
                  onChange={handleChange}
                  placeholder="Enter oAuthCookie1"
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="oAuthCookie2">oAuthCookie2</Label>
                <Input
                  id="oAuthCookie2"
                  value={formData.oAuthCookie2}
                  onChange={handleChange}
                  placeholder="Enter oAuthCookie2"
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="sid">Sid</Label>
                <Input
                  id="sid"
                  value={formData.sid}
                  onChange={handleChange}
                  placeholder="Enter Sid"
                />
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <Button form="session-form" type="submit" className="w-full">
            Save Session Data
          </Button>
          {isSaved && (
            <Button
              variant="ghost"
              onClick={handleClear}
              className="w-full text-muted-foreground hover:text-destructive"
            >
              Delete Saved Data
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
