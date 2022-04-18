<div class="icon-header">
  <div class="icon-header__icon">
    <slot name="icon" />
  </div>
  <div class="icon-header__content">
    <div class="icon-header__content-title">
      <slot name="title" />
    </div>
    <div class="icon-header__content-description">
      <slot name="description" />
    </div>
  </div>
</div>

<style lang="scss">
  @import "../styles/global.scss";

  .icon-header {
    display: grid;
    grid-template-columns: min-content minmax(100px, auto);
    grid-column-gap: 8px;
    align-items: center;

    &__content {
      display: flex;
      flex-direction: column;

      // &-title {
      //   // display: flex;
      //   margin-bottom: 5px;
      // }
    }
  }
</style>
