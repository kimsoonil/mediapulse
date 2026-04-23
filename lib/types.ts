export type ContentType = "영화" | "드라마" | "애니" | "게임" | "웹툰";

export type SortKey = "community_heat" | "community_score" | "score" | "youtube_count";

export type Review = {
  source: string;
  text: string;
  heat: number;
};

export type CrossMedia = {
  id: number;
  type: ContentType;
  title: string;
};

export type ContentItem = {
  id: number;
  type: ContentType;
  title: string;
  year: number;
  genre: string[];
  score: number;
  community_score: number;
  platform: string;
  thumb: string;
  tags: string[];
  youtube_count: number;
  community_heat: number;
  summary: string;
  cross_media: CrossMedia | null;
  reviews: Review[];
};

export type TrendingItem = {
  rank: number;
  title: string;
  type: ContentType;
  change?: string;
  reason?: string;
};
