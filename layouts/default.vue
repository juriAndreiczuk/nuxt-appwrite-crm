<script lang="ts" setup>
  import { account } from '@/utils/appwrite'
  import { useAuthStore, useIsLoadingStore } from '@/store/auth.store'

  const isLiadingStore = useIsLoadingStore()
  const authStore = useAuthStore()
  const router = useRouter()

onMounted(async () => {
  try {
    const user = await account.get()
    if (user) {
      authStore.set(user)
    }
  } catch(e) {
    router.push('/login')
  } finally {
    isLiadingStore.set(false)
  }
})

</script>

<template>
  <div class="text-center p-5 text-4xl font-bold" v-if="isLiadingStore.isLoading">Loading...</div>
  <section v-else :class="{grid : authStore.isAuth}">
    <LayoutSidebar v-if="authStore.isAuth" />
    <div>
      <slot />
    </div>
  </section>
</template>

<style scoped>
  .grid {
    display: grid;
    grid-template-columns: 1fr 6fr;
    min-height: 100vh;
  }
</style>