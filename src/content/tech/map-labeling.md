---
title: 'Why is map labeling considered an NP-hard problem and when is manual labeling the better solution?'
description: 'What is really complicated task and why sometimes better solution is human judgment?'
pubDate: 2026-09-28
tags: ['map', 'labels', 'NP-hard']
---

## The key idea

Suppose each possible label position is represented as a rectangle:

- Each rectangle is a possible placement of a label.
- Two rectangles are connected if the corresponding labels overlap.
- A set of labels that can appear together is therefore a set of rectangles with no intersections.

The goal—placing the largest possible number of non-overlapping labels—is exactly equivalent to finding 
a maximum independent set in the resulting conflict graph. This geometric formulation is known to be NP-hard, 
including for restricted shapes such as unit squares and disks.

## Why this causes difficulty

Labels interact globally. Choosing one label may prevent several nearby labels from 
being used, so a locally sensible choice can produce a poor overall result.

For n labels, there can be exponentially many subsets to consider. An exact algorithm may need to 
explore many of those combinations, especially when the map contains dense clusters of competing labels.

## Decision versus optimization

The usual decision version asks:

> Can at least k labels be placed without overlap?

That version belongs to NP, because a proposed placement can be checked quickly: verify that every selected 
label is valid and that no pair overlaps. It is also NP-hard through a reduction from maximum independent set, 
so it is generally NP-complete. The optimization version—finding the largest possible set—is called NP-hard.

An NP-hard problem is a computational problem that is at least as hard as the hardest problems in the class of 
Nondeterministic Polynomial time, meaning every problem in NP can be reduced to it in polynomial time.

## Practical consequence

NP-hard does not mean that every map is impossible to solve. Real map software uses methods such as:

- Greedy placement.
- Priorities, so important labels are kept.
- Integer programming or branch-and-bound for smaller instances.
- Approximation algorithms.
- Multi-scale rules that show fewer labels when zoomed out.
- Conflict graphs and spatial indexing to avoid checking every pair.

## When Manual Beats Computational

Not every practical instance requires a complex algorithm. For a limited, known set of destinations, 
label positions can be assigned manually:

Here's an example of a small and simple, deliberate solution. The label shifts x: px right and y: px up from 
its automatic position.

```ts
// src/data/globe_arcs.ts
export type LabelOffset = {
  x: number;
  y: number;
};

export type Point = {
  name: string;
  lng: number;
  lat: number;
  labelOffset?: LabelOffset;// optional
};

export type ExtraArc = {
  id: string;
  from: [number, number];
  to: [number, number];
};

export const hub: Point = {
  name: "Sofia",
  lng: 23.3219,
  lat: 42.6977
};

const mayotte: Point = {
  name: "Mayotte",
  lng: 45.1662,
  lat: -12.8275
};

const reunion: Point = {
  name: "La Reunion",
  lng: 55.5325,
  lat: -21.1144
};
 
export const destinations: Point[] = [
  // optional fine-tune of the labels, the label shifts x: px right and y: px up from its automatic position
  { name: "Kilimanjaro", lng: 37.3533, lat: -3.0758, labelOffset: { x: -40, y: 2 } },
  { name: "Tyulenovo", lng: 28.13, lat: 43.58 },
  { name: "Olympus", lng: 22.3586, lat: 40.0856, labelOffset: { x: -35, y: -5 } },
  { name: "Chamonix", lng: 6.8697, lat: 45.9231 },
  { name: "Mayotte", lng: 45.1662, lat: -12.8275, labelOffset: { x: -5, y: 40 } },
  { name: "La Reunion", lng: 55.5325, lat: -21.1144 },
  { name: "Arusha", lng: 36.8, lat: -3.38, labelOffset: { x: -30, y: -2 } }, 
];

//const reunion = destinations.find((dest) => dest.name === "La Reunion")!;

export const extraArcs: ExtraArc[] = [
  {
    id: "reunion-mayotte",
    from: [reunion.lng, reunion.lat],
    to: [mayotte.lng, mayotte.lat]
  },
  {
    id: "mayotte-kilimanjaro",
    from: [mayotte.lng, mayotte.lat],
    to: [destinations[0].lng, destinations[0].lat]
  }
];
```

This approach does not attempt to solve map labeling in its most general form. Instead, it uses human 
knowledge of the particular map. A person can inspect the destinations, choose suitable positions, and 
encode those decisions directly in the data.

````md
```svelte
// src/components/GlobeArcsLabels.svelte
<script lang="ts">
  import {
    MapArc,
    MapMarker,
    MarkerContent,
    MarkerLabel
  } from "$lib/components/ui/map";

  import type {
    Point,
    ExtraArc
  } from "../data/globe_arcs";

  export let hub: Point;
  export let destinations: Point[];
  export let extraArcs: ExtraArc[] = [];

  const labelPositions = ["top", "right", "bottom", "left"] as const;
  
  $: arcs = [
    ...destinations
    .filter((dest) => dest.name !== "Arusha")
    .map((dest) => ({
      id: `sofia-${dest.name}`,
      from: [hub.lng, hub.lat] as [number, number],
      to: [dest.lng, dest.lat] as [number, number]
    })),
    ...extraArcs
  ];
</script>

<MapArc
  data={arcs}
  paint={{
    "line-color": "#3b82f6",
    "line-dasharray": [2, 2]
  }}
  interactive={false}
/>

<MapMarker longitude={hub.lng} latitude={hub.lat}>
  <MarkerContent>
    <div class="size-3 rounded-full border-2 border-white bg-blue-500 shadow-md"></div>

    <MarkerLabel
      position="top"
      class="rounded-sm bg-background/80 px-1.5 py-0.5 text-[11px] font-semibold backdrop-blur"
    >
      {hub.name}
    </MarkerLabel>
  </MarkerContent>
</MapMarker>

{#each destinations as dest, index (dest.name)}
  {@const slug = dest.name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}

  <MapMarker longitude={dest.lng} latitude={dest.lat}>
    <MarkerContent>
      <a
        href={`/galleries/${slug}`}
        class="block"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div class="size-2 rounded-full border-2 border-white bg-emerald-500 shadow"></div>

        <MarkerLabel
          position={labelPositions[index % labelPositions.length]}
          labelOffset={dest.labelOffset}
          class="rounded-sm bg-background/80 px-1.5 py-0.5 text-[11px] font-semibold backdrop-blur"
        >
          {dest.name}
        </MarkerLabel>
      </a>
    </MarkerContent>
  </MapMarker>
{/each}
```
````


## The value of knowing the boundaries

An algorithm is justified when the input is dynamic, large, or unpredictable. If destinations can be 
added by users, change frequently, or appear at arbitrary zoom levels, automated collision detection 
may be necessary.

However, if the map contains a small, stable collection of known points, a manual solution may be 
the better engineering decision. It can be:

- Easier to understand.
- Faster at runtime.
- More predictable visually.
- Simpler to test.
- Smaller than a general-purpose placement algorithm.
- Easier to adjust when the map design changes.

The important distinction is between the general problem and the specific instance. The general 
problem may be computationally difficult, while one carefully designed instance may be trivial to 
solve with a short configuration.

## Manual does not mean careless

The result is especially effective when the data is static. Instead of repeatedly calculating 
possible positions, checking collisions, ranking labels, and resolving conflicts, 
the application simply renders decisions that have already been made.

The right choice therefore depends on the stability and size of the input — not only on the 
theoretical complexity of the problem.

## A practical principle

A useful engineering rule is:

> Use the simplest solution that reliably satisfies the actual requirements.

The lesson is not that complex algorithms are unnecessary. It is that theoretical complexity 
should be matched to practical complexity. Sometimes the most efficient solution to a difficult 
general problem is not to solve the general problem at all.

You can also visit my personal [page](https://radoslav.xyz/)
