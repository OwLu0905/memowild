<script module>
  import { Volume2 } from "lucide-svelte";

  import { base } from "$app/paths";

  let current;
</script>

<script>
  let { src } = $props();

  let paused = $state(true);
</script>

<div class="flex items-center">
    <audio
        src="{base}{src}"
				bind:paused
				onplay={(e) => {
								const audio = e.currentTarget;

								if (audio !== current) {
												current?.pause();
												current = audio;
								}
				}}
        onended={() => {
								paused = true;
				}}
  ></audio>

    <button
        class="play"
        aria-label={paused ? "play" : "pause"}
        onclick={() => (paused = !paused)}
  >
        <Volume2
					class={`hover:text-lime-700  text-gray-800/30 transition-all duration-100 ease-linear cursor-pointer ${!paused ? "text-lime-700" : ""}`}
					/>
  </button>
</div>
