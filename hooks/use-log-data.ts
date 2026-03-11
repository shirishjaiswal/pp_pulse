import { c_getKibanaLogs, LogRequestParams } from "@/lib/server/kibana/search";
import { useQuery } from "@tanstack/react-query";

export function useLogData(params: LogRequestParams) {
  console.log("Hook received payload:", params);
  return useQuery({
    queryKey: ['logs', params],
    queryFn: () => c_getKibanaLogs(params),
    enabled: params != null,
    staleTime: 0,      
    gcTime: 0,        
    refetchOnMount: true,
    refetchOnWindowFocus: false, 
  });
}