import { z } from "zod";

const CasinoDetailsEnum = z.enum([
  "getCasino",
  "getCasinoConfig",
  "getOneWalletCasino",
  "getCasinoTables",
]);

export const CasinoDetailsFormSchema = z.object({
  casinoId: z.string().min(1, "Casino ID is required"),
  details: CasinoDetailsEnum,
});

// Extract the type from the schema
export type CasinoDetailsFormType = z.infer<typeof CasinoDetailsFormSchema>;