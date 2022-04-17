<script lang="ts" context="module">
  import type { WalletType, ConnectionError } from "../../stores/wallet";
  import { wallet, connectWallet, disconnectWallet } from "../../stores/wallet";
  import { getWalletByType } from "../../wallet/helper";
  import { addressPrune } from "../../helpers/addressPrune";
  import Modal from "../Modal.svelte";
  import Account from "./connect-wallet-modal/Account.svelte";
  import Install from "./connect-wallet-modal/Install.svelte";
  import Connect from "./connect-wallet-modal/Connect.svelte";
  import IconHeader from "../IconHeader.svelte";
  import WavesIcon from "../icons/WavesIcon.svelte";

  type Step = "account" | "connect" | "connecting" | "wavesKeeperInstall";
  const TitleByStepMap: { [step in Step]: string } = {
    account: "Account",
    connect: "Connect Wallet",
    connecting: "Connecting...",
    wavesKeeperInstall: "Install WavesKeeper",
  };
</script>

<script lang="ts">
  let modal: Modal;
  let step: Step = $wallet.isConnected ? "account" : "connect";
  let connectionError: ConnectionError | undefined;

  export function show() {
    connectionError = undefined;
    if ($wallet.isConnected) {
      step = "account";
    } else {
      step = "connect";
    }
    modal && modal.openModal();
  }

  async function connect(walletType: WalletType) {
    if (await getWalletByType(walletType).isAvailable()) {
      step = "connecting";
      connectionError = undefined;
      try {
        await connectWallet(walletType).then(modal.closeModal);
      } catch (e) {
        step = "connect";
        connectionError = e;
      }
    } else {
      step = "wavesKeeperInstall";
    }
  }

  async function disconnect(walletType: WalletType) {
    step = "connect";
    await disconnectWallet(walletType).finally(modal.closeModal);
  }
</script>

<Modal bind:this={modal}>
  <div class="title" slot="title">
    {#if step === "account"}
      <IconHeader>
        <svelte:component this={WavesIcon} slot="icon" size={32} />
        <div class="fs-16 weight-normal" slot="title">
          {addressPrune($wallet.address, 6)}
        </div>
        <div slot="description" class="fs-12 weight-light">
          {$wallet.type}
        </div>
      </IconHeader>
    {:else}
      <h6 class="weight-normal">{TitleByStepMap[step]}</h6>
    {/if}
  </div>
  <div class="content" slot="content">
    {#if step === "connect"}
      <Connect {connectionError} on:connect={(e) => connect(e.detail)} />
    {:else if step === "account"}
      <Account on:logout={() => disconnect($wallet.type)} />
    {:else if step === "connecting"}
      some text about waiting loader
    {:else if step === "wavesKeeperInstall"}
      <Install walletType="waveskeeper" />
    {/if}
  </div>
</Modal>

<style lang="scss">
  @import "../../styles/global.scss";

  .title {
    max-width: 265px;

    &__description {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
  }

  .content {
    max-width: 300px;
  }
</style>
