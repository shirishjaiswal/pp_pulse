"use client";

import React, { useState, useCallback, useMemo } from "react";
import { Loader2, Database, AlertCircle, RefreshCw, FileText, Search } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { KibanaSearchForm } from "./kibana-search-form";
import { LogDashboardProps, LogResultsDashboard } from "./log-result-dashboard";
import { useLogData } from "@/hooks/use-log-data";
import { cn } from "@/lib/utils";

export default function KibanaLogWrapper() {
  const [payload, setPayload] = useState<any>(null);

  const { data, isLoading, error, refetch, isRefetching } = useLogData(payload);

  const handleSearch = useCallback((newPayload: any) => {
    setPayload(newPayload);
  }, []);
  const logCount = useMemo(() => data?.length || 0, [data]);

  return (
    <div className="flex flex-col h-screen bg-slate-50/50 p-4 lg:p-6 gap-4 overflow-hidden">
{/*       
      <KibanaSearchForm
        onSearch={handleSearch}
        initialValues={{ index: "filebeat-*", query: "" }}
      /> */}

      {/* HEADER SECTION */}
      <div className="flex items-center justify-between px-1">
        {payload && (
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] font-bold text-muted-foreground uppercase">Results</p>
              <p className="text-sm font-mono font-bold">{logCount} hits</p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => refetch()} 
              disabled={isLoading || isRefetching}
              className="gap-2 shadow-sm"
            >
              <RefreshCw className={cn("h-3.5 w-3.5", isRefetching && "animate-spin")} />
              Refresh
            </Button>
          </div>
        )}
      </div>



      {/* RESULTS AREA */}
      <div className="flex-1 min-h-0 relative">
        {/* INITIAL STATE */}
        {!payload && !isLoading && (
          <div className="flex flex-col items-center justify-center h-full border-2 border-dashed rounded-2xl bg-white">
            <div className="bg-slate-100 p-4 rounded-full mb-4">
              <Search className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold">Ready to Query</h3>
            <p className="text-sm text-muted-foreground max-w-[250px] text-center mt-1">
              Configure your index and time range above to start fetching logs.
            </p>
          </div>
        )}

        {/* LOADING OVERLAY (for refetching) */}
        {isRefetching && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] z-30 flex items-center justify-center rounded-xl">
             <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {/* LOADING (Initial) */}
        {isLoading && !isRefetching && (
          <div className="flex flex-col items-center justify-center h-full border rounded-2xl bg-white shadow-sm">
            <Loader2 className="h-10 w-10 animate-spin text-primary/40" />
            <p className="mt-4 text-sm font-medium animate-pulse text-slate-500">
              Fetching from Elasticsearch...
            </p>
          </div>
        )}

        {/* ERROR */}
        {!isLoading && error && (
          <Alert variant="destructive" className="border-2 shadow-lg">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Query Failed</AlertTitle>
            <AlertDescription className="font-mono text-xs mt-2">
              {error instanceof Error ? error.message : "Possible timeout or connection error to the ELK cluster."}
            </AlertDescription>
          </Alert>
        )}

        {/* EMPTY STATE */}
        {!isLoading && !error && payload && logCount === 0 && (
          <div className="flex flex-col items-center justify-center h-full border rounded-2xl bg-white shadow-sm">
            <Database className="h-12 w-12 text-slate-200 mb-4" />
            <h3 className="text-lg font-semibold tracking-tight text-slate-400">
              No Logs Found
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Adjust your filters or try a wider time range.
            </p>
          </div>
        )}

        {/* RESULTS */}
        {!isLoading && !error && data && logCount > 0 && (
          <div className="h-full flex flex-col animate-in fade-in duration-500">
            {/* <LogResultsDashboard data={data as LogDashboardProps} /> */}
          </div>
        )}
      </div>
    </div>
  );
}