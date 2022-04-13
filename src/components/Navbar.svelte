<script lang="ts" context="module">
  // import Button from "./buttons/Button.svelte";
  import Logo from "./navbar/Logo.svelte";
</script>

<nav class="navbar">
  <div class="container">

    <div class="navbar-logo">
      <Logo />
    </div>
    <div class="navbar-links"></div>
    <div class="navbar-button">
      
    </div>
  </div>
</nav>

<style lang="scss">
  @import "../styles/global.scss";

  .navbar {
    display: flex;
    align-items: center;
    height: 50px;
  }
</style>
