<script lang="ts">
  import Router from "svelte-spa-router";
  import Navbar from "./components/Navbar.svelte";
  import Footer from "./components/Footer.svelte";
  import { initPriceOracle } from "./stores/priceOracle";
  import Marketplace from "./routes/Marketplace.svelte";
  import Exchanges from "./routes/Exchanges.svelte";

  // export let name: string;

  const onFinishLoading = async () => {
    const loader = document.getElementById("full-screen");
    loader.style.opacity = "0";
    loader.style.visibility = "hidden";
  };

  const routes = {
    "/": Marketplace,
    "/exchanges": Exchanges,
  };

  const navLinks = [
    { ref: "/", name: "Marketplace" },
    { ref: "/exchanges", name: "Exchanges" },
    { ref: "/faq", name: "FAQ" },
  ];

  // subscribe to price oracle
  // subscribe to public room

  // initPriceOracle();
</script>

<svelte:window on:load={onFinishLoading} />
<div class="app">
  <Navbar routes={navLinks} />
  <main>
    <Router {routes} />
  </main>
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
