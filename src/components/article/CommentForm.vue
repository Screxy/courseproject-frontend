<template>
  <form class="form" @submit.prevent="onSubmitForm">
    <VInput
        v-model.trim="formData.text"
        class="form__input"
        placeholder="текст комментария"
        label="Введите текст комментария"
        autocomplete="text"
    />
    <span
        class="form__error"
        v-for="error in v$.text.$errors"
        :key="error.$uid"
    >{{ error.$message }}.
    </span>
    <VButton class="form__button">Отправить</VButton>
  </form>
</template>

<script setup lang="ts">
import {reactive, computed} from 'vue'
import useVuelidate from '@vuelidate/core'
import {helpers, required, minLength} from '@vuelidate/validators'
import VInput from '@/components/UI/VInput.vue'
import VButton from '@/components/UI/VButton.vue'

const emit = defineEmits(['submitForm'])
const formData = reactive<{ text: string }>({
  text: '',
})
const rules = computed(() => {
  return {
    text: {
      required: helpers.withMessage(
          'Поле обязательное для заполнения',
          required
      ),
      minLength: helpers.withMessage(
          `Минимальная длина комментария ${minLength(6).$params.min} символов`,
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
    formData.text = ''
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
