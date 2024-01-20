import { useQuery } from '@tanstack/vue-query'
import { useKanbanStore } from '@/store/kanban.store'
import type { IDeal } from '@/types/deals.types'
import type { IColumn } from '@/types/kanban.types'


export const useKanbanQuery = () => {
  const kanbanData = useKanbanStore()
  return useQuery({
    queryKey: ['deals'],
    queryFn: () => DB.listDocuments(DB_ID, COLLECTION_DEALS),
    select(data) {
      const newBoard:IColumn[] = kanbanData.list.map(col => ({
        ...col,
        items: []
      }))
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
