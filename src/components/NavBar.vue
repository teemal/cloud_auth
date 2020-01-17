<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="http://cloud-auth-w2020.web.app/">
        <img src="@/assets/big_chungus.png" width="75" />
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start"></div>

      <div class="navbar-end">
        <div class="navbar-item">
          <LogOut />
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import LogOut from './Logout'
export default {
    components: {
        LogOut,
    }
};
</script>

<style scoped>
</style>