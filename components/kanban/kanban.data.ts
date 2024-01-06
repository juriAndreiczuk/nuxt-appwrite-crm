import { EnumStatus } from '@/types/deals.types'
import type { IColumn } from './kanban.types'

export const KANBAN_DATA:IColumn[] = [
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
  },
]
