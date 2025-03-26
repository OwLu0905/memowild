<script>
	import { onMount } from "svelte";
	import Audio from "$lib/components/Audio.svelte";
	import { base } from "$app/paths";
	import { sineOut } from "svelte/easing";

	let fetchedData = $state([]);

	function shufflet(node, { from, to }, params) {
		const dx = from.left - to.left;
		const dy = from.top - to.top;

		return {
			delay: 0,
			duration: 600,
			easing: sineOut,

			css: (t, u) =>
				`opacity:${t}; transform: translate(${u * dx}px, ${u * dy}px) rotateX(${t * 360}deg);`,
		};
	}

	function shuffet() {
		const total = fetchedData.length;
		for (let i = total - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));

			[fetchedData[i], fetchedData[j]] = [
				fetchedData[j],
				fetchedData[i],
			];
		}
	}

	function handleError(event) {
		event.target.src = `${base}/wild/unknown.png`;
		event.target.onerror = null;
	}

	onMount(async () => {
		const response = await fetch(`${base}/monster.json`);

		if (!response.ok) return;

		fetchedData = await response.json();
	});
</script>

<main class="flex gap-2.5 flex-col">
	<section class="card flex flex-col gap-2 mx-2 lg:mx-8 px-6 py-4">
		<div class="ml-auto px-4 py-2 md:py-1">
			<button
				class="cursor-pointer hover:text-amber-700 transition-color duration-150 ease-linear"
				aria-label="button"
				onclick={shuffet}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-shuffle-icon lucide-shuffle"
					><path d="m18 14 4 4-4 4" /><path
						d="m18 2 4 4-4 4"
					/><path
						d="M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22"
					/><path
						d="M2 6h1.972a4 4 0 0 1 3.6 2.2"
					/><path
						d="M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45"
					/></svg
				>
			</button>
		</div>
		<div
			class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5"
		>
			{#each fetchedData as monster (monster.name)}
				<div
					animate:shufflet
					class="flex gap-4 rounded-4xl px-2 py-1 @container"
				>
					<div class="shrink-0 rounded-full">
						<img
							src={`${base}/wild/${monster.name.toLocaleLowerCase().split(" ").join("_")}.png`}
							class="rotate w-14 h-14 object-scale-down p-1 rounded-full"
							alt={monster.name}
							onerror={handleError}
						/>
					</div>

					<div
						class="flex-2 flex gap-2 justify-between @md:justify-start items-start mb-auto"
					>
						<h5
							class="text-lg leading-6 font-semibold text-stone-800"
						>
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
