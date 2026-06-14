import type { MetadataRoute } from "next";

const BASE_URL = process.env.SITE_URL ?? "https://www.tal-taxi.at";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
