<script lang="ts" context="module">
  import type { ConnectionError, WalletType } from "../../../stores/wallet";
  import { createEventDispatcher } from "svelte";
  import Button from "../../Button.svelte";
  import WavesIcon from "../../icons/WavesIcon.svelte";
  import Card from "../../Card.svelte";
</script>

<script lang="ts">
  export let connectionError: ConnectionError | undefined;
  const dispatch = createEventDispatcher();

  function connect(walletType: WalletType) {
    dispatch("connect", walletType);
  }
</script>

<div class="connect">
  <span class="small">
    To connect the wallet, you must use one of the following providers
  </span>
  <div class="connect__btns">
    <Button fluid light on:click={() => connect("waveskeeper")}
      ><WavesIcon size={14} /> WavesKeeper</Button
    >
  </div>
  {#if connectionError}
    <Card decoration="dashed" danger>
      <span class="small text-center danger">
        {connectionError.message}
      </span>
    </Card>
  {/if}
  <Card decoration="across">
    <span class="small text-center">
      Be careful not to share your seed phrase or passwords with third parties.
      We will never ask you to do this. Don't install unknown extensions. Keep
      your money with safety
    </span>
  </Card>
</div>

<style lang="scss">
  @import "../../../styles/global.scss";

  .connect {
    display: grid;
    grid-row-gap: 20px;

    &__btns {
      display: grid;
      grid-row-gap: 15px;
    }
  }
</style>
