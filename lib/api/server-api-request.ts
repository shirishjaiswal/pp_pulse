"use server";

import { RequestHeader, RequestOptions, Response } from "@/types/response-types";
import axios from "axios";

async function serverApiRequest<T>({
    connection,
    cookie,
}: RequestOptions): Promise<Response<T>> {
    try {
        const SERVER_DOMAIN = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

        if (!SERVER_DOMAIN)
            throw new Error("Server endpoint is missing in environment variables");

        if (!connection.endpoint)
            throw new Error("API endpoint is required");

        const SERVER_ENDPOINT = `${SERVER_DOMAIN}/${connection.endpoint.replace(
            /^\//,
            ""
        )}`;

        const finalHeaders: RequestHeader = {
            "Content-Type": "application/json",
            "Cookie": `JSessionId=${cookie}`
        };

        const response = await axios.request({
            method: connection.method,
            url: SERVER_ENDPOINT,
            headers: finalHeaders,
            data: connection.payload ?? undefined,
        });


        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
        }
        throw new Error("NON-AXIOS ERROR: An unknown error occurred");
    }
}

export default serverApiRequest;