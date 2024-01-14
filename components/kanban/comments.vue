<script setup lang="ts">
  import type { IDeal } from '@/types/deals.types'
  import { useCommentCreate } from './useCommentCreate'
  import { useCardInfo } from './useCardInfo'
  import { useDealStore } from '@/store/deal.store'
  const { data, refetch, isLoading} = useCardInfo()
  const { comment, wtiteComment } = useCommentCreate({ refetch })
  
  const dealStore = useDealStore()
  const card = data as unknown as IDeal
  
</script>


<template>
  <div class="w-full z-1 p-5 bottom-0 left-0 fixed h-[250px] overflow-hidden bg-emerald-900">
    <Button @click="dealStore.clear()">Close</Button>
     <div>
      <Input
        placeholder="leave a comment"
        v-model="comment" 
        @keyup.enter="wtiteComment"
      />
      <div v-if="card">
        <p
          v-for="cardComments of card.comments"
          :key="cardComments.$id"
        >
        {{ cardComments.Text }}
        </p>
      </div>
     </div>
  </div>
</template> 