<template>
  <li class="list__item">
    <RouterLink :to=url>
      <h3 class="articles__title">{{ article.article_title }}</h3>
    </RouterLink>
    <p class="articles__text">{{ article.article_text }}</p>
  </li>
</template>

<script setup lang="ts">
import type {IArticle} from '@/views/ArticlesView.vue'
import {computed} from 'vue'

const props = defineProps<{ article: IArticle }>()
const url = computed(() => `/articles/${props.article.id}`)
</script>

<style scoped lang="scss">
@use '@/assets/scss/mixin' as *;

.articles__title {
  @include title();
  margin-top: 2rem;
}

.articles__text {
  @include subTitle();
  margin-top: 1.5rem;
  text-overflow: ellipsis;
}
</style>
