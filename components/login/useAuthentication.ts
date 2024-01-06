import {v4 as uuid} from 'uuid'

export const useAutentification = () => {
  const email = ref('')
  const password = ref('')
  const name = ref('')

  const isLoadingStore = useIsLoadingStore()
  const authStore = useAuthStore()
  const router = useRouter()

  const login = async () => {
    isLoadingStore.set(true)
    await account.createEmailSession(email.value, password.value)
    const response = await account.get()
    if (response) {
      authStore.set({
        email: response.email,
        name: response.name,
        status: response.status
      })
    }
    email.value = ''
    password.value = ''
    name.value = ''
    await router.push('/')
    isLoadingStore.set(false)
  }

  const register = async () => {
    await account.create(uuid(), email.value, password.value, name.value)
    await login()
  }

  return { email, password, name, login, register }
}