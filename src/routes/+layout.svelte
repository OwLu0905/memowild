<script>
  import { page } from "$app/state";
  import "../app.css";
  import { base } from "$app/paths";

	let { children } = $props();

  const nav = [
    { id: 0, name: "Home", href: `${base}/` },
    { id: 1, name: "Decoration", href: `${base}/decoration` },
  ];

  let current = $derived(page.url.pathname.split("/")[1]);
</script>

{#snippet navItem(item)}
  <li class="">
    <a
      href={item.href}
      class="transition-all duration-300 ease-linear after:bg-amber-800/60 block my-4 py-1 rounded-3xl px-4 underline-transition {current ===
      item.href.split('/')[1]
        ? 'text-emerald-700'
        : 'text-emerald-900/30'}">{item.name}</a
    >
  </li>
{/snippet}

<nav
  class="overflow-hidden flex items-center group hover:w-[32rem] hover:pl-20 hover:pr-10 transition-all duration-300 ease-linear card mx-auto w-92 my-4 px-6"
>
  <ul class="tracking-wider flex gap-6 justify-start items-center">
    {#each nav as n (n.id)}
      {@render navItem(n)}
    {/each}
  </ul>

  <div
    class="ml-auto opacity-0 group-hover:opacity-100 translate-x-5 group-hover:translate-x-0 invisible group-hover:visible transition-all duration-500 ease-linear"
  >
    <img
      src="{base}/wild/arkveld.png"
      class="rotate w-14 h-14 object-scale-down p-1 rounded-full"
      alt={"arkveld"}
    />
  </div>
</nav>

{@render children()}

<style>
  .underline-transition {
    position: relative;
    cursor: pointer;
  }

  .underline-transition::after {
    content: "";
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    transition: width 0.3s ease;
  }
  .underline-transition:hover::after {
    width: 100%;
  }
</style>
