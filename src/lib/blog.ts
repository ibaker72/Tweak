import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  tags: string[];
  featuredImage: string | null;
  published: boolean;
  readTime: string;
  content: string;
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));

  const posts = files
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
      const { data, content } = matter(raw);

      if (!data.published) return null;

      const stats = readingTime(content);

      return {
        slug,
        title: data.title || "",
        excerpt: data.excerpt || "",
        date: data.date || "",
        author: data.author || "Tweak & Build",
        tags: data.tags || [],
        featuredImage: data.featuredImage || null,
        published: data.published ?? false,
        readTime: stats.text,
        content,
      } satisfies BlogPost;
    })
    .filter((p): p is BlogPost => p !== null);

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return posts;
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title || "",
    excerpt: data.excerpt || "",
    date: data.date || "",
    author: data.author || "Tweak & Build",
    tags: data.tags || [],
    featuredImage: data.featuredImage || null,
    published: data.published ?? false,
    readTime: stats.text,
    content,
  };
}

export function getPostsByTag(tag: string): BlogPost[] {
  return getAllPosts().filter((p) =>
    p.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase()),
  );
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set<string>();
  posts.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet);
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(currentSlug);
  if (!current) return [];

  const all = getAllPosts().filter((p) => p.slug !== currentSlug);

  const scored = all.map((post) => {
    const shared = post.tags.filter((t) => current.tags.includes(t)).length;
    return { post, score: shared };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.post);
}
