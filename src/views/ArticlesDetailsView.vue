<template>
  <TheHeader/>
  <section class="articles">
    <div class="articles__wrapper">
      <ArticleDetailItem v-if="article" :article="article" :comments="comments" @submitForm="postComment"
                         :currentPage="currentPage"
                         @pageChanged="fetchComments"/>
    </div>
  </section>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {useAuthStore} from '@/stores/auth'
import axios from 'axios'
import TheHeader from '@/components/TheHeader.vue'
import type {IArticle, IResponse} from '@/views/ArticlesView.vue'
import {useRoute} from 'vue-router'
import ArticleDetailItem from '@/components/article/ArticleDetailItem.vue'

export interface IComment {
  'id': number,
  'article': number,
  'author': string,
  'comment_text': string
}

interface ICommentsResponse extends IResponse {
  results: IComment[]
}

const authStore = useAuthStore()
const article = ref<IArticle>()
const comments = ref<IComment[]>([])
const route = useRoute()
const fetchArticle = async () => {
  try {
    const {data}: {
      data: IArticle
    } = await axios.get(`http://localhost:8000/api/v1/articles/articles/${route.params.id}/`, {
      headers: {
        Authorization: `Bearer ${authStore.currentUser.accessToken}`
      }
    })
    article.value = data
    console.log(data)
  } catch (e) {
    console.log(e)
  }
}
fetchArticle()
const fetchComments = async (page: number) => {
  currentPage.value = page
  try {
    const {data}: {
      data: ICommentsResponse
    } = await axios.get(`http://localhost:8000/api/v1/articles/comments/?article=${route.params.id}&offset=${(page) * 3}`, {
      headers: {
        Authorization: `Bearer ${authStore.currentUser.accessToken}`
      }
    })
    comments.value = data.results
    console.log(data)
  } catch (e) {
    console.log(e)
  }
}
const currentPage = ref(0)
fetchComments(currentPage.value)

const postComment = async (comment: { text: string }) => {
  try {
    const res = await axios.post('http://localhost:8000/api/v1/articles/comments/', {
      comment_text: comment.text,
      article: article.value?.id,
    }, {
      headers: {
        Authorization: `Bearer ${authStore.currentUser.accessToken}`
      }
    })
    if (res.status === 201) {
      comments.value.push(res.data)
    }
  } catch (e) {
    console.log(e)
  }
}
</script>

<style lang="scss">
@use '@/assets/scss/mixin' as *;
@use '@/assets/scss/variables' as *;

.articles__wrapper {
  @include wrapper(block);
}
</style>
