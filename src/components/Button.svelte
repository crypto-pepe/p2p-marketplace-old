<script lang="ts">
  export let primary: boolean = false;
  export let secondary: boolean = false;
  export let fluid: boolean = false;
</script>

<button
  class="btn"
  class:primary
  class:secondary
  class:fluid
  on:click
  on:mouseenter
  on:mouseleave
>
  <slot />
</button>

<style lang="scss">
  @import "../styles/global.scss";

  .btn {
    padding: 6px 15px;
    border: none;
    color: $secondary;
    font-size: 14px;
    line-height: 18px;
    font-weight: 300;
    cursor: pointer;

    &:hover {
      opacity: 0.9;
    }

    &:active {
      opacity: 1;
    }

    &.primary {
      background-color: $primary;
    }

    &.secondary {
      color: $white;
      background-color: $secondary;
    }

    &.fluid {
      max-width: 100%;
      width: 100%;
    }
  }
</style>
