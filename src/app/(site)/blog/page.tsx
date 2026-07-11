import { getBlogPosts } from "@/lib/supabase/queries";
import BlogListClient from "@/components/site/blog-list-client";

export const metadata = {
  title: "Official Blog & Study Abroad News | Downtown Consultancy",
  description: "Stay updated with latest visa updates, international student guides, IELTS preparation tips, university admission deadlines, and scholarship details on our blog.",
};

export default async function BlogFeedPage() {
  const posts = await getBlogPosts();
  return <BlogListClient initialPosts={posts} />;
}
