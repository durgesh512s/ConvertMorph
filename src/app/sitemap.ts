// src/app/sitemap.ts
import { MetadataRoute } from "next";
import { readdirSync, statSync } from "fs";
import { join, extname } from "path";
import { absoluteUrl } from "@/lib/url";

type SitemapEntry = {
  url: string;
  lastModified: string;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
};

const IGNORED_NAMES = new Set([
  "components",
  "api",
  "lib",
  "_app",
  "_document",
  "styles",
  "node_modules",
  "samples",
  "og",
  "logo",
  ".DS_Store",
]);

// Tools that are not yet deployed/ready for production
const UNDEPLOYED_TOOLS = new Set([
  "pdf-annotator",
  "pdf-crop", 
  "pdf-delete",
  "pdf-extract",
  "pdf-flatten",
  "unlock-pdf", // Empty directory
]);

function isValidFolderName(name: string) {
  if (!name) return false;
  if (IGNORED_NAMES.has(name)) return false;
  if (name.startsWith(".") || name.startsWith("_") || name.startsWith("(")) return false;
  return true;
}

function fileMTimeIso(path: string) {
  try {
    const st = statSync(path);
    return new Date(st.mtime).toISOString();
  } catch (e) {
    return new Date().toISOString();
  }
}

function getToolSlugs(): string[] {
  try {
    const toolsPath = join(process.cwd(), "src", "app", "tools");
    const entries = readdirSync(toolsPath, { withFileTypes: true });
    return entries
      .filter((e) => e.isDirectory() && isValidFolderName(e.name))
      .filter((e) => {
        // Only include tools that have a page.tsx file (exclude coming soon tools)
        try {
          const pagePath = join(toolsPath, e.name, "page.tsx");
          return statSync(pagePath).isFile();
        } catch {
          return false; // No page.tsx file found
        }
      })
      .map((e) => e.name)
      .sort();
  } catch (err) {
    console.warn("sitemap: tools directory read failed:", err);
    return [];
  }
}

function getBlogSlugs(): { slug: string; lastmod: string }[] {
  try {
    const blogPath = join(process.cwd(), "src", "app", "blog");
    const entries = readdirSync(blogPath, { withFileTypes: true });

    // If blog posts are directories (e.g. /blog/post/index.tsx)
    const dirPosts = entries
      .filter((e) => e.isDirectory() && isValidFolderName(e.name))
      .map((e) => ({
        slug: e.name,
        lastmod: fileMTimeIso(join(blogPath, e.name)),
      }));

    // Also include file-based posts (md/mdx)
    const filePosts = entries
      .filter((e) => e.isFile())
      .map((e) => e.name)
      .filter((name) => {
        const ext = extname(name).toLowerCase();
        return ext === ".md" || ext === ".mdx";
      })
      .map((filename) => {
        const slug = filename.replace(/\.(md|mdx)$/, "");
        const lastmod = fileMTimeIso(join(blogPath, filename));
        return { slug, lastmod };
      });

    const combined = [...dirPosts, ...filePosts];
    // unique & sorted
    const map = new Map<string, string>();
    combined.forEach((p) => map.set(p.slug, p.lastmod));
    return Array.from(map.entries())
      .map(([slug, lastmod]) => ({ slug, lastmod }))
      .sort((a, b) => a.slug.localeCompare(b.slug));
  } catch (err) {
    console.warn("sitemap: blog directory read failed:", err);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const nowIso = new Date().toISOString();
  const toolSlugs = getToolSlugs();
  const blogItems = getBlogSlugs();

  const items: SitemapEntry[] = [];

  // Homepage
  items.push({
    url: absoluteUrl("/"),
    lastModified: nowIso,
    changeFrequency: "daily",
    priority: 1.0,
  });

  // Tools index
  items.push({
    url: absoluteUrl("/tools"),
    lastModified: nowIso,
    changeFrequency: "weekly",
    priority: 0.9,
  });

  // Individual tools (use folder mtime when possible)
  toolSlugs.forEach((slug) => {
    // Skip undeployed tools
    if (UNDEPLOYED_TOOLS.has(slug)) return;
    
    const toolPath = join(process.cwd(), "src", "app", "tools", slug);
    const lastmod = fileMTimeIso(toolPath);
    // Skip "coming-soon" folders if present
    if (slug.toLowerCase().includes("coming") || slug.toLowerCase().includes("soon")) return;
    items.push({
      url: absoluteUrl(`/tools/${slug}`),
      lastModified: lastmod || nowIso,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  });

  // Blog index
  items.push({
    url: absoluteUrl("/blog"),
    lastModified: nowIso,
    changeFrequency: "weekly",
    priority: 0.7,
  });

  // Blog posts
  blogItems.forEach(({ slug, lastmod }) => {
    if (slug.toLowerCase().includes("draft") || slug.toLowerCase().includes("coming")) return;
    items.push({
      url: absoluteUrl(`/blog/${slug}`),
      lastModified: lastmod || nowIso,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  });

  // Static pages
  const staticPages: Array<{ path: string; priority: number }> = [
    { path: "/about", priority: 0.5 },
    { path: "/contact", priority: 0.5 },
    { path: "/privacy", priority: 0.3 },
    { path: "/terms", priority: 0.3 },
  ];

  staticPages.forEach((p) =>
    items.push({
      url: absoluteUrl(p.path),
      lastModified: nowIso,
      changeFrequency: "yearly",
      priority: p.priority,
    })
  );

  // Cast to Next's Sitemap type (it typically expects { url, lastModified })
  return items.map((it) => ({
    url: it.url,
    lastModified: it.lastModified,
  })) as MetadataRoute.Sitemap;
}
