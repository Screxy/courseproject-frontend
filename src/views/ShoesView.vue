<template>
  <TheHeader/>
  <section class="shoes">
    <div class="shoes__wrapper">
      <div v-if="shoes.length" v-for="shoe in shoes" style="margin-top:1rem; height: 50vh">
        {{ shoe.name }}
        Цвета:
        <ul style="margin-top:.5rem">
          <li v-for="color in shoe.color">
            {{ color.name }}
          </li>
        </ul>
        Стили:
        <ul style="margin-top:.5rem">
          <li v-for="style in shoe.style">
            {{ style.name }}
          </li>
        </ul>
        <hr>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {useAuthStore} from '@/stores/auth'
import TheHeader from '@/components/TheHeader.vue'
import {useRoute} from 'vue-router'
import axios from 'axios'

const authStore = useAuthStore()
const route = useRoute()
const next = ref('')
const shoes = ref([])
const fetch = async (url: string) => {
  try {
    const res = await axios.get(url)
    console.log(res)
    next.value = res.data.next
    shoes.value.push(...res.data.results)
  } catch (e) {
    console.log(e)
  }
}
fetch('http://localhost:8000/api/v1/shoefinder/models/')


</script>

<style lang="scss">
@use '@/assets/scss/mixin' as *;
@use '@/assets/scss/variables' as *;

.shoes__wrapper {
  @include wrapper(block);
}
</style>
