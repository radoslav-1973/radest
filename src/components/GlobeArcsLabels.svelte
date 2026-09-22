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
  } from "../data/map_arcs";

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

