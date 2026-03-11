"use client"

import { usePlayerBetTxnInfo } from "@/hooks/use-player-bet-txn-info"

export default function Test() {
    const { data } = usePlayerBetTxnInfo("30051024502008", "round_id");
    console.log(data)
    return <div>Test</div>
}