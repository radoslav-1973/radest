import { getCollection, type CollectionEntry } from "astro:content";

type FeaturedPost = CollectionEntry<"tech" | "hiker">;

export async function getFeaturedPosts(limit = 6): Promise<FeaturedPost[]> {
  const [techPosts, hikerPosts] = await Promise.all([
    getCollection("tech", ({ data }) => data.featured === true),
    getCollection("hiker", ({ data }) => data.featured === true),
  ]);

  return [...techPosts, ...hikerPosts]
    .sort(
      (a, b) =>
        new Date(b.data.pubDate).valueOf() -
        new Date(a.data.pubDate).valueOf(),
    )
    .slice(0, limit);
}
