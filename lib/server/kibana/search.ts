import axios from "axios";
import { getSessionData } from "@/utils/storage/local/session-operations";

export const MATCH_PHRASE_OPTIONS = [
    "@timestamp",
  "message",
  "host.name",
  "contextMap.userId",
  "contextMap.ppenv",
  "log.offset",
  "servicename",
  "agent.type",
  "app.requestLog.log",
  "app.responseLog.log",
  "app.serviceMethod",
  "app.url"
] as const;
export type SortType = "asc" | "desc";
export type MatchPhraseField = typeof MATCH_PHRASE_OPTIONS[number];

export interface LogRequestParams {
    index: string;
    query: string;
    startDate: string;
    endDate: string;
    sort: SortType;
    fields?: MatchPhraseField[]
    matchPhrase?: { key: string, value: string }[];
}

export async function c_getKibanaLogs(data: LogRequestParams) {
    const session = getSessionData();
    const combinedCookie = [
        { key: "_oauth2_proxy_0", value: session.oAuthCookie1 },
        { key: "_oauth2_proxy_1", value: session.oAuthCookie2 },
        { key: "sid", value: session.sid }
    ]
        .filter(item => item.value)
        .map(item => `${item.key}=${item.value}`)
        .join(";");

    try {
        const response = await axios.post(`/api/kibana`, data, {
            params: {
                cookie : combinedCookie,
            },
            headers: {
                "Content-Type": "application/json"
            }
        });

        console.log(response)
        return response.data;

    } catch (error: any) {
        console.log("==========================================================================================")
        console.log(error)
        console.log("==========================================================================================")
        const errorMessage = error.response?.data?.error || "Failed to fetch transaction info";
        throw new Error(errorMessage);
    }
}