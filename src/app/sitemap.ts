import type { MetadataRoute } from "next";

const BASE_URL = process.env.SITE_URL ?? "https://www.tal-taxi.at";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/dienstleistungen",
    "/preisrechner",
    "/buchen",
    "/ueber-uns",
    "/faq",
    "/kontakt",
    "/impressum",
    "/datenschutz",
    "/agb",
  ];
  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
