<script lang="ts" context="module">
  import { Button } from "../../Button.svelte";
  import type { WalletType } from "../../../stores/wallet";

  const InstallByWallet: { [walletType in WalletType]: { href: string } } = {
    waveskeeper: {
      href: "https://docs.waves.tech/en/ecosystem/waves-keeper/#download-waves-keeper",
    },
  };
</script>

<script lang="ts">
  export let walletType: WalletType;
</script>

<div>
  Some text
  <a
    href={InstallByWallet[walletType] && InstallByWallet[walletType].href}
    referrerpolicy="noopener noreferrer"
    target="_blank"
  >
    <Button fluid light>Install</Button>
  </a>
</div>

<style lang="scss">
</style>
