<script lang="ts">
  export let isClosable: boolean = true;
  export let isCloseByEsc: boolean = true;

  let visible: boolean = false;

  export function openModal() {
    visible = true;
  }

  export function closeModal() {
    visible = false;
  }
  function handleKeyEsc(event) {
    if (event.key === "Escape" && isCloseByEsc) {
      visible = false;
    }
  }
</script>

<svelte:window on:keyup={handleKeyEsc} />

{#if visible}
  <div class="modal" on:click|self={closeModal}>
    <div class="modal__window">
      {#if isClosable}
        <button class="modal__window-close-btn" on:click={closeModal} />
      {/if}
      <div class="modal__window-title">
        <slot name="title" />
      </div>
      <div class="modal__window-content">
        <slot name="content" />
      </div>
    </div>
  </div>
{/if}

<style lang="scss">
  @import "../styles/global.scss";

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.7);
    z-index: 999;

    &__window {
      position: relative;
      padding: 20px;
      border: 1px solid $secondary;
      background-color: $white;
      display: grid;
      grid-row-gap: 20px;

      &-close-btn {
        position: absolute;
        top: 20px;
        right: 20px;
        width: 30px;
        height: 30px;
        border: none;
        background-color: transparent;
        cursor: pointer;
        opacity: 0.5;

        &::before {
          content: "";
          position: absolute;
          top: 9px;
          right: -3px;
          width: 25px;
          height: 2px;
          background-color: $secondary;
          transform: rotate(-45deg);
        }
        &::after {
          content: "";
          position: absolute;
          top: 9px;
          right: -3px;
          width: 25px;
          height: 2px;
          background-color: $secondary;
          transform: rotate(45deg);
        }

        &:hover,
        &:active,
        &:focus {
          opacity: 1;
        }
      }

      &-title {
        margin-right: 35px;
      }
    }
  }
</style>
