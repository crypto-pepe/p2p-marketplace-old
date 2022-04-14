<script lang="ts" context="module">
  import type { SvelteComponent } from "svelte";
  import MediumIcon from "./icons/MediumIcon.svelte";
  import TelegramIcon from "./icons/TelegramIcon.svelte";
  import TwitterIcon from "./icons/TwitterIcon.svelte";
  import GithubIcon from "./icons/GithubIcon.svelte";
  import MatrixIcon from "./icons/MatrixIcon.svelte";
</script>

<script lang="ts">
  const SocialIconItems: {
    title: string;
    href: string;
    icon: SvelteComponent;
  }[] = [
    {
      title: "Matrix",
      href: "#",
      icon: MatrixIcon,
    },
    {
      title: "Medium",
      href: "https://crypto-pepe-team.medium.com",
      icon: MediumIcon,
    },
    {
      title: "Twitter",
      href: "https://twitter.com/cryptopepeteam",
      icon: TwitterIcon,
    },
    {
      title: "Telegram",
      href: "https://t.me/pepe_team",
      icon: TelegramIcon,
    },
    {
      title: "GitHub",
      href: "https://github.com/crypto-pepe",
      icon: GithubIcon,
    },
  ];
</script>

<div class="container">
  <footer class="footer ">
    <div class="footer__version">
      <span class="small secondary">
        Version:
        <a
          class="footer__copyright-link"
          href={`https://github.com/crypto-pepe/p2p-marketplace/tree/${COMMITHASH}`}
          referrerpolicy="noopener noreferrer"
          target="_blank"
        >
          {VERSION}
        </a>
      </span>
    </div>
    <div class="footer__copyright small secondary">
      Povered by
      <a
        class="footer__copyright-link"
        href="https://pepe.team"
        referrerpolicy="noopener noreferrer"
        target="_blank"
      >
        PepeTeam
      </a>
    </div>
    <ul class="footer__socials">
      {#each SocialIconItems as item}
        <li class="footer__socials-item">
          <a
            href={item.href}
            class="footer__socials-item-link"
            title={item.title}
            referrerpolicy="noopener noreferrer"
            target="_blank"
          >
            <svelte:component this={item.icon} />
          </a>
        </li>
      {/each}
    </ul>
  </footer>
</div>

<style lang="scss">
  @import "../styles/global.scss";

  .footer {
    display: grid;
    grid-column-gap: 15px;
    grid-row-gap: 15px;
    align-items: center;
    grid-template-areas: "version copyright socials";
    height: 50px;
    // margin-bottom: 25px;

    &__version,
    &__copyright,
    &__socials {
      display: flex;
    }

    &__version {
      grid-area: version;
    }

    &__copyright {
      grid-area: copyright;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;

      &-link {
        margin-left: 4px;
        color: $gray;
        font-weight: 500;
      }
    }

    &__socials {
      grid-area: socials;
      justify-content: flex-end;

      &-item:not(:last-child) {
        margin-right: 10px;
      }
    }
  }

  @media (max-width: 576px) {
    .footer {
      grid-template-areas:
        "socials socials"
        "version copyright";

      &__version,
      &__copyright,
      &__socials {
        justify-content: center;
      }
    }
  }
</style>
