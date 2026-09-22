<script lang="ts">
  import { onMount } from "svelte";
  import "maplibre-gl/dist/maplibre-gl.css";
  import * as maplibregl from "maplibre-gl";
  import { Map } from "$lib/components/ui/map";
  import WorldArcsLabels from "./GlobeArcsLabels.svelte";
  import { hub, destinations, extraArcs } from "../data/globe_arcs";
  import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";
  
  if (typeof window !== "undefined") {
    maplibregl.setWorkerUrl(workerUrl);
  }
  
  let currentZoom = 0.5;
  
  onMount(() => {
    // Check if the user use desktop display (above 1024px depth )
    if (window.innerWidth >= 1024) {
      currentZoom = 1.6;
    }
  });
</script>

<!-- Outer container resize from 420px to 600px -->
<div class="flex h-[420px] w-full items-center justify-center overflow-hidden lg:h-[600px]">
  
  <!-- Inner square container, 600x600 only for desktop lg: -->
  <div class="h-[420px] w-full min-w-full md:w-[420px] md:min-w-[420px] lg:h-[600px] lg:w-[600px] lg:min-w-[600px]">
    <Map
      center={[hub.lng, hub.lat]}
      bind:zoom={currentZoom}
      projection={{ type: "globe" }}
    >
      <WorldArcsLabels
        {hub}
        {destinations}
        {extraArcs}
      />
    </Map>
  </div>
  
</div>

