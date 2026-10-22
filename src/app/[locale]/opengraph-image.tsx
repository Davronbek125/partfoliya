import { ImageResponse } from "next/og";

import { site } from "@/content/site";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export const alt = "Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const activeLocale = isLocale(locale) ? locale : "uz";
  const dict = getDictionary(activeLocale);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background:
            "linear-gradient(135deg, #FF5A3C 0%, #FF7AC3 45%, #7B5CFF 100%)",
          color: "#FFF7F0",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            letterSpacing: 5,
            textTransform: "uppercase",
          }}
        >
          <span>Portfolio</span>
          <span>{activeLocale.toUpperCase()}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div
            style={{
              fontSize: 84,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: -3,
            }}
          >
            {site.name}
          </div>
          <div style={{ fontSize: 34, opacity: 0.9 }}>{dict.hero.role}</div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            opacity: 0.85,
          }}
        >
          <span>{site.url.replace("https://", "")}</span>
          <span>{site.location[activeLocale]}</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
