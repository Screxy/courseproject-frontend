<template>
  <section class="products">
  </section>
</template>

<script lang="ts" setup>
import {computed, ref} from 'vue'
import {useAuthStore} from '@/stores/auth'
import axios from 'axios'

const authStore = useAuthStore()

const dialogVisible = ref(false)
const fetchData = async () => {
  const {data} = await axios.get('http://localhost:8000/api/v1/articles/comments/')
  console.log(data)
}
fetchData()

function showDialog() {
  dialogVisible.value = true
}

</script>

<style lang="scss">
@use '@/assets/scss/mixin' as *;
@use '@/assets/scss/variables' as *;

.products__wrapper {
  @include wrapper(block);
}

.products__title {
  @include title();
  margin-top: 2rem;
}

.products__text {
  margin-top: 1.5rem;
  @include subTitle();
}

.products__button {
  margin-top: 1.5rem;
}

.products__filter {
  margin-top: 1.5rem;

  .products__filter-button_checked {
    background-color: #008167;
    border-color: #008167;
  }
}

.products__filter-button + .products__filter-button {
  margin-left: 1.5rem;
}

.products__search {
  margin-top: 1.5rem;
}
</style>
