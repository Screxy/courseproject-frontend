<template>

</template>

<script setup lang="ts">
import {useRoute, useRouter} from 'vue-router'
import {useAuthStore} from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const store = useAuthStore()
store.currentUser.accessToken = String(route.query.access_token)
store.currentUser.refreshToken = String(route.query.refresh_token)
console.log(String(route.query.access_token), String(route.query.refresh_token))
localStorage.setItem('user', JSON.stringify(store.currentUser))
router.push('/')
</script>

<style scoped lang="scss">

</style>
