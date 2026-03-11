import type { Metadata } from "next";
import { getAllPosts, getAllTags } from "@/lib/blog";
import { BlogIndex } from "@/components/blog/blog-index";

export const metadata: Metadata = {
  title: "Studio Journal",
  description:
    "Engineering insights, case study breakdowns, and honest perspectives on building digital products. From the Tweak & Build studio.",
  openGraph: {
    title: "Studio Journal | Tweak & Build",
    description:
      "Engineering insights, case study breakdowns, and honest perspectives on building digital products.",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return <BlogIndex posts={posts} tags={tags} />;
}
