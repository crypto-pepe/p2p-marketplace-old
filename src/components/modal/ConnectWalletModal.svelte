<script lang="ts" context="module">
  import Modal from "../Modal.svelte";

  // import Connect from "./Connect.svelte";
  // import Install from "./Install.svelte";
  // import { getProviderByType } from "../../providers/helper";
  // import type { WalletType, ConnectionError } from "../../stores/types";
  // import { connectWallet, disconnectWallet, wallet } from "../../stores/wallet";
  // import { ProviderIcons } from "../../helpers/providerIcons";

  // type Step =
  //   | "account"
  //   | "connect"
  //   | "connecting"
  //   | "metamaskInstall"
  //   | "wavesKeeperInstall";
  // const TitleByStepMap: { [step in Step]: string } = {
  //   account: "Account",
  //   connect: "Connect Wallet",
  //   connecting: "Connecting...",
  //   metamaskInstall: "Install Metamask",
  //   wavesKeeperInstall: "Install WavesKeeper",
  // };
</script>

<script lang="ts">
  // import Account from "./Account.svelte";

  let modal: Modal;
  // let step: Step = "connect";
  // let connectionError: ConnectionError | undefined;

  export function show() {
    // connectionError = undefined;
    // if ($wallet.isConnected) {
    //   step = "account";
    // } else {
    //   step = "connect";
    // }

    modal && modal.openModal();
  }

  // async function connect(walletType: WalletType) {
  //   if (await getProviderByType(walletType).isAvailable()) {
  //     step = "connecting";
  //     connectionError = undefined;
  //     try {
  //       await connectWallet(walletType).then(modal.closeModal);
  //     } catch (e) {
  //       step = "connect";
  //       connectionError = e;
  //     }
  //   } else {
  //     step =
  //       walletType == "metamask" ? "metamaskInstall" : "wavesKeeperInstall";
  //   }
  // }

  // async function disconnect(walletType: WalletType) {
  //   step = "connect";
  //   await disconnectWallet(walletType).finally(modal.closeModal);
  // }
</script>

<Modal bind:this={modal}>
  <div class="title" slot="title">
    aaa
    <!-- {#if step === "account"}
      <IconHeader>
        <svelte:component
          this={ProviderIcons[$wallet.type]}
          slot="icon"
          size={60}
        />
        <Copiable
          slot="title"
          content={$wallet.address}
          component="span"
          weight="medium"
          addressPrune
        />
        <div class="title__description" slot="description">
          <Typography component="small">
            {$wallet.type}
          </Typography>
          <Typography component="small" weight="medium">
            {$wallet.balance}
            {$wallet.asset}
          </Typography>
        </div>
      </IconHeader>
    {:else}
      <Typography component="h6">
        {TitleByStepMap[step]}
      </Typography>
    {/if} -->
  </div>
  <div class="content" slot="content">
    aaa
    <!-- {#if step === "connect"}
      <Connect {connectionError} on:connect={(e) => connect(e.detail)} />
    {:else if step === "account"}
      <Account on:logout={() => disconnect($wallet.type)} />
      address={$wallet.address}
        network={$wallet.network}
        walletType={$wallet.type}
    {:else if step === "connecting"}
      some text about waiting loader
    {:else if step === "metamaskInstall"}
      <Install walletType="metamask" />
    {:else if step === "wavesKeeperInstall"}
      <Install walletType="waveskeeper" />
    {/if} -->
  </div>
</Modal>
