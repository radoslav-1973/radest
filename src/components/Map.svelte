<script lang="ts">
  import * as maplibregl from "maplibre-gl";
  import {
    Map,
    MapArc,
    MapMarker,
    MarkerContent,
    MarkerLabel
  } from "$lib/components/ui/map";

  import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";

  if (typeof window !== "undefined") {
    maplibregl.setWorkerUrl(workerUrl);
  }

  const hub = {
    name: "Sofia",
    lng: 23.3219,
    lat: 42.6977
  };

  const destinations = [
    { name: "Chamonix", lng: 6.8697, lat: 45.9231 },
    { name: "Olympus", lng: 22.3586, lat: 40.0856 },
    { name: "Kilimanjaro", lng: 37.3533, lat: -3.0758 },
    { name: "Reunion", lng: 55.5325, lat: -21.1144 },
    { name: "Mayotte", lng: 45.1662, lat: -12.8275 },
    { name: "Tyulenovo", lng: 28.13, lat: 43.58 }
  ];

  const mayotte = {
    name: "Mayotte",
    lng: 45.1662,
    lat: -12.8275
  };

  const reunion = destinations.find((dest) => dest.name === "Reunion")!;

  const arcs = [
    ...destinations.map((dest) => ({
      id: `sofia-${dest.name}`,
      from: [hub.lng, hub.lat] as [number, number],
      to: [dest.lng, dest.lat] as [number, number]
    })),
    {
      id: "reunion-mayotte",
      from: [reunion.lng, reunion.lat] as [number, number],
      to: [mayotte.lng, mayotte.lat] as [number, number]
    },
    {
      id: "mayotte-kilimanjaro",
      from: [mayotte.lng, mayotte.lat] as [number, number],
      to: [destinations[2].lng, destinations[2].lat] as [number, number]
    }
  ];

  const labelPositions = ["top", "right", "bottom", "left"] as const;
</script>

<div class="h-[420px] w-full">
  <Map center={[hub.lng, hub.lat]} zoom={0.1} projection={{ type: "globe" }}>
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
            href={`/destinations/${slug}`}
            class="block"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div class="size-2 rounded-full border-2 border-white bg-emerald-500 shadow"></div>

            <MarkerLabel
              position={labelPositions[index % labelPositions.length]}
              class="rounded-sm bg-background/80 px-1.5 py-0.5 text-[11px] font-semibold backdrop-blur"
            >
              {dest.name}
            </MarkerLabel>
          </a>
        </MarkerContent>
      </MapMarker>
    {/each}
  </Map>
</div>
