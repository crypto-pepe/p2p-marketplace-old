<script lang="ts">
  import { prices, initPriceOracle } from "./stores/oracle";
  import { wallet, connectWallet } from "./stores/wallet";
  import Router from "svelte-spa-router";
  import Navbar from "./components/Navbar.svelte";
  import Footer from "./components/Footer.svelte";
  import Marketplace from "./routes/Marketplace.svelte";
  import Exchanges from "./routes/Exchanges.svelte";

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
    { ref: "/", name: "Marketplace", location: "local" },
    { ref: "/exchanges", name: "Exchanges", location: "local" },
    { ref: "https://pepe-team.tawk.help/", name: "FAQ", location: "global" },
  ];

  // subscribe to price oracle
  // subscribe to public room

  connectWallet("waveskeeper");
  initPriceOracle();
</script>

<svelte:window on:load={onFinishLoading} />
<div class="app">
  <Navbar routes={navLinks} />
  <main>
    <Router {routes} />
    {Object.keys($prices)
      .map((ticker) => `${ticker} = ${$prices[ticker].price}`)
      .join(" | ")}
    
    {JSON.stringify($wallet)}
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
