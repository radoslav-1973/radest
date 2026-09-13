import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwindcss from "@tailwindcss/vite";
import svelte from '@astrojs/svelte';

export default defineConfig({
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.endsWith('/robots.txt') && !page.endsWith('/llms.txt'),
    }),
    svelte(),
  ],
  site: 'https://radest.top',
  compressHTML: true,
  markdown: {
    syntaxHighlight: 'prism',
    build: {
      inlineStylesheets: 'always',
    },
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ['maplibre-gl'],
    },
    ssr: {
      noExternal: ['maplibre-gl']
    },
    build: {
      chunkSizeWarningLimit: 1100 
    }
  },

build: {
      rolldownOptions: {
        output: {
          codeSplitting: {
            groups: [
              {
                name: "maplibre",
                test: /node_modules\/maplibre-gl/,
                minSize: 20_000
              },
              {
                name: "vendor",
                test: /node_modules/,
                minSize: 20_000
              }
            ]
          }
        }
      }
    }
  
});

