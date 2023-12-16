<template>
  <div class="article">
    <h3 class="article__title">{{ article.article_title }}</h3>
    <p class="article__text">{{ article.article_text }}</p>
    <h4 class="article__subtitle">Комментарии</h4>
    <CommentForm @submit-form="postComment"/>
    <Pagination v-if="comments?.length"
                :totalPages="comments.length"
                :perPage="10"
                :currentPage="currentPage"
                @pageChanged="onPageChange"/>
    <ul v-if="comments?.length" class="article__comments">
      <li v-for="comment in comments" class="comment">
        <p class="comment__author">{{ comment.author }}</p>
        <p class="comment__text">{{ comment.comment_text }}</p>
      </li>
    </ul>
    <p v-else>Тут пусто(</p>
  </div>
</template>

<script setup lang="ts">
import type {IArticle} from '@/views/ArticlesView.vue'
import type {IComment} from '@/views/ArticlesDetailsView.vue'
import CommentForm from '@/components/article/CommentForm.vue'
import Pagination from '@/components/Pagination.vue'

const props = defineProps<{ article: IArticle, comments?: IComment[], currentPage: number }>()
const emit = defineEmits(['submitForm', 'pageChanged'])
const postComment = (formData: { text: string }) => emit('submitForm', formData)

const onPageChange = (page: number) => emit('pageChanged', page)
</script>

<style scoped lang="scss">
@use '@/assets/scss/mixin' as *;
@use '@/assets/scss/variables' as *;

.article__title {
  @include title;
}

.article__text {
  @include desc;
}

.article__subtitle {
  @include subTitle;
  margin-top: 2rem;
}

.comment {
  margin-top: 1rem;
  padding: 2rem;
  border-radius: 2rem;
  background: #d5d5d5;
}

.comment__author {
  @include subTitle;
}

.comment__text {
  @include desc;
  word-break: break-all;
}
</style>
