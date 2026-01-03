import { useQuery } from "@tanstack/react-query";
import {
  getTodayContent,
  getContentByDate,
  getContentById,
  getThisWeekContents,
  getContentsByPeriod,
} from "@/services/contentApi";

export function useTodayContent() {
  return useQuery({
    queryKey: ["content", "today"],
    queryFn: getTodayContent,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
}

export function useContentByDate(date: string) {
  return useQuery({
    queryKey: ["content", "date", date],
    queryFn: () => getContentByDate(date),
    enabled: !!date,
    staleTime: 1000 * 60 * 5,
  });
}

export function useContentById(contentId: number | null) {
  return useQuery({
    queryKey: ["content", "id", contentId],
    queryFn: () => getContentById(contentId!),
    enabled: contentId !== null,
    staleTime: 1000 * 60 * 5,
  });
}

export function useThisWeekContents() {
  return useQuery({
    queryKey: ["contents", "this-week"],
    queryFn: getThisWeekContents,
    staleTime: 1000 * 60 * 5,
  });
}

export function useContentsByPeriod(startDate: string, endDate: string) {
  return useQuery({
    queryKey: ["contents", "period", startDate, endDate],
    queryFn: () => getContentsByPeriod(startDate, endDate),
    enabled: !!startDate && !!endDate,
    staleTime: 1000 * 60 * 5,
  });
}
