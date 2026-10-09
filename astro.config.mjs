import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwindcss from "@tailwindcss/vite";
import svelte from '@astrojs/svelte';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  site: 'https://radest.top',
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.endsWith('/robots.txt') && !page.endsWith('/llms.txt'),
    }),
    svelte(),
  ],
  compressHTML: true,
  markdown: {
    syntaxHighlight: 'prism',
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
          alias: {
            $lib: fileURLToPath(new URL('./src/lib', import.meta.url)),
          },
        },
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
      chunkSizeWarningLimit: 1100,
      rolldownOptions: {
        output: {
          strictExecutionOrder: true, 
          codeSplitting: {
            groups: [
              {
                name: "maplibre",
                test: /node_modules\/maplibre-gl/,
                minSize: 20000,
                includeDependenciesRecursively: false
              },
              {
                name: "vendor",
                test: /node_modules/,
                minSize: 20000
              }
            ]
          }
        }
      }
    }

});
