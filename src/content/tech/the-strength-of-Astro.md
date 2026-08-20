---
title: 'The strenght of Astro'
description: 'A simple example of how to avoid embedding JavaScript in HTML with Astro.'
pubDate: 2026-08-20
tags: ['astro', 'syntax']
---

As the homepage of our website, I decided to feature the “Hiker Blog"
instead of the "Photo Gallery".

Here's what my index.astro looked like after the update:

```astro
---
// index.astro v1
import Layout from "../layouts/Layout.astro";
import PostCard from "../components/PostCard.astro";
import { getCollection } from "astro:content";

const posts = (
    await getCollection("photography", ({ data }) =>
        import.meta.env.PROD ? !data.draft : true,
    )
).sort((a, b) => +new Date(b.data.pubDate) - +new Date(a.data.pubDate));
---

<Layout
    title="Hiker Blog"
    description="Field notes on light, weather, and mountaineering."
>
    <header class="blog-head">
        <h1 class="page__title">Hiker Blog</h1>
        <p class="blog-head__sub">
            Field notes on light, weather, and mountaineering.
        </p>
    </header>

    {
        posts.length === 0 ? (
            <p class="empty">Please wait patiently for the first post.</p>
        ) : (
            <ul class="post-list">
                {posts.map((post) => (
                    <PostCard post={post} base="/blog/photography" />
                ))}
            </ul>
        )
    }
</Layout>
```
But our website also has a “Tech Blog” and it makes sense for the 
blog with the most recent post to be displayed on the home page.

What options did I have? 
  - Embedded JavaScript in HTML
  - Pure Astro code

The option two offers the following advantages:

✅ No client-side JavaScript — Logic runs at build time

✅ Zero runtime overhead — Pure HTML output

✅ Minimal code — Just date comparison logic

✅ SEO-friendly — Search engines see the correct blog immediately

✅ Automatic updates — Rebuilds when you push new posts

Of course, I went with the second option.  

Here's what my index.astro file looks like now:

```astro
---
// index.astro v2
// This frontmatter section (between ---) is server-side code
// It runs ONLY at build time, never in the browser
import Layout from "../layouts/Layout.astro";
import PostCard from "../components/PostCard.astro";

// getCollection() is Astro's built-in Content Collections API
import { getCollection } from "astro:content";

// Fetch both blog collections
const techPosts = (
  await getCollection("tech", ({ data }) =>
    import.meta.env.PROD ? !data.draft : true
  )
).sort((a, b) => +new Date(b.data.pubDate) - +new Date(a.data.pubDate));

const photographyPosts = (
  await getCollection("photography", ({ data }) =>
    import.meta.env.PROD ? !data.draft : true
  )
).sort((a, b) => +new Date(b.data.pubDate) - +new Date(a.data.pubDate));

// Compare latest post dates
const latestTech = techPosts[0];
const latestPhoto = photographyPosts[0];

// All variables here are available to the template below
// Determine which blog to show
const showTechBlog = 
  latestTech && (!latestPhoto || new Date(latestTech.data.pubDate) > new Date(latestPhoto.data.pubDate));

const posts = showTechBlog ? techPosts : photographyPosts;
const sectionLabel = showTechBlog ? "Tech Blog" : "Hiker Blog";
const sectionHref = showTechBlog ? "/blog/tech" : "/blog/photography";
const title = showTechBlog ? "Tech Blog" : "Photo Blog";
const description = showTechBlog 
  ? "Notes on tools, code, and building for the web."
  : "Field notes on light, weather, and mountaineering.";
---
// This is the template (HTML + JSX-like syntax)
<Layout {title} {description}>
  <header class="blog-head">
    <h1 class="page__title">{sectionLabel}</h1>
    <p class="blog-head__sub">{description}</p>
  </header>

  {
    // Conditional rendering - pure Astro
    posts.length === 0 ? (
      <p class="empty">Please wait patiently for the first post.</p>
    ) : (
      <ul class="post-list">
        {posts.map((post) => (
          <PostCard post={post} base={sectionHref} />
        ))}
      </ul>
    )
  }
</Layout>
```

## What's Astro vs. What's Not

| Syntax                           | What It Is                                           |
| -------------------------------- | ---------------------------------------------------- |
| **`- - - frontmatter`**          | Astro-specific — server-side only                    |
| **`import { getCollection }`**   | Astro API — Content Collections                      |
| **`await getCollection()`**      | Astro API — async data fetching                      |
| **`.sort(), .map()`**            | JavaScript (standard) — runs at build time           |
| **`{variable} in HTML`**         | Astro template — renders to static HTML              |
| **`{condition ? a : b}`**        | Astro template — conditional rendering               |
| **`<Component prop={value} />`** | Astro component — passes props to other .astro files |

>No React, Vue, Svelte, or embedded **`<script>`** tags — it's all pure Astro.

You can also visit my personal [page](https://radoslav.xyz/)
