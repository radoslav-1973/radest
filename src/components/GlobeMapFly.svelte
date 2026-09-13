<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import * as maplibregl from 'maplibre-gl';
  import 'maplibre-gl/dist/maplibre-gl.css';
  import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';

  if (typeof window !== 'undefined') {
    maplibregl.setWorkerUrl(workerUrl);
  }

  type Region = "Africa" | "Indian Ocean" | "Europe";

  type Gallery = {
    name: string;
    lng: number;
    lat: number;
    href: string;
    region: Region;
  };

  let { galleries }: { galleries: Gallery[] } = $props();

  let mapContainer: HTMLDivElement;
  let map: maplibregl.Map | null = null;
  let markers: maplibregl.Marker[] = [];
  let styleLoaded: boolean = $state(false);
  let activeRegion: Region = $state("Africa");

  const regions: Region[] = ["Africa", "Indian Ocean", "Europe"];

  const regionViews: Record<Region, { center: [number, number]; zoom: number }> = {
    "Africa": { center: [25, -3.2], zoom: 1 },
    "Indian Ocean": { center: [60.4, -17], zoom: 1 },
    "Europe": { center: [14.6, 45], zoom: 1 },
  };

  onMount(() => {
    if (!mapContainer) return;

    const initialView = regionViews[activeRegion];

    map = new maplibregl.Map({
      container: mapContainer,
      style: 'https://demotiles.maplibre.org/style.json',
      zoom: initialView.zoom,
      center: initialView.center,
    });

    map.on('style.load', () => {
      map?.setProjection({
        type: 'globe',
      });

      styleLoaded = true;
      addMarkers();
    });
  });

  function markerColorClass(region: Gallery["region"]) {
    switch (region) {
      case "Africa":
        return "bg-amber-500 hover:bg-amber-400";
      case "Indian Ocean":
        return "bg-cyan-500 hover:bg-cyan-400";
      case "Europe":
        return "bg-indigo-500 hover:bg-indigo-400";
      default:
        return "bg-emerald-500 hover:bg-emerald-400";
    }
  }
//  random number generator based on the name of the gallery
function getSeededRandom(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(Math.sin(hash)) * 1000 % 1;
}

function addMarkers() {
  if (!map || !styleLoaded) return;

  galleries.forEach((g) => {
    // Generate seeded random values for each destination
    const seed = getSeededRandom(g.name);
    const randomHeight = Math.floor(seed * (60 - 20 + 1)) + 20; // Height between 20px (h-5) и 60px (h-15)
    const randomAngle = Math.floor(seed * 360); // Angle between 0 and 360

    // Marker container
    const el = document.createElement('a');
    el.href = g.href;
    el.className = 'group relative block';
    el.title = g.name;

    // The dot at the center of the marker
    const dot = document.createElement('div');
    dot.className = [
      'size-3 rounded-full border-2 border-white shadow transition relative z-10',
      markerColorClass(g.region),
      'group-hover:scale-125'
    ].join(' ');
    el.appendChild(dot);

// Randomly rotated and long ORANGE line
const pointer = document.createElement('div');
pointer.className = [
  'absolute bottom-1/2 left-1/2 -translate-x-1/2 w-[1.5px]', // Width: 1.5px
  'bg-orange-500/70 transition-colors duration-150 group-hover:bg-orange-600', // Orange with light transparency, becomes darker on hover
  'origin-bottom'
].join(' ');

    // Set dynamic height and rotation directly in the style
    pointer.style.height = `${randomHeight}px`;
    pointer.style.transform = `translateX(-50%) rotate(${randomAngle}deg)`;
    el.appendChild(pointer);

    // Always aligned label at the top of the line
    const label = document.createElement('div');
    label.className = [
      'absolute bottom-full left-1/2 -translate-x-1/2 mb-1 whitespace-nowrap',
      'rounded bg-background/95 px-1.5 py-0.5 text-[10px] font-semibold text-foreground shadow border border-border/50',
      'transition-colors duration-150 group-hover:bg-foreground group-hover:text-background'
    ].join(' ');
    label.textContent = g.name;

    // Rotate the label in the opposite direction (-randomAngle),
    // so that the text remains perfectly horizontal for reading!
    label.style.transform = `translateX(-50%) rotate(${-randomAngle}deg)`;
    pointer.appendChild(label);

    // Add to the map
    const marker = new maplibregl.Marker({
      element: el,
      anchor: 'center' // Return to center, as lines already rotate 360 degrees from the center
    })
      .setLngLat([g.lng, g.lat])
      .addTo(map!);

    markers.push(marker);
  });
}


  function setRegion(r: Region) {
    activeRegion = r;

    if (!map || !styleLoaded) return;

    const view = regionViews[activeRegion];
    map.flyTo({
      center: view.center,
      zoom: view.zoom,
      duration: 1200,
      essential: true,
    });
  }

  onDestroy(() => {
    markers.forEach((m) => m.remove());
    markers = [];
    map?.remove();
    map = null;
  });
</script>

<div class="w-full">
  <!-- Buttons -->
  <div class="mb-4 flex justify-center flex-wrap gap-2">
    {#each regions as r}
     <button
  type="button"
  class={`inline-flex items-center rounded-md px-3 py-1 text-sm font-medium transition-[background-color] duration-200 active:scale-95 ${
    activeRegion === r
      ? 'bg-foreground text-background'
      : 'border border-border bg-background text-foreground hover:bg-muted'
  }`}
  onclick={() => setRegion(r)}
>
  {r}
</button>
    {/each}
  </div>

  <!-- Globe -->
  <div bind:this={mapContainer} class="w-full h-[400px]"></div>
</div>
