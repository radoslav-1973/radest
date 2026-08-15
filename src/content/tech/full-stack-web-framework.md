---
title: 'Astro as a full-stack web framework'
description: 'Astro is a complete web-framework experience while acting as a glue tool that uses those UI engines selectively to output the smallest possible JavaScript bundle to the browser.'
pubDate: 2026-08-15
tags: ['astro', 'hydration', 'Islands Architecture']
---

Let me briefly explain how does hydration differ from SSR (standard server-side rendering).
Hydration is the step after SSR, where JavaScript “wakes up” already-rendered HTML by attaching 
event handlers and client-side behavior to it, while standard SSR only produces the HTML response itself.

Simple example:
- SSR sends: **`<button>Buy</button>`**
- Browser paints it immediately. (button looks real, but not respond)
- Hydration later attaches: onclick, state, effects, event listeners.(so button becomes interactive)

> Think of React, Vue, Svelte, and Solid as UI engine primitives designed to manipulate the DOM and manage 
> complex client-side state.

## The Secret Sauce: "Islands Architecture"

By default, Astro converts everything (even your React, Vue or Svelte components) into raw HTML and 
CSS at build time, stripping out all JavaScript.
If you need an interactive UI piece (like a dynamic search bar, modal, or shopping cart), 
you turn that specific component into an "Island" using explicit client directives:

```astro
---
import ReactCounter from '../components/ReactCounter.jsx';
import VueCart from '../components/VueCart.vue';

---
<!-- Static Astro layout -->
<main>
  <h1>My Store</h1>

  <!-- Hydrates React ONLY when visible on screen -->
  <ReactCounter client:visible />

  <!-- Hydrates Vue immediately on page load -->
  <VueCart client:load />
</main>
```
This means:
- The shell and static content are pre-rendered into lightweight HTML.
- Only interactive UI widgets load JavaScript runtime engines into the browser, 
     and only when is needed.

## Here is a breakdown of how Astro fits into the ecosystem at the same time as a frontend framework and as an integrator:

1. How Astro is a Frontend Framework

    Astro has its own component syntax (.astro files), routing system, and templating engine. You do not need to 
    use React or Vue to build a complete website in Astro.

    - Component Syntax: Astro uses HTML-like templating with embedded JavaScript, very similar to JSX or Svelte.
    - File-based Routing: Adding pages/about.astro creates an /about route automatically.
    - Full-stack Features: It supports API routes, SSR (Server-Side Rendering), middleware, and static site 
      generation out of the box.

```astro
---
// Server-side script section (runs at build time or on server request)
const title = "Hello from Astro!";
---

<!-- Astro Templating -->
<h1>{title}</h1>
<p>This renders to pure HTML with ZERO JavaScript shipped by default.</p>
```

2. How Astro Acts as an Orchestrator / Integrator

    Where Astro truly shines is its framework-agnostic orchestrator capabilities. Instead of forcing you 
    to rewrite UI components in .astro syntax, Astro allows you to bring your existing React, Vue, 
    Svelte, or Solid components directly into its build pipeline. You can even mix them on the same page!

## Key Architectural Differences

| Feature             | React / Vue / Svelte / Solid         | Astro                                      |
| --------------      | ------------------------------------ | -----------------------------------------  |
| Primary Focus       | UI Component State & Rendering       | Routing, Performance & Orchestration       |
| Default JS Bundle   | Includes full runtime framework JS   | Zero JavaScript by default                 |
| Hydration Model     | Hydrates the whole page/tree         | Islands Architecture (partial hydration)   |
| Multi-Framework Use | Locked into one framework ecosystem  | Can host React, Vue, Svelte, etc. together |


> Think of Astro as a meta-framework, integrator and performance compiler. It gives you a complete web-framework 
> experience while acting as a glue tool that uses those UI engines selectively to output the smallest possible
> JavaScript bundle to the browser.

### Here's another [article](https://designodin.com/blog/astro-vs-jekyll-business-sites/) you should read.
