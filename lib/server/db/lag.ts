import { getSessionData } from "@/utils/storage/local/session-operations";

export async function c_isDbLagging() {
    const session = getSessionData();

    const params = new URLSearchParams({
        jsessionId: session.jsessionId,
    });

    const response = await fetch(`/api/pre-live/db-lag?${params.toString()}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch transaction info");
    }

    return response.json();
}