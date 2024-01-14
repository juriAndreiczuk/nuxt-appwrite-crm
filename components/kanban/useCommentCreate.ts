import { useMutation } from '@tanstack/vue-query'
import { v4 as uuid } from 'uuid'
import { useDealStore } from '~/store/deal.store'

export const useCommentCreate = ({ refetch }: { refetch: () => void }) => {
  const store = useDealStore()
  const comment = ref<string>()

  const { mutate } = useMutation({
    mutationKey: ['add comments', comment.value],
    mutationFn: () => {
      return DB.createDocument(DB_ID, COLLECTION_COMMENTS, uuid(), {
        Text: comment.value,
        deals: store.card?.id
      })
    },
    onSuccess: () => {
      refetch()
      comment.value = ''
    }
  })

  const wtiteComment = ()  => {
    if(!comment.value) return
    mutate()
  }

  return {
    wtiteComment,
    comment
  }
}
