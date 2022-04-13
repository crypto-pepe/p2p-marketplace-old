<script lang="ts">
  import Footer from "./components/footer.svelte";
  import { initPriceOracle } from "./stores/priceOracle";

  // export let name: string;

  const onFinishLoading = async () => {
    const loader = document.getElementById("full-screen");
    loader.style.opacity = "0";
    loader.style.visibility = "hidden";
  };

  // subscribe to price oracle
  // subscribe to public room

  // initPriceOracle();
</script>

<svelte:window on:load={onFinishLoading} />
<main />
<Footer />

<style>
</style>
