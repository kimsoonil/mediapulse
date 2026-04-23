import { notFound } from "next/navigation";
import { MOCK_DATA } from "../../../lib/constants";
import DetailClient from "./detail-client";

export const revalidate = 3600;

export function generateStaticParams() {
  return MOCK_DATA.map((item) => ({ id: String(item.id) }));
}

type Props = { params: { id: string } };

export async function generateMetadata({ params }: Props) {
  const item = MOCK_DATA.find((d) => d.id === Number(params.id));
  if (!item) return {};
  return {
    title: `${item.title} — MEDIAPULSE`,
    description: item.summary,
  };
}

export default function ContentDetailPage({ params }: Props) {
  const item = MOCK_DATA.find((d) => d.id === Number(params.id));
  if (!item) notFound();

  const linkedItem = item.cross_media
    ? MOCK_DATA.find((d) => d.id === item.cross_media!.id) ?? null
    : null;

  return <DetailClient item={item} linkedItem={linkedItem} allItems={MOCK_DATA} />;
}
