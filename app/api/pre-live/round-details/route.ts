import { NextResponse } from "next/server";
import axios from "axios";
import { PlayerBetTxnResponseSchema } from "@/types/round-details";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const gameId = searchParams.get("gameId");
    const jsessionId = searchParams.get("jsessionId");
    const playerParamId = searchParams.get("playerParamId") || "user_id";
    const playerParamValue = searchParams.get("playerParamValue") || "";
    const typeParam = searchParams.get("typeParam") || "round_id";
    
    const BO_BASE = process.env.BACK_OFFICE_PRELIVE_URL;
    
    if (!gameId || !jsessionId) {
        return NextResponse.json(
            { error: "Session Expired or Missing Parameters." },
            { status: 400 }
        );
    }
    
    try {
        const headers = {
            "Cookie": `JSESSIONID=${jsessionId}`,
            "X-Requested-With": "XMLHttpRequest",
            "Referer": `${BO_BASE}/liveadminconsole/reports/PlayerBetsAndTxnsOfAGame.jsp`,
            "Accept": "*/*",
            "User-Agent": "Mozilla/5.0"
        };

        const commonParams = { gameId, playerParamId, playerParamValue, typeParam };
        
        // 1. Existence Check
        const gameExistCheck = await axios.get(
            `${BO_BASE}/api/playerBetTxnInfo/checkIfGameAndPlayerExists`,
            { params: commonParams, headers }
        );


        const existsData = gameExistCheck.data;

        if (!existsData || existsData.success === false || !existsData.userId) {
            return NextResponse.json(
                { error: `Round ID ${gameId} not found in the BackOffice.` },
                { status: 404 }
            );
        }

        // 2. Parallel Data Fetching
        const [betsInfo, progressInfo, settlementInfo] = await Promise.all([
            axios.get(`${BO_BASE}/api/playerBetTxnInfo/getPlayerBetsAndTxnsOfAGame`, { params: commonParams, headers }),
            axios.get(`${BO_BASE}/api/playerBetTxnInfo/getGameProgressInfo`, { params: commonParams, headers }),
            axios.get(`${BO_BASE}/api/playerBetTxnInfo/getTxnSettlementInfo`, { params: commonParams, headers })
        ]);

        // 3. --- ZOD VALIDATION LAYER ---
        const rawData = {
            exists: existsData,
            bets: betsInfo.data,
            progress: progressInfo.data,
            settlements: settlementInfo.data
        };

        const validatedData = PlayerBetTxnResponseSchema.safeParse(rawData);

        if (!validatedData.success) {
            return NextResponse.json(
                {
                    error: "Data integrity check failed.",
                    details: validatedData.error.issues.map(issue =>
                        `${issue.path.join('.')}: ${issue.message}`
                    )
                },
                { status: 422 }
            );
        }

        return NextResponse.json(validatedData.data);

    } catch (error: any) {
        console.error("BO API Failure:", error.response?.data || error.message);
        const status = error.response?.status || 500;

        if (status === 401 || status === 403) {
            return NextResponse.json({ error: "Your BO session has expired." }, { status: 401 });
        }

        return NextResponse.json({ error: "Failed to fetch round data." }, { status });
    }
}