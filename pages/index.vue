<script setup lang="ts">
  import type { ICard, IColumn } from '@/components/kanban/kanban.types';

  useHead({
    title: 'Home'
  })

  const dragCard = ref<ICard | null>(null)
  const sourceColumn = ref<IColumn | null>(null)
</script>

<template>
  <div class="p-10">
    <h1 class="font-bold text-2xl mb-10">CRM System</h1>
    <div>
      <Card class="mb-3" draggable="true">
        <CardHeader role="button">header</CardHeader>
        <CardContent>content</CardContent>
        <CardFooter>footer</CardFooter>
      </Card>
    </div>
  </div>
</template>
