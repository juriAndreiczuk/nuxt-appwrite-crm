<script setup lang="ts">
import { cn } from '@/utils'

const props = defineProps({
  class: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div :class="cn('flex justify-center items-center p-6 pt-0', props.class)">
    <slot />
  </div>
</template>
