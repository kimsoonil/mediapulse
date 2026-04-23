import type { Metadata } from "next";
import { MOCK_DATA, TRENDING_REASONS } from "../lib/constants";
import type { TrendingItem } from "../lib/types";
import HomeClient from "./home-client";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "MEDIAPULSE — 커뮤니티 반응 큐레이션",
  description: "영화·드라마·애니·게임·웹툰 커뮤니티 반응 통합 큐레이션 사이트",
};

export default async function Page() {
  const trending: TrendingItem[] = [...MOCK_DATA]
    .sort((a, b) => b.community_heat - a.community_heat)
    .slice(0, 5)
    .map((d, i) => ({
      rank: i + 1,
      title: d.title,
      type: d.type,
      change: ["—", "+1", "+3", "-1", "NEW"][i],
      reason: TRENDING_REASONS[d.title],
    }));

  return <HomeClient contents={MOCK_DATA} trending={trending} />;
}
