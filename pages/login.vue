<script setup lang="ts">
  import { useAutentification } from '~/components/login/useAuthentication'
  const { email, password, name, login, register } = useAutentification()
  useHead({
    title: 'Login'
  })
</script>

<template>
  <div class="flex items-center justify-center min-h-screen w-full">
    <div class="p-5 rounded bg-violet-800">
      <h1 class="font-bold text-2xl mb-3">Login</h1>
      <form>
        <Input
          placeholder="E-mail"
          type="email" class="mb-3" 
          v-model="email"
        />
        <Input
          placeholder="Password"
          type="password" class="mb-3" 
          v-model="password"
        />
        <Input
          placeholder="Name"
          type="name" class="mb-3" 
          v-model="name"
        />
        <div class="flex items-center justify-center gap-5">
          <Button @click="login">Login</Button>
          <Button @click="register">Register</Button>
        </div>
      </form>
    </div>
  </div>
</template>
