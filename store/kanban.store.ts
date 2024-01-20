import { EnumStatus } from '@/types/deals.types'
import type { IColumn } from '@/components/kanban/kanban.types'

export const useKanbanStore = defineStore('kanban-store', {
  state: (): { list: IColumn[] } => {
    return {
      list: [
        {
          id: EnumStatus['to-do'],
          name: 'to do',
          items: []
        },
        {
          id: EnumStatus['to-be-agreed'],
          name: 'to be agreed',
          items: []
        },
        {
          id: EnumStatus['in-progress'],
          name: 'in progress',
          items: []
        },
        {
          id: EnumStatus['produced'],
          name: 'produced',
          items: []
        },
        {
          id: EnumStatus['done'],
          name: 'done',
          items: []
        }
      ]
    }
  }
})
