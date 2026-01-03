import { ApiResponse } from "@/types/api";
import {
  DailyContentDetailResponse,
  DailyContentResponse,
} from "@/types/content";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

async function fetchApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  const result: ApiResponse<T> = await response.json();

  if (!result.success) {
    throw new Error(result.message || "API request failed");
  }

  return result.data;
}

export async function getTodayContent(): Promise<DailyContentDetailResponse> {
  return fetchApi<DailyContentDetailResponse>("/api/v1/contents/today");
}

export async function getContentByDate(
  date: string
): Promise<DailyContentDetailResponse> {
  return fetchApi<DailyContentDetailResponse>(`/api/v1/contents/date/${date}`);
}

export async function getContentById(
  contentId: number
): Promise<DailyContentDetailResponse> {
  return fetchApi<DailyContentDetailResponse>(`/api/v1/contents/${contentId}`);
}

export async function getThisWeekContents(): Promise<DailyContentResponse[]> {
  return fetchApi<DailyContentResponse[]>("/api/v1/contents/this-week");
}

export async function getContentsByPeriod(
  startDate: string,
  endDate: string
): Promise<DailyContentResponse[]> {
  return fetchApi<DailyContentResponse[]>(
    `/api/v1/contents?startDate=${startDate}&endDate=${endDate}`
  );
}
