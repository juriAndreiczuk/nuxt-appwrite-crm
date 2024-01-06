import { useQuery } from '@tanstack/vue-query'
import { KANBAN_DATA } from './kanban.data'
import type { IDeal } from '@/types/deals.types'


export const useKanbanQuery = () => {
  
  return useQuery({
    queryKey: ['deals'],
    queryFn: () => DB.listDocuments(DB_ID, COLLECTION_DEALS),
    select(data) {
      const newBoard = [...KANBAN_DATA]
      const deals = data.documents as unknown as IDeal[]

      deals.forEach(deal => {
        const column = newBoard.find(col =>  col.id === deal.Status )
        if (column) {
            column.items.push({
              $createAt: deal.$createdAt,
              id: deal.$id,
              name: deal.name,
              price: deal.price,
              companyName: deal.customers.Name,
              status: deal.Status
            })
          }
        })
        return newBoard
      }
  })
}
