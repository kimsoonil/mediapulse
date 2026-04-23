import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "MEDIAPULSE — 커뮤니티 반응 큐레이션",
  description: "영화·드라마·애니·게임·웹툰 커뮤니티 반응 통합 큐레이션 사이트",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

