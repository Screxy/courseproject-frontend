<template>
  <TheHeader/>
  <section class="articles">
    <div class="articles__wrapper">
      <ArticlesList :articles="articles" class="articles__list"/>
    </div>
  </section>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {useAuthStore} from '@/stores/auth'
import axios from 'axios'
import TheHeader from '@/components/TheHeader.vue'
import type {IArticle, IArticleResponse} from '@/views/ArticlesView.vue'
import ArticlesList from '@/components/article/ArticleList.vue'


const authStore = useAuthStore()
const articles = ref<IArticle[]>([])
const dialogVisible = ref(false)
const fetchData = async () => {
  const {data}: { data: IArticleResponse } = await axios.get('http://localhost:8000/api/v1/articles/articles/')
  console.log(data)
  articles.value.push(...data.results)
}
fetchData()

function showDialog() {
  dialogVisible.value = true
}

</script>

<style lang="scss">
@use '@/assets/scss/mixin' as *;
@use '@/assets/scss/variables' as *;

.articles__wrapper {
  @include wrapper(block);
}

.articles__title {
  @include title();
  margin-top: 2rem;
}

.articles__text {
  margin-top: 1.5rem;
  @include subTitle();
}

.articles__button {
  margin-top: 1.5rem;
}

.articles__filter {
  margin-top: 1.5rem;

  .articles__filter-button_checked {
    background-color: #008167;
    border-color: #008167;
  }
}

.articles__filter-button + .articles__filter-button {
  margin-left: 1.5rem;
}

.articles__search {
  margin-top: 1.5rem;
}
</style>
