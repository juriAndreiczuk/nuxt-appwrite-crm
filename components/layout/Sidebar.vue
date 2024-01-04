<script lang="ts" setup>
  import { useAuthStore, useIsLoadingStore } from '@/store/auth.store'

  const authStore = useAuthStore()
  const isLoadingStore = useIsLoadingStore()
  const router = useRouter()

  const logout = async () => {
    isLoadingStore.set(true)
    await account.deleteSession('current')
    authStore.clear()
    await router.push('/login')
    isLoadingStore.set(false)
  }
</script>

<template>
  <aside class="px-5 py-8 bg-emerald-800 h-full w-full relative">
    <LayoutMenu />
    <button @click="logout" class="absolute top-2 right-3 transition-colors  hover:text-purple-200">
      <Icon name="line-md:logout" size="22" />
    </button>
  </aside>
</template>