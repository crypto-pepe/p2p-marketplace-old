<script lang="ts" context="module">
  import type { Wallet } from "../stores/wallet";
  import { wallet } from "../stores/wallet";
  import { location } from "svelte-spa-router";
  import { addressPrune } from "../helpers/addressPrune";
  import Logo from "./navbar/Logo.svelte";
  import Button from "./Button.svelte";
  import ConnectWalletModal from "./modal/ConnectWalletModal.svelte";

  type RoutesType = { ref: string; name: string; location: string }[];

  function buttonDecorator(wallet: Wallet): {
    title: string;
    primary?: boolean;
    secondary?: boolean;
  } {
    return wallet.isConnected
      ? { title: addressPrune(wallet.address, 4), secondary: true }
      : { title: "Connect", primary: true };
  }
</script>

<script lang="ts">
  export let routes: RoutesType = [];

  let opened: boolean = false;
  let connectWalletModal: ConnectWalletModal;
  $: buttonArgs = buttonDecorator($wallet);
  $: isConnected = $wallet.isConnected;

  function handleBurgerClick() {
    opened = !opened;
  }

  function closeNavbar() {
    opened = false;
  }
</script>

<header>
  <div class="container">
    <div class="header">
      <div class="header-logo">
        <Logo />
      </div>
      <div class="burger" class:opened on:click={handleBurgerClick}>
        <span class="burger__line" />
      </div>
      <nav class="navbar" class:opened>
        <ul class="navbar__links">
          {#each routes as route}
            {#if route.name === "Account" || route.name === "Exchanges"}
              {#if isConnected}
                <li
                  class="navbar__links-item"
                  class:active={$location === route.ref}
                >
                  <a href={`#${route.ref}`} on:click={closeNavbar}
                    >{route.name}
                  </a>
                </li>
              {/if}
            {:else}
              <li
                class="navbar__links-item"
                class:active={$location === route.ref}
              >
                {#if route.location === "local"}
                  <a href={`#${route.ref}`} on:click={closeNavbar}
                    >{route.name}
                  </a>
                {:else}
                  <a
                    href={route.ref}
                    target="_blank"
                    referrerpolicy="noopener noreferrer"
                    on:click={closeNavbar}
                    >{route.name}
                  </a>
                {/if}
              </li>
            {/if}
          {/each}
        </ul>
        <div class="navbar-button">
          <Button
            fluid
            primary={buttonArgs.primary}
            secondary={buttonArgs.secondary}
            on:click={connectWalletModal.show}
            on:click={closeNavbar}
          >
            {buttonArgs.title}
          </Button>
        </div>
      </nav>
      <ConnectWalletModal bind:this={connectWalletModal} />
    </div>
  </div>
</header>

<style lang="scss">
  @import "../styles/global.scss";

  header {
    display: flex;
    align-items: center;
    height: 50px;
  }

  .header {
    position: relative;
    display: grid;
    grid-template-columns: min-content 1fr;
    column-gap: 20px;
    align-items: center;

    .burger {
      display: none;
    }

    .navbar {
      display: grid;
      grid-template-columns: 1fr 16.6%;
      &__links {
        display: grid;
        grid-template-columns: repeat(5, min-content);
        column-gap: 20px;
        justify-content: center;

        &-item {
          padding: 2px 5px;
          border-bottom: 1px solid transparent;
          font-size: 16px;
          line-height: 20px;
          font-weight: 300;
          transition: border-bottom 0.3s ease-in-out;

          &.active {
            border-bottom: 1px solid $primary;
          }

          & a {
            color: $secondary;
          }
        }
      }
    }
  }

  @media (max-width: 991px) {
    .header {
      display: flex;
      justify-content: space-between;

      .burger {
        position: relative;
        display: block;
        width: 40px;
        height: 40px;
        cursor: pointer;

        &__line {
          content: "";
          position: absolute;
          top: 50%;
          right: 0;
          width: 27px;
          height: 2px;
          background-color: $gray;
          transition: background-color 0.2s ease-in-out,
            transform 0.2s ease-in-out;
          transform: translateY(-50%);

          &::before,
          &::after {
            content: "";
            position: absolute;
            width: 27px;
            height: 2px;
            background-color: $gray;
            transition: transform 0.2s ease-in-out;
          }

          &::before {
            transform: translateY(7px);
          }

          &::after {
            transform: translateY(-7px);
          }
        }

        &.opened {
          .burger__line {
            background-color: transparent;
            transform: translateY(-50%);

            &::before {
              transform: rotate(-45deg);
            }

            &::after {
              transform: rotate(45deg);
            }
          }
        }
      }

      .navbar {
        z-index: 5;
        position: absolute;
        top: 50px;
        right: 0;
        display: grid;
        grid-template-columns: 1fr;
        row-gap: 15px;
        padding: 15px;
        width: 240px;
        background-color: $white;
        border: 1px solid $secondary;
        visibility: hidden;
        overflow-y: auto;
        transition: transform 0.3s ease-in-out;
        transform: translateX(15px);

        &__links {
          display: grid;
          grid-template-columns: 1fr;
          row-gap: 15px;
          text-align: center;

          &-item {
            & a {
              display: flex;
              justify-content: center;
            }
          }
        }

        &.opened {
          visibility: visible;
          transition: transform 0.3s ease-in-out;
          transform: translateX(0px);
        }
      }
    }
  }
</style>
