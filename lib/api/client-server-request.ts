import axios from "axios";
import { axiosClientInstance } from "@/lib/api/axios";
import { RequestOptions } from "@/types/response-types";

async function clientServerRequest<T>({
  connection,
}: RequestOptions): Promise<T> {
  try {
    const response = await axiosClientInstance.request<T>({
      method: connection.method,
      url: connection.endpoint,
      data: connection.payload ?? undefined,
    });
    const data = response.data;
    return data as T;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
      throw new Error(
        error.response?.data.error.message ??
          "AXIOS ERROR: Unexpected error occurred"
      );
    }
    throw new Error("NON-AXIOS ERROR: An unknown error occurred");
  }
}

export default clientServerRequest;
