import { useQuery } from '@tanstack/vue-query'
import { COLLECTION_DEALS, DB_ID } from '@/utils/app.constants'
import { useDealStore } from '~/store/deal.store'

export const useCardInfo = () => {
  const store = useDealStore()
  const cardId = store.card?.id || ''

  return useQuery({
    queryKey: ['deal', cardId],
    queryFn: () => DB.getDocument(DB_ID, COLLECTION_DEALS, cardId)
  })
}
