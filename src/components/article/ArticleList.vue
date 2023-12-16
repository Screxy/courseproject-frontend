<template>
  <ul class="articles-list">
    <ArticleItem v-for="article in articles" :article="article" :key="article.id"/>
  </ul>
</template>

<script setup lang="ts">
import ArticleItem from '@/components/article/ArticleItem.vue'
import type {IArticle} from '@/views/ArticlesView.vue'

const props = defineProps<{
  articles: IArticle[]
}>()
</script>

<style scoped lang="scss">

</style>
