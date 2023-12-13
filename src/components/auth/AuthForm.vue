<template>
  <form class="form" @submit.prevent="onSubmitForm">
    <VInput
        v-model.trim="formData.username"
        class="form__input"
        placeholder="username"
        label="Введите username"
        autocomplete="username"
    />
    <span
        class="form__error"
        v-for="error in v$.username.$errors"
        :key="error.$uid"
    >{{ error.$message }}.
    </span>
    <VInput
        v-model="formData.password"
        type="password"
        class="form__input"
        placeholder="Пароль"
        label="Введите пароль"
        autocomplete="current-password"
    />
    <span
        class="form__error"
        v-for="error in v$.password.$errors"
        :key="error.$uid"
    >{{ error.$message }}.
    </span>
    <VButton class="form__button">Войти</VButton>
  </form>
</template>

<script setup lang="ts">
import {reactive, computed} from 'vue'
import useVuelidate from '@vuelidate/core'
import {helpers, required, minLength} from '@vuelidate/validators'
import type {INewUser} from '@/stores/auth'
import VInput from '@/components/UI/VInput.vue'
import VButton from '@/components/UI/VButton.vue'

const emit = defineEmits(['submitForm'])
const formData = reactive<INewUser>({
  username: '',
  password: '',
})
const rules = computed(() => {
  return {
    username: {
      required: helpers.withMessage(
          'Поле обязательное для заполнения',
          required
      ),
    },
    password: {
      required: helpers.withMessage(
          'Поле обязательное для заполнения',
          required
      ),
      minLength: helpers.withMessage(
          `Минимальная длина пароля ${minLength(6).$params.min}`,
          minLength(6)
      ),
    },
  }
})
const v$ = useVuelidate(rules, formData)

async function onSubmitForm() {
  const isFormCorrect = await v$.value.$validate()
  if (isFormCorrect) {
    emit('submitForm', formData)
    formData.password = ''
    v$.value.$reset()
  }
}
</script>

<style scoped lang="scss">
@use '@/assets/scss/mixin' as *;
@use '@/assets/scss/variables' as *;

.form {
  display: flex;
  flex-direction: column;
}

.form__input {
  margin-top: 1rem;
}

.form__error {
  color: red;
}

.form__button {
  margin-top: 1.5rem;
}
</style>
