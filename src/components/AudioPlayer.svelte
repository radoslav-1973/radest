<!-- src/components/AudioPlayer.svelte -->
<script>
  const src = "/songs/mp3/AUD-20230907-WA0002.mp3";
</script>

<div class="audio-wrapper">
  <audio controls {src}></audio>
</div>

<style>
  .audio-wrapper {
    margin: 1rem 0;
  }

  audio {
    width: 100%;
  }
</style>
