<script lang="ts" context="module">
  import { location } from "svelte-spa-router";
  // import Button from "./buttons/Button.svelte";
  import Logo from "./navbar/Logo.svelte";
</script>

<script lang="ts">
  type RoutesType = { ref: string; name: string }[];

  export let routes = [];

  console.log($location);
</script>

<nav>
  <div class="container">
    <div class="navbar">
      <div class="navbar-logo">
        <Logo />
      </div>
      <ul class="navbar__links">
        {#each routes as route}
          <li class="navbar__links-item" class:active={$location === route.ref}>
            <a href={`#${route.ref}`}>{route.name}</a>
          </li>
        {/each}
      </ul>
      <div class="navbar-button">
        <button>Connect</button>
      </div>
    </div>
  </div>
</nav>

<style lang="scss">
  @import "../styles/global.scss";

  nav {
    display: flex;
    align-items: center;
    height: 50px;
  }

  .navbar {
    display: grid;
    grid-template-columns: 15% 1fr 15%;
    column-gap: 20px;
    align-items: center;

    &__links {
      display: grid;
      grid-template-columns: repeat(3, min-content);
      column-gap: 20px;
      justify-content: center;

      &-item {
        padding: 2px 5px;
        border-bottom: 1px solid transparent;
        font-size: 16px;
        line-height: 20px;
        font-weight: 300;
        transition: all 0.3s ease-in-out;

        &.active {
          border-bottom: 1px solid $primary;
        }

        & a {
          color: $secondary;
        }
      }
    }
  }

  button {
    width: 100%;
    padding: 6px 15px;
    border: none;
    font-size: 14px;
    line-height: 18px;
    font-weight: 300;
    background-color: $primary;
    cursor: pointer;
  }
</style>
