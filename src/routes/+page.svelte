<script>
  import { onMount } from "svelte";

  import data from "../data/monster.json";

  import Audio from "$lib/components/Audio.svelte";

  function handleError(event) {
    event.target.src = "/wild/unknown.png";
    event.target.onerror = null;
  }
</script>

<main class="flex gap-2.5 flex-col my-4">
  <div class="card mx-8 px-6 py-2">
    <button
      class="hover:from-stone-400/80 hover:to-slate-400/80 bg-linear-30 from-stone-400 to-slate-400 font-semibold text-stone-900 text-sm px-4 py-2 cursor-pointer hover:shadow-xs hover:shadow-slate-300 rounded-xl"
      >Shuffle</button
    >
  </div>
  <section class="card mx-8 px-6 py-4">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
      {#each data as monster}
        <div class="flex gap-4 rounded-4xl px-2 py-1">
          <div class="shrink-0 rounded-full">
            <img
              src={"/wild/" +
                monster.name.toLocaleLowerCase().split(" ").join("_") +
                ".png"}
              class="rotate w-16 h-16 object-scale-down p-1 rounded-full"
              alt={monster.name}
              onerror={handleError}
            />
          </div>

          <div class="flex-2 flex gap-2 items-center mb-auto">
            <h5 class="text-lg font-semibold text-stone-900">
              {monster.name}
            </h5>

            <Audio src={`./sound/${monster.name.split(" ").join("_")}.mp3`} />
          </div>
        </div>
      {/each}
    </div>
  </section>
</main>

<style>
  .card {
    background-color: #fdf6ed85;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;

    backdrop-filter: blur(1rem);
    border-radius: 2rem;
  }
</style>
