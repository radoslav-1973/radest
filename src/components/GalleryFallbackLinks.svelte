<!-- src/components/GalleryFallbackLinks.svelte -->

<script lang="ts">
  import { destinations } from "../data/globe_arcs";

  //const galleryHref = (slug: string) => `/photo-gallery/${slug}`;
</script>

<nav class="gallery-fallback" aria-labelledby="gallery-fallback-title">
  <h2 id="gallery-fallback-title">Browse photo galleries</h2>

  <div class="gallery-links">
    {#each destinations as dest, index (dest.name)}
        {@const slug = dest.name
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "")}
        <a
        class="gallery-link"
        href={`/galleries/${slug}`}
        >
        {dest.name}
      </a>
    {/each}
  </div>
</nav>

<style>
  .gallery-fallback {
    --gallery-accent: #1558a6;
    --gallery-accent-contrast: #ffffff;

    width: 100%;
    margin: 0 auto 2rem;
  }

  .gallery-fallback h2 {
    margin: 0 0 0.75rem;
    text-align: center;
    font-size: 1.25rem;
  }

  .gallery-links {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
  }

  .gallery-link {
    display: inline-block;
    padding: 0.65rem 0.9rem;
    border: 1px solid var(--gallery-accent);
    border-radius: 0.4rem;
    color: var(--gallery-accent);
    background-color: transparent;
    text-decoration: none;
    transition:
      background-color 150ms ease,
      color 150ms ease;
  }

  .gallery-link:hover,
  .gallery-link:focus-visible {
    color: var(--gallery-accent-contrast);
    background-color: var(--gallery-accent);
  }

  .gallery-link:focus-visible {
    outline: 2px solid var(--gallery-accent);
    outline-offset: 3px;
  }

  @media (prefers-color-scheme: dark) {
    .gallery-fallback {
      --gallery-accent: #8ab4f8;
      --gallery-accent-contrast: #101820;
    }
  }
</style>
