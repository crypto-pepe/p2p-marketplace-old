<script lang="ts">
  import { initPriceOracle } from "./stores/priceOracle";

  export let name: string;

  const onFinishLoading = async () => {
    try {
      throw new Error()
      const loader = document.getElementById("full-screen");
      loader.style.opacity = "0";
      loader.style.visibility = "hidden";
    } catch (err) {
      const loader = document.getElementById("loader");
      const errorLoading = document.getElementById("error-loading");
      loader.style.opacity = "0";
      loader.style.visibility = "hidden";
      errorLoading.style.opacity = "1";
      errorLoading.style.visibility = "visible";
    }
  };

  // subscribe to price oracle
  // subscribe to public room

  initPriceOracle();
</script>

<svelte:window on:load={onFinishLoading} />
<main>
  <h1>Hello {name}!</h1>
  <p>
    Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn
    how to build Svelte apps.
  </p>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
