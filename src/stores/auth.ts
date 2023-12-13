import {reactive, ref, watch} from 'vue'
import {defineStore} from 'pinia'
import axios from 'axios'

interface IUser {
    // login: string | null,
    accessToken: string | null,
    refreshToken: string | null
}

export interface INewUser {
    email?: string,
    username: string,
    password: string
}

export const useAuthStore = defineStore('auth', () => {
    const isAuthenticated = ref(false)
    const currentUser = reactive<IUser>({
        accessToken: null,
        refreshToken: null
    })
    watch(currentUser, (newCurrentUser) => {
        const stringNewUser = JSON.stringify(newCurrentUser)
        console.log(stringNewUser)
        localStorage.setItem('user', stringNewUser)
    })

    async function authCheck() {
        const userFromLocalStorage = localStorage.getItem('user')
        if (userFromLocalStorage) {
            const userFromLocalStorageParsed = JSON.parse(userFromLocalStorage)
            const response = await axios.post('http://localhost:8000/api/token/verify/', {
                'token': userFromLocalStorageParsed.accessToken
            })
            if (!(response.status === 401)) {
                isAuthenticated.value = true
                return true
            }
        }
        return false
    }

    async function login(username: string, password: string) {
        const response = await axios.post('http://localhost:8000/api/token/', {
            'username': username,
            'password': password
        })
        if (response.status === 200) {
            currentUser.accessToken = response.data.access
            currentUser.refreshToken = response.data.refresh
            isAuthenticated.value = true
            console.log(isAuthenticated.value)
        }
        return isAuthenticated.value
    }

    async function signUp(newUserData: INewUser) {
        const response = await axios.post('http://localhost:8000/auth/register/', {
            username: newUserData.username,
            email: newUserData.email,
            password: newUserData.password,
        })
        if (response.data.access_token) {
            currentUser.accessToken = response.access_token
            isAuthenticated.value = true
        }
        return isAuthenticated.value
    }

    function logout() {
        currentUser.accessToken = null
        currentUser.refreshToken = null
        isAuthenticated.value = false
        return true
    }

    return {
        currentUser, isAuthenticated, logout, signUp, login
        , authCheck
    }
})
