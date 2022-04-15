<script lang="ts" context="module">
  import Button from "../../Button.svelte";
  import { createEventDispatcher } from "svelte";
</script>

<script lang="ts">
  const dispatch = createEventDispatcher();
</script>

<div>
  <Button fluid light on:click={() => dispatch("logout")}>Disconnect</Button>
</div>
