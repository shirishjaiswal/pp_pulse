"use client";

import React, { useState, useMemo } from "react";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
    Database,
    Search,
    Terminal,
    Activity,
    AlertCircle,
    Loader2,
    RefreshCw
} from "lucide-react";

import { useLogData } from "@/hooks/use-log-data";
import { usePlayerBetTxnInfo } from "@/hooks/use-player-bet-txn-info";

import { KibanaSearchForm } from "./kibana/kibana-search-form";
import { RoundDetailsForm } from "./round/round-details-form";
import { LogResultsDashboard } from "./kibana/log-result-dashboard";
import { RoundDataDisplay } from "./round/round-data-diaplay";

import { PlayerBetTxnInfoProps } from "@/types/player-bet-info";
import { LogRequestParams, SortType } from "@/lib/server/kibana/search";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LogLoadingSkeleton } from "./kibana/log-skeleton";
import { ArrowDownAz, ArrowUpAz } from "lucide-react";

const validate = [
    "LATE BET"
]

export default function UnifiedBackOfficeDashboard() {
    const [activeTab, setActiveTab] = React.useState("rounds");
    const [logPayload, setLogPayload] = useState<LogRequestParams | null>(null);
    const [sortOrder, setSortOrder] = useState<SortType>("asc");
    const {
        data: logData,
        isLoading: isLogsLoading,
        error: logError,
        refetch,
        isRefetching
    } = useLogData(logPayload as LogRequestParams);

    const handleSortToggle = () => {
        const newOrder = sortOrder === "asc" ? "desc" : "asc";
        setSortOrder(newOrder as SortType);

        if (logPayload) {
            setLogPayload({
                ...logPayload,
                sort: newOrder
            });
        }
    };

    const handleKibanaFormSubmit = (data: LogRequestParams) => {
        setLogPayload({ ...data, sort: sortOrder });
        setActiveTab("logs");
    };
    const [queryParams, setQueryParams] =
        React.useState<PlayerBetTxnInfoProps | null>(null);

    const defaultParams: PlayerBetTxnInfoProps = {
        game_id: "",
        gameParamId: "round_id",
        playerParamId: "user_id",
        user_id: ""
    };

    const { data, isLoading, error } =
        usePlayerBetTxnInfo(queryParams || defaultParams);

    const handleBoFormSubmit = (data: PlayerBetTxnInfoProps) => {
        const finalData = {
            ...data,
            user_id: data.gameParamId === "round_id" ? "" : data.user_id
        };

        setQueryParams(finalData);
        setActiveTab("rounds");
    };

    return (
        <div className="flex flex-col h-screen bg-slate-50 overflow-y-auto">
            <main className="flex-1 flex flex-col p-0.5 gap-2 overflow-y-auto  mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    <Card className="shadow-sm border-slate-200 p-0 col-span-4">
                        <CardContent className="p-4">

                            <div className="flex items-center gap-2 mb-3 text-slate-500">
                                <Activity className="h-4 w-4" />
                                <span className="text-xs font-bold uppercase tracking-wider">
                                    Round Investigator
                                </span>
                            </div>
                            <RoundDetailsForm onSubmit={handleBoFormSubmit} />
                        </CardContent>
                    </Card>
                    <Card className="shadow-sm border-slate-200 col-span-8 p-0">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-3 text-slate-500">
                                <Terminal className="h-4 w-4" />
                                <span className="text-xs font-bold uppercase tracking-wider">
                                    Log Explorer
                                </span>
                            </div>
                            {/* <KibanaSearchForm
                                onSearch={handleKibanaFormSubmit}
                                initialValues={{
                                    index: "filebeat-*",
                                    query: "",
                                    sort: "asc"
                                }}
                            /> */}
                        </CardContent>
                    </Card>
                </div>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
                    <div className="flex items-center justify-between">
                        <TabsList className="bg-slate-200/60">
                            <TabsTrigger value="rounds" className="gap-2">
                                <Database className="h-4 w-4" /> Round Data
                            </TabsTrigger>
                            <TabsTrigger value="logs" className="gap-2">
                                <Search className="h-4 w-4" /> ELK Logs
                            </TabsTrigger>
                        </TabsList>

                        {/* 3. Render the Sort Button only when in Logs tab and data exists */}
                        {activeTab === "logs" && logPayload && !isLogsLoading && (
                            <div className="flex items-center gap-2 mr-1">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleSortToggle}
                                    className="gap-2 h-8 border-slate-300"
                                >
                                    {sortOrder === "asc" ? (
                                        <ArrowUpAz className="h-3.5 w-3.5" />
                                    ) : (
                                        <ArrowDownAz className="h-3.5 w-3.5" />
                                    )}
                                    <span className="text-xs uppercase font-bold">
                                        {sortOrder === "asc" ? "Asc" : "Desc"}
                                    </span>
                                </Button>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => refetch()}
                                    disabled={isLogsLoading || isRefetching}
                                    className="gap-2 h-8 shadow-sm"
                                >
                                    <RefreshCw className={cn("h-3.5 w-3.5", isRefetching && "animate-spin")} />
                                    Refresh
                                </Button>
                            </div>
                        )}
                    </div>
                    <TabsContent
                        value="rounds"
                        className="flex-1 min-h-0 mt-0 focus-visible:ring-0 overflow-y-auto p-1"
                    >
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center p-24 border border-dashed rounded-xl bg-muted/5 animate-pulse">
                                <Loader2 className="h-10 w-10 animate-spin text-primary/40" />
                                <p className="mt-4 text-sm font-medium text-muted-foreground tracking-tight">
                                    Syncing with BackOffice Ledger...
                                </p>
                            </div>
                        ) : error ? (
                            <Alert variant="destructive" className="border-red-200 bg-red-50/50">
                                <AlertCircle className="h-5 w-5" />
                                <AlertTitle className="font-bold">
                                    Fetch Failed
                                </AlertTitle>
                                <AlertDescription className="flex flex-col gap-3">

                                    <p>{error.message || "An unexpected error occurred."}</p>

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            setQueryParams({ ...queryParams } as any)
                                        }
                                        className="w-fit gap-2 bg-white hover:bg-red-50"
                                    >
                                        <RefreshCw className="h-3.5 w-3.5" />
                                        Retry Request
                                    </Button>

                                </AlertDescription>

                            </Alert>

                        ) : !data || !data.exists ? (

                            <div className="flex flex-col items-center justify-center p-16 text-center">

                                <div className="p-4 bg-slate-100 rounded-full mb-4">
                                    <Database className="h-8 w-8 text-slate-400" />
                                </div>

                                <h3 className="text-lg font-bold text-slate-900">
                                    No Round Selected
                                </h3>

                                <p className="text-sm text-slate-500 max-w-xs">
                                    Enter a valid Round ID above to pull real-time data from the BackOffice.
                                </p>

                            </div>

                        ) : (
                            <RoundDataDisplay data={data} />
                        )}

                    </TabsContent>

                    <TabsContent
                        value="logs"
                        className="flex-1 min-h-0 mt-0 flex flex-col overflow-hidden focus-visible:ring-0"
                    >
                        <div className="flex-1 min-h-0 relative overflow-auto">
                            {isLogsLoading ? (
                                <LogLoadingSkeleton />
                            ) : (
                                <>
                                    {!logPayload && (
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

                                    {logError && (
                                        <Alert variant="destructive" className="border-2 shadow-lg">
                                            <AlertCircle className="h-4 w-4" />
                                            <AlertTitle>Query Failed</AlertTitle>
                                            <AlertDescription className="font-mono text-xs mt-2">
                                                {logError instanceof Error ? logError.message : "ELK connection error."}
                                            </AlertDescription>
                                        </Alert>
                                    )}

                                    {logData && !isRefetching && (
                                        <div className="flex-1 flex flex-col min-h-0 animate-in fade-in duration-500 overflow-auto">
                                            <LogResultsDashboard data={logData} />
                                        </div>
                                    )}
                                </>
                            )}

                            {/* Keep the refetching overlay separate for "Refresh" clicks */}
                            {isRefetching && !isLogsLoading && (
                                <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] z-30 flex items-center justify-center rounded-xl">
                                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                </div>
                            )}
                        </div>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
}