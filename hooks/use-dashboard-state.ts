import { useState, useCallback } from "react";
import { LogRequestParams, SortType } from "@/lib/server/kibana/search";
import { PlayerBetTxnInfoProps } from "@/types/player-bet-info";

export function useDashboardState() {
    const [activeTab, setActiveTab] = useState("rounds");
    const [logPayload, setLogPayload] = useState<LogRequestParams | null>(null);
    const [queryParams, setQueryParams] = useState<PlayerBetTxnInfoProps | null>(null);
    const syncRoundToLogs = useCallback((roundId: string) => {
        setLogPayload((prev) => {
            const base: LogRequestParams = prev ?? {
                index: "filebeat-*",
                query: "",
                sort: "asc" as SortType,
                startDate: "", // Added to satisfy LogRequestParams
                endDate: "",   // Added to satisfy LogRequestParams
            };

            return {
                ...base,
                query: `round_id: "${roundId}"`,
            };
        });
        setActiveTab("logs");
    }, []);

    // Helper to handle the Round Form submission logic
    const handleBoFormSubmit = (data: PlayerBetTxnInfoProps) => {
        const finalData = {
            ...data,
            user_id: data.gameParamId === "round_id" ? "" : data.user_id
        };
        setQueryParams(finalData);
        setActiveTab("rounds");
    };

    // Helper to handle the Kibana Form submission logic
    const handleKibanaFormSubmit = (data: LogRequestParams, sortOrder: SortType) => {
        setLogPayload({ ...data, sort: sortOrder });
        setActiveTab("logs");
    };

    return {
        activeTab,
        setActiveTab,
        logPayload,
        setLogPayload,
        queryParams,
        setQueryParams,
        syncRoundToLogs,
        handleBoFormSubmit,
        handleKibanaFormSubmit
    };
}