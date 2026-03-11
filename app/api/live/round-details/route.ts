import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
    const { roundId, gameId, jsessionId } = await request.json();
    const BO_BASE = process.env.BACK_OFFICE_LIVE_URL;

    try {
        const headers = {
            "Cookie": `JSESSIONID=${jsessionId}`,
            "X-Requested-With": "XMLHttpRequest",
            "Referer": `${BO_BASE}/liveadminconsole/reports/PlayerBetsAndTxnsOfAGame.jsp`,
            "Accept": "*/*",
            "User-Agent": "Mozilla/5.0"
        };

        const settlementResponse = await axios.get(
            `${BO_BASE}/api/playerBetTxnInfo/getTxnSettlementInfo`,
            {
                params: { gameId, typeParam: "round_id", typeParamValue: roundId },
                headers
            }
        );
        return NextResponse.json(settlementResponse.data);
    } catch (error: any) {
        console.log(error)
        return NextResponse.json(
            { error: error.response?.data || error.message },
            { status: 500 }
        );
    }
}