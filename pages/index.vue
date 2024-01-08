<script setup lang="ts">
  import type { ICard, IColumn } from '@/components/kanban/kanban.types'
  import { useKanbanQuery } from '@/components/kanban/useKanbanQuery'
  import { useMutation } from '@tanstack/vue-query'
  import dayjs from 'dayjs'
  import { EnumStatus } from '@/types/deals.types'

  useHead({
    title: 'Home'
  })

  const dragCard = ref<ICard | null>(null)
  const sourceColumn = ref<IColumn | null>(null)
  const {data, isLoading, refetch} = useKanbanQuery()

  type TypeMutationVariables = {
    docId: string
    Status?: EnumStatus
  }

  const { mutate } = useMutation({
    mutationKey: ['move card'],
    mutationFn: ({docId, Status}: TypeMutationVariables) =>
      DB.updateDocument(DB_ID, COLLECTION_DEALS, docId, {
        Status
      }),
    onSuccess: () => {
      refetch()
    }
  })

  const handleDragStart = (card: ICard, column: IColumn) => {
    dragCard.value = card
    sourceColumn.value = column
  }

  const handleDrop = (targetColumn: IColumn) => {
    if (dragCard.value && sourceColumn.value) {
      mutate({ docId: dragCard.value.id, Status: targetColumn.id })
    }
  }
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
          @dragover.prevent
          @drop="handleDrop(col)"
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
              @dragstart="handleDragStart(item, col)"
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
