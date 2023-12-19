<template>
  <Spinner v-if="loading"/>
  <section class="signup">
    <div class="signup__wrapper">
      <div class="signup__card">
        <h1 class="signup__title">Зарегистрироваться</h1>
        <SignUpForm class="signup__form" @submit-form="trySignUp"/>
        <RouterLink class="signup__link" to="/login">Есть аккаунт?</RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Spinner from '@/components/Spinner.vue'
import SignUpForm from '@/components/auth/SignUpForm.vue'
import {ref} from 'vue'
import {useAuthStore, type INewUser} from '@/stores/auth'
import router from '@/router'

const store = useAuthStore()
const loading = ref(false)

async function trySignUp(newUserData: INewUser) {
  loading.value = true
  try {
    await store.signUp(newUserData)
  } catch {
    loading.value = false
  }
  if (store.isAuthenticated) await router.push('/')
}
</script>

<style scoped lang="scss">
@use '@/assets/scss/mixin' as *;

@use '@/assets/scss/variables' as *;

.signup {
  height: 100vh;
  background-color: grey;
  display: flex;
  align-items: center;
}

.signup__wrapper {
  @include wrapper;
}

.signup__card {
  display: flex;
  flex-direction: column;
  border-radius: 2rem;
  background-color: $white;
  padding: 2rem;
  margin: 0 auto;
}

.signup__title {
  @include title();
}

.signup__link {
  @include desc();
  margin: 1rem auto 0;
  color: $c-accent;
  text-decoration: none;

  &:hover {
    color: $c-brand;
  }
}
</style>
