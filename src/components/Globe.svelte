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
  
  let currentZoom = 0.65;
  
  onMount(() => {
    // Check if the user use desktop display (above 1024px depth )
    if (window.innerWidth >= 1024) {
      currentZoom = 1.6;
    }
  });
</script>

<div class="h-[500px] w-full">
  <Map
      center={[hub.lng, hub.lat]}
      zoom={currentZoom}
      projection={{ type: "globe" }}
  >
    <WorldArcsLabels
      {hub}
      {destinations}
      extraArcs={extraArcs}
    />

  </Map>
</div>
