<script lang="ts">
  import { prices, initPriceOracle } from "./stores/oracle";
  import { wallet, connectWallet } from "./stores/wallet";
  import Footer from "./components/footer.svelte";

  const onFinishLoading = async () => {
    const loader = document.getElementById("full-screen");
    loader.style.opacity = "0";
    loader.style.visibility = "hidden";
  };

  connectWallet("waveskeeper");
  initPriceOracle();
</script>

<svelte:window on:load={onFinishLoading} />
<main>
  {Object.keys($prices)
    .map((ticker) => `${ticker} = ${$prices[ticker].price}`)
    .join(" | ")}

  {JSON.stringify($wallet)}
</main>
<Footer />

<style>
</style>
