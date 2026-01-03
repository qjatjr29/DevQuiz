export interface ContentCardResponse {
  id: number;
  cardOrder: number;
  title: string;
  content: string; // Markdown 형식
  imageUrl?: string;
  codeSnippet?: string;
  language?: string;
}

export interface DailyContentDetailResponse {
  id: number;
  date: string; // ISO date 포맷 (YYYY-MM-DD)
  categoryName: string;
  categoryDisplayName: string;
  topic: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  isReview: boolean;
  cards: ContentCardResponse[];
}

export interface DailyContentResponse {
  id: number;
  date: string;
  categoryName: string;
  categoryDisplayName: string;
  topic: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  isReview: boolean;
}
