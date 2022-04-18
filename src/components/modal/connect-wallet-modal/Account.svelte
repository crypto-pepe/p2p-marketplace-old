<script lang="ts" context="module">
  import Button from "../../Button.svelte";
  import { createEventDispatcher } from "svelte";
  import CopyIcon from "../../icons/CopyIcon.svelte";
  import AnimationCheckIcon from "../../icons/AnimationCheckIcon.svelte";
</script>

<script lang="ts">
  export let copied: boolean = false;
  export let checked: boolean = false;

  const dispatch = createEventDispatcher();

  let copyColor = "#4A4A4A";

  function onMouseEnter() {
    copyColor = "#FFFFFF";
  }
  function onMouseMove() {
    copyColor = "#4A4A4A";
  }
</script>

<div class="account">
  <Button
    fluid
    light
    on:click={() => dispatch("copy")}
    on:mouseenter={onMouseEnter}
    on:mouseleave={onMouseMove}
  >
    <div class="copy">
      Copy address
      {#if copied}
        <AnimationCheckIcon size={20} {checked} />
      {:else}
        <CopyIcon size={17} color={copyColor} />
      {/if}
    </div>
  </Button>
  <Button fluid danger on:click={() => dispatch("logout")}>Disconnect</Button>
</div>

<style lang="scss">
  .account {
    display: grid;
    row-gap: 15px;

    .copy {
      display: grid;
      grid-template-columns: auto min-content;
      column-gap: 10px;
      align-items: center;
      justify-content: center;
    }
  }
</style>
