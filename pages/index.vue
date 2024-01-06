<script setup lang="ts">
  import type { ICard, IColumn } from '@/components/kanban/kanban.types'
  import { useKanbanQuery } from '@/components/kanban/useKanbanQuery'
  import dayjs from 'dayjs'

  useHead({
    title: 'Home'
  })

  const dragCard = ref<ICard | null>(null)
  const sourceColumn = ref<IColumn | null>(null)

  const {data, isLoading, refetch} = useKanbanQuery()
</script>

<template>
  <div class="p-10">
    <h1 class="font-bold text-2xl mb-10">CRM System</h1>
    <h2 class="text-center p-5 text-4xl font-bold" v-if="isLoading">Loading...</h2>
    <div v-else>
      <div class="grid grid-cols-5 gap-5">
        <div 
          v-for="col of data"
          :key="col.id"
        >
          <div class="py-2 px-5 mb-2 text-center">
            <p class="mb-3 font-light text-lg">{{ col.name }}</p>
            <KanbanCreateDeal
              :refetch="refetch"
              :status="col.id"
            />
            <Card
              v-for="item of col.items"
              :key="item.id"
              class="mb-3" draggable="true"
            >
              <CardHeader role="button">
                <CardTitle>{{ item.name }}</CardTitle>
                <CardDescription>{{ convertCurrency(500) }}</CardDescription>
              </CardHeader>
              <CardContent>{{ item.companyName  }}</CardContent>
              <CardFooter>{{  dayjs(item.$createAt).format('DD.MM.YYYY')  }}</CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
