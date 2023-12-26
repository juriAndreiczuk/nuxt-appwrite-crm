<script setup lang="ts">
import { MENU_DATA } from './menu.data'

</script>

<template>
  <div>
    <NuxtLink 
      class="flex items-center py-1 px-3 rounded w-full hover:bg-slate-500 transition-all mb-2"
      v-for="item of MENU_DATA"
      :key="item.url"
      :to="item.url"
    >
      <Icon :name="item.icon" class="mr-3" />
      <span>{{ item.name }}</span>
    </NuxtLink>
  </div>
</template>