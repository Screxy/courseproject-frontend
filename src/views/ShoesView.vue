<template>
  <TheHeader/>
  <section class="shoes">
    <div class="shoes__wrapper">
      <div v-if="shoes.length" v-for="shoe in shoes">
        {{ shoe.name }}
        {{ shoe.color[0].name }}
        {{ shoe.style[0].name }}
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {useAuthStore} from '@/stores/auth'
import TheHeader from '@/components/TheHeader.vue'
import {useRoute} from 'vue-router'
import {instance} from '@/main'

const authStore = useAuthStore()
const route = useRoute()

const shoes = ref([])
const fetch = async () => {
  try {
    const res = await instance.get('/api/v1/shoefinder/models/')
    shoes.value.push(...res.data.results)
  } catch (e) {
    console.log(e)
  }
}
fetch()
</script>

<style lang="scss">
@use '@/assets/scss/mixin' as *;
@use '@/assets/scss/variables' as *;

.shoes__wrapper {
  @include wrapper(block);
}
</style>
