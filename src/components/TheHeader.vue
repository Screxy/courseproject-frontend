<template>
  <header class="header">
    <div class="header__wrapper">
      <NavBar/>
    </div>
  </header>
</template>

<script lang="ts" setup>
import NavBar from './NavBar.vue'
</script>

<style scoped lang="scss">
@use '@/assets/scss/mixin' as *;
@use '@/assets/scss/variables' as *;

.header {
  padding: 1.5rem 0;
  background-color: $primary-body-bg;
}

.header__wrapper {
  @include wrapper();
}
</style>
