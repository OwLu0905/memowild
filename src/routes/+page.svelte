<script>
	import { onMount } from "svelte";

	import Audio from "$lib/components/Audio.svelte";

	import { base } from "$app/paths";

	let fetchedData;

	function handleError(event) {
		event.target.src = "/wild/unknown.png";
		event.target.onerror = null;
	}

	onMount(async () => {
		const response = await fetch("/monster.json");

		if (!response.ok) return;

		fetchedData = await response.json();
	});
</script>

<main class="flex gap-2.5 flex-col">
	<section class="card mx-8 px-6 py-4">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
			{#each fetchedData as monster}
				<div class="flex gap-4 rounded-4xl px-2 py-1">
					<div class="shrink-0 rounded-full">
						<img
							src={`${base}/wild/${monster.name.toLocaleLowerCase().split(" ").join("_")}.png`}
							class="rotate w-14 h-14 object-scale-down p-1 rounded-full"
							alt={monster.name}
							onerror={handleError}
						/>
					</div>

					<div class="flex-2 flex gap-2 items-center mb-auto">
						<h5 class="text-lg font-semibold text-stone-900">
							{monster.name}
						</h5>

						<Audio
							src={`/wild/sound/${monster.name.toLowerCase().split(" ").join("_")}.mp3`}
						/>
					</div>
				</div>
			{/each}
		</div>
	</section>
</main>

<style>
	:global(.card) {
		background-color: #fdf6ed85;
		font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;

		backdrop-filter: blur(1rem);
		border-radius: 2rem;
	}
</style>
