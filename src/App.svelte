<script lang="ts">
  import Navbar from "./components/Navbar.svelte";
  import Footer from "./components/Footer.svelte";
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
<div class="app">
  <Navbar />
  <main>a</main>
  <Footer />
</div>

<style lang="scss">
  .app {
    display: grid;
    grid-template-rows: min-content 1fr min-content;
    row-gap: 20px;
    min-height: 100vh;
  }
</style>
