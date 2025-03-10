<script>
  import { onMount } from "svelte";

  import data from "../data/monster.json";

  function handleError(event) {
    event.target.src = "/wild/unknown.png";
    event.target.onerror = null;
  }
</script>

<main>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 b"
  >
    {#each data as monster}
      <div class="flex gap-4 hover:bg-[#fdf6ed90] rounded-4xl px-2 py-1">
        <div class="shrink-0 rounded-full">
          <img
            src={"/wild/" +
              monster.name.toLocaleLowerCase().split(" ").join("_") +
              ".png"}
            class="rotate w-20 h-20 object-scale-down p-1 rounded-full"
            alt={monster.name}
            onerror={handleError}
          />
        </div>

        <div class="flex-2">
          <h5 class="text-xl font-semibold text-stone-900">
            {monster.name}
          </h5>
        </div>
      </div>
    {/each}
  </div>
</main>

<style>
  main {
    background-color: #fdf6ed85;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    margin: 2rem;
    padding: 2rem;
    backdrop-filter: blur(1rem);
    border-radius: 2rem;
  }
</style>
