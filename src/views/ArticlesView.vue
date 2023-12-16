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
import ArticlesList from '@/components/article/ArticleList.vue'

export interface IArticle {
  id: number,
  article_title: string,
  article_text: string,
  pub_date: string
}

export interface IResponse {
  count: number
  next: string | null
  previous: string | null
}

export interface IArticleResponse extends IResponse {
  results: IArticle[]
}


const authStore = useAuthStore()
const articles = ref<IArticle[]>([])
const fetchData = async () => {
  try {
    const {data}: { data: IArticleResponse } = await axios.get('http://localhost:8000/api/v1/articles/my-articles/', {
      headers: {
        Authorization: `Bearer ${authStore.currentUser.accessToken}`
      }
    })
    articles.value.push(...data.results)
    console.log(data)
  } catch (e) {
    console.log(e)
  }
}
fetchData()
</script>

<style lang="scss">
@use '@/assets/scss/mixin' as *;
@use '@/assets/scss/variables' as *;

.articles__wrapper {
  @include wrapper(block);
}

.list__item {
  max-height: 30rem;
}


.articles__button {
  margin-top: 1.5rem;
}
</style>
