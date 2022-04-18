<script lang="ts" context="module">
  type CardDecoration = "none" | "solid" | "dashed" | "across";
</script>

<script lang="ts">
  export let decoration: CardDecoration = "none";
  export let secondary: boolean = false;
  export let danger: boolean = false;
</script>

<div class="card">
  <div class="card__header">
    <slot name="header" />
  </div>
  {#if decoration === "across"}
    <div class="card__across">
      <span class="card__across-line" />
      <div class="card__across-content">
        <slot />
      </div>
      <span class="card__across-line" />
    </div>
  {:else}
    <div
      class="card__content {decoration}"
      class:danger
    >
      <slot />
    </div>
  {/if}
</div>

<style lang="scss">
  @import "../styles/global.scss";

  @mixin cardDecoration {
    &.none {
      border: none;
    }

    &.solid {
      border: 1px solid $secondary;
    }

    &.dashed {
      border: 1px dashed $secondary;
    }

    &.secondary {
      border-color: $secondary;
    }

    &.danger {
      border-color: $danger;
    }
  }


  .card {
    position: relative;
    overflow: hidden;

    &__content {
      @include cardDecoration();
      padding: 15px;
    }

    &__header {
      padding: 0;
      max-width: fit-content;
      transform: translateY(50%);
    }

    &__across {
      display: flex;
      align-items: center;

      &-line {
        height: 1px;
        min-width: 30px;
        background-color: rgba($gray, 0.7);
      }

      &-content {
        display: flex;
        padding: 0 5px;
      }
    }
  }
</style>
