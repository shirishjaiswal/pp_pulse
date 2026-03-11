import { useQuery } from "@tanstack/react-query";
import { CasinoDetails } from "@/types/casino/details";
import { CasinoDetailsFormType } from "@/types/casino/casino-details-input";
import { casinoConfigKeys } from "@/lib/query-key/casino-config";
import { c_getCasinoDetails } from "@/lib/server/casino/details";
import { CasinoConfig } from "@/types/casino/config";
import { OneWalletConfig } from "@/types/casino/one-wallet-config";
import { GameConfig } from "@/types/casino/game-config";

export function useCasinoDetails(params: CasinoDetailsFormType | null) {
  return useQuery<CasinoDetails | CasinoConfig | OneWalletConfig | GameConfig[], Error>({
    queryKey: params 
      ? casinoConfigKeys.list(params.casinoId, params.details)
      : casinoConfigKeys.all,

    queryFn: () => {
      if (!params) throw new Error("No parameters provided");
      return c_getCasinoDetails(params);
    },

    // Gatekeeper: Query remains 'idle' until we have a valid casinoId
    enabled: !!params?.casinoId,
    
    // Optional: Keep previous data while fetching new tabs for a smoother UI
    placeholderData: (previousData) => previousData,
  });
}