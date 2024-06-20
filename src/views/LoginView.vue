<template>
  <Spinner fullscreen v-if="loading"/>
  <section class="login">
    <div class="login__wrapper">
      <div class="login__card">
        <h1 class="login__title">Авторизоваться</h1>
        <AuthForm @submit-form="tryLogin" class="login__form"/>
        <ul class="login__link-list link-list">
          <li class="link-list__item">
            <RouterLink class="link-list__link" to="/signup"> Нет аккаунта?</RouterLink>
          </li>
        </ul>
        <div id="VkIdSdkOneTap"></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import * as VKID from '@vkid/sdk'
import AuthForm from '@/components/auth/AuthForm.vue'
import Spinner from '@/components/Spinner.vue'
import {onMounted, ref} from 'vue'
import router from '@/router'
import {type INewUser, useAuthStore} from '@/stores/auth'
import {APP_ID, REDIRECT_URL} from '@/utils/const'

VKID.Config.set({
  app: APP_ID, // Идентификатор приложения.
  redirectUrl: REDIRECT_URL, // Адрес для перехода после авторизации.
  state: 'mospolytech' // Произвольная строка состояния приложения.
})

const oneTap = new VKID.OneTap()

onMounted(() => {
// Получение контейнера из разметки.
  const container = document.getElementById('VkIdSdkOneTap')
// Проверка наличия кнопки в разметке.
  if (container) {
    // Отрисовка кнопки в контейнере с именем приложения APP_NAME, светлой темой и на русском языке.
    oneTap.render({container: container, scheme: VKID.Scheme.LIGHT, lang: VKID.Languages.RUS})
  }
})

const loading = ref(false)
const store = useAuthStore()

async function tryLogin(userData: INewUser) {
  loading.value = true
  try {
    await store.login(userData.username, userData.password)
  } catch {
    loading.value = false
  }
  if (store.isAuthenticated) await router.push('/')
}
</script>

<style scoped lang="scss">
@use '@/assets/scss/mixin' as *;

@use '@/assets/scss/variables' as *;

.login {
  height: 100vh;
  background-color: $primary-body-bg;
  display: flex;
  align-items: center;
}

.login__wrapper {
  @include wrapper;
}

.login__card {
  background-color: $white;
  border-radius: 2rem;
  padding: 2rem;
  margin: 0 auto;
}

.login__title {
  @include title();
}

.link-list {
  margin-top: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.link-list__link {
  @include desc();
  margin-top: 1rem;
  color: $c-accent;
  text-decoration: none;

  &:hover {
    color: $c-brand;
  }
}
</style>
