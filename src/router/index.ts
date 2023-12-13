import {useAuthStore} from '@/stores/auth'
import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import {RouteNamesEnum} from '@/router/router.types'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: RouteNamesEnum.home,
            component: HomeView,
            meta: {
                auth: true,
            },
        },
        {
            path: '/login',
            name: RouteNamesEnum.login,
            component: () => import('../views/LoginView.vue'),
        },
        {
            path: '/signup',
            name: RouteNamesEnum.signup,
            component: () => import('../views/SignUpView.vue'),
        },
    ],
})
router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore()
    if (to.meta.auth && !authStore.isAuthenticated) {
        if (await authStore.authCheck()) {
            next()
        } else {
            next('/login')
        }
    } else {
        next()
    }
})
export default router
