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
        if (currentUser.accessToken || currentUser.refreshToken) {
            const stringNewUser = JSON.stringify(newCurrentUser)
            console.log(stringNewUser)
            localStorage.setItem('user', stringNewUser)
        } else {
            localStorage.clear()
        }
    })

    async function authCheck() {
        const userFromLocalStorage = localStorage.getItem('user')
        if (userFromLocalStorage) {
            const userFromLocalStorageParsed = JSON.parse(userFromLocalStorage)
            const {status} = await axios.post('http://localhost:8000/api/token/verify/', {
                'token': userFromLocalStorageParsed.accessToken
            })
            if (!(status === 401)) {
                isAuthenticated.value = true
                return true
            }
        }
        return false
    }

    async function login(username: string, password: string) {
        const {status, data} = await axios.post('http://localhost:8000/api/token/', {
            'username': username,
            'password': password
        })
        if (status === 200) {
            currentUser.accessToken = data.access
            currentUser.refreshToken = data.refresh
            isAuthenticated.value = true
            console.log(isAuthenticated.value)
        }
        return isAuthenticated.value
    }

    async function signUp(newUserData: INewUser) {
        const {data} = await axios.post('http://localhost:8000/auth/register/', {
            username: newUserData.username,
            email: newUserData.email,
            password: newUserData.password,
        })
        if (data.access_token) {
            currentUser.accessToken = data.access_token
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
