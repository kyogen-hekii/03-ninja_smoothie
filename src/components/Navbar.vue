<template>
  <div class="navbar">
    <nav class="nav-extended indigo darken-2">
      <div class="nav-content">
        <router-link :to="{ name: 'Index'}">
          <span class="nav-title">Ninja Smoothies</span>
        </router-link>
        <router-link :to="{name: 'AddSmoothie'}">
          <span class="btn-floating btn-large halfway-fab pink">
            <i class="material-icons">add</i>
          </span>
        </router-link>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>

</style>
