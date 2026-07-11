import { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const supabase = createClient();

  // Static routes
  const staticRoutes = [
    "",
    "/about-us",
    "/services",
    "/contact-us",
    "/reviews",
    "/blog",
    "/universities",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic published destinations
  let destinationRoutes: any[] = [];
  try {
    const { data: destinations } = await supabase
      .from("destinations")
      .select("slug")
      .eq("published", true);

    destinationRoutes = (destinations || []).map((d) => ({
      url: `${siteUrl}/study-abroad/${d.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch (err) {
    console.error("Sitemap destinations fetch failed:", err);
  }

  // Dynamic published universities
  let universityRoutes: any[] = [];
  try {
    const { data: universities } = await supabase
      .from("universities")
      .select("slug")
      .eq("published", true);

    universityRoutes = (universities || []).map((u) => ({
      url: `${siteUrl}/universities/${u.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch (err) {
    console.error("Sitemap universities fetch failed:", err);
  }

  // Dynamic published test preps
  let testPrepRoutes: any[] = [];
  try {
    const { data: testPreps } = await supabase
      .from("test_prep_programs")
      .select("slug")
      .eq("published", true);

    testPrepRoutes = (testPreps || []).map((t) => ({
      url: `${siteUrl}/test-preparation/${t.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch (err) {
    console.error("Sitemap test prep fetch failed:", err);
  }

  // Dynamic published blog posts
  let blogRoutes: any[] = [];
  try {
    const { data: blogs } = await supabase
      .from("blog_posts")
      .select("slug, published_at")
      .eq("published", true);

    blogRoutes = (blogs || []).map((b) => ({
      url: `${siteUrl}/blog/${b.slug}`,
      lastModified: new Date(b.published_at || Date.now()),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
  } catch (err) {
    console.error("Sitemap blog posts fetch failed:", err);
  }

  return [
    ...staticRoutes,
    ...destinationRoutes,
    ...universityRoutes,
    ...testPrepRoutes,
    ...blogRoutes,
  ];
}
