<script lang="ts" context="module">
  import PepeIcon from "../icons/PepeIcon.svelte";
</script>

<a class="logo" href="#" referrerpolicy="noopener noreferrer">
  <div class="logo__img">
    <PepeIcon />
  </div>
  <span class="logo__text">
    <span class="logo__text-light">pepe</span>
    <span class="logo__text-bold">2</span>
    <span class="logo__text-light">pepe</span>
  </span>
</a>

<style lang="scss">
  @import "../../styles/global.scss";

  .logo {
    display: grid;
    grid-template-columns: 32px min-content;
    grid-column-gap: 10px;
    align-items: center;

    &__img {
      width: 32px;
      height: 32px;
    }

    &__text {
      display: flex;
      align-items: center;
      color: $secondary;

      &-bold {
        font-size: 24px;
        line-height: 28px;
        font-weight: 500;
      }

      &-light {
        font-size: 18px;
        line-height: 22px;
        font-weight: 200;
      }
    }
  }

  @media (min-width: 768px) {
    .logo {
      display: grid;
      grid-template-columns: 32px min-content;
      grid-column-gap: 15px;
      align-items: center;

      &__img {
        width: 38px;
        height: 38px;
      }

      &__text {
        display: flex;
        align-items: center;
        color: $secondary;

        &-bold {
          font-size: 28px;
          line-height: 30px;
          font-weight: 500;
        }

        &-light {
          font-size: 20px;
          line-height: 22px;
          font-weight: 200;
        }
      }
    }
  }
</style>
