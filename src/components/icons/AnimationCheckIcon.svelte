<script lang="ts">
  export let size: number = 64;
  export let checked: boolean = false;

  $: iconSize = `--iconSize: ${size}px`;
</script>

<div class="check" style={iconSize}>
  <svg
    class="check__icon"
    class:checked
    width={size}
    height={size}
    viewBox="0 0 44 44"
  >
    <path
      d="M14,24 L21,31 L39.7428882,11.5937758 C35.2809627,6.53125861 30.0333333,4 24,4 C12.95,4 4,12.95 4,24 C4,35.05 12.95,44 24,44 C35.05,44 44,35.05 44,24 C44,19.3 42.5809627,15.1645919 39.7428882,11.5937758"
      transform="translate(-2.000000, -2.000000)"
    />
  </svg>
</div>

<style lang="scss">
  @import "../../styles/global.scss";

  .check {
    border: 1px solid rgba($primary, 0.2);
    border-radius: 50%;
    position: relative;
    width: calc(var(--iconSize));
    height: calc(var(--iconSize));
    &__icon {
      fill: none;
      stroke-width: 2;
      stroke: $primary;
      stroke-linecap: round;
      stroke-linejoin: round;
      width: var(--iconSize);
      height: var(--iconSize);
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 1;
      stroke-dashoffset: 162.6 - 38;
      stroke-dasharray: 0 162.6 133 (162.6 - 133);
      transition: all 0.3s ease 0s;
      transform: translate(-50%, -50%);

      &.checked {
        stroke-dashoffset: 162.6;
        stroke-dasharray: 0 162.6 28 (162.6 - 28);
        transition: all 0.3s ease 0.2s;
      }
      &:before {
        opacity: 0;
        transform: scale(0.3) translate(-50%, -50%) rotate(45deg);
        animation: bounceInBeforeDont 0.3s linear forwards 0s;
      }
      &:after {
        opacity: 0;
        transform: scale(0.3) translate(-50%, -50%) rotate(-45deg);
        animation: bounceInAfterDont 0.3s linear forwards 0s;
      }
    }
  }

  @keyframes bounceInBeforeDont {
    0% {
      opacity: 1;
      transform: scale(1) translate(-50%, -50%) rotate(45deg);
    }
    100% {
      opacity: 0;
      transform: scale(0.3) translate(-50%, -50%) rotate(45deg);
    }
  }

  @keyframes bounceInAfterDont {
    0% {
      opacity: 1;
      transform: scale(1) translate(-50%, -50%) rotate(-45deg);
    }
    100% {
      opacity: 0;
      transform: scale(0.3) translate(-50%, -50%) rotate(-45deg);
    }
  }
</style>
