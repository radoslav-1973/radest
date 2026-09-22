<script lang="ts">
  import { cn } from "$lib/utils.js";

  interface Props {
    children?: import("svelte").Snippet;
    class?: string;
    position?: "top" | "right" | "bottom" | "left";
  }

  let { children, class: className, position = "top" }: Props = $props();

  const positionClasses = {
    top: "bottom-full mb-1 left-1/2 -translate-x-1/2",
    bottom: "top-full mt-1 left-1/2 -translate-x-1/2",
    left: "right-full mr-1 top-1/2 -translate-y-1/2",
    right: "left-full ml-1 top-1/2 -translate-y-1/2",
  };
</script>

<div
  class={cn(
    "absolute whitespace-nowrap",
    "text-foreground text-[10px] font-medium",
    positionClasses[position],
    className
  )}
>
  {@render children?.()}
</div>
