import React from "react";
import { getBlogPosts } from "@/lib/supabase/queries";
import BlogListClient from "@/components/site/blog-list-client";

export default async function BlogFeedPage() {
  const posts = await getBlogPosts();
  return <BlogListClient initialPosts={posts} />;
}
