import { createClient } from "@supabase/supabase-js";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

const supabaseUrl = requireEnv("NEXT_PUBLIC_SUPABASE_URL");
const supabaseAnonKey = requireEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type FetchContentsFilters = {
  type?: string;
  genre?: string;
  platform?: string;
  sort?: string;
};

export async function fetchContents({ type, genre, platform, sort = "community_heat" }: FetchContentsFilters = {}) {
  let query = supabase
    .from("contents")
    .select(
      `
      *,
      reviews ( source, text, heat ),
      cross_media:cross_media_id ( id, title, type )
    `,
    )
    .order(sort, { ascending: false });

  if (type && type !== "전체") query = query.eq("type", type);
  if (genre && genre !== "전체 장르") query = query.contains("genre", [genre]);
  if (platform && platform !== "전체 플랫폼") query = query.ilike("platform", `%${platform}%`);

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function fetchTrending() {
  const { data, error } = await supabase
    .from("contents")
    .select("id, title, type, community_heat")
    .order("community_heat", { ascending: false })
    .limit(5);
  if (error) throw error;
  return data;
}

export async function fetchContentById(id: number) {
  const { data, error } = await supabase
    .from("contents")
    .select(`*, reviews ( source, text, heat ), cross_media:cross_media_id ( id, title, type )`)
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

