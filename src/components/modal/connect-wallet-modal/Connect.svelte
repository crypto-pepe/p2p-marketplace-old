<script lang="ts" context="module">
  import type { ConnectionError, WalletType } from "../../../stores/wallet";
  import { createEventDispatcher } from "svelte";
  import Button from "../../Button.svelte";
  import WavesIcon from "../../icons/WavesIcon.svelte";
</script>

<script lang="ts">
  export let connectionError: ConnectionError | undefined;
  const dispatch = createEventDispatcher();

  function connect(walletType: WalletType) {
    dispatch("connect", walletType);
  }
</script>

<div class="connect">
  <!-- <Typography component="small">
    To connect the wallet, you must use one of the following providers
  </Typography> -->
  <div class="connect__btns">
    <Button fluid light on:click={() => connect("waveskeeper")}
      ><WavesIcon size={14} /> WavesKeeper</Button
    >
  </div>
  {#if connectionError}
    <!-- <Card decoration="dashed" danger>
      <Typography component="small" align="center" decoration="danger"> -->
    <p>
      {connectionError.message}
    </p>
    <!-- </Typography>
    </Card> -->
  {/if}
  <!-- <Card decoration="across">
    <Typography component="small" align="center"> -->
  <p>
    Be careful not to share your seed phrase or passwords with third parties. We
    will never ask you to do this. Don't install unknown extensions. Keep your
    money with safety
  </p>
  <!-- </Typography>
  </Card> -->
</div>

<style lang="scss">
  .connect {
    display: grid;
    grid-row-gap: 20px;

    &__btns {
      display: grid;
      grid-row-gap: 15px;
    }
  }
</style>
