import type { ICard } from '~/components/kanban/kanban.types'

const defaultValue: { card: ICard | null; isOpen: boolean } = {
  card: null,
  isOpen: false
}

export const useDealStore = defineStore('deal-store', {
  state: () => defaultValue,
  actions: {
    clear() {
      this.$patch({card: null, isOpen: false})
    },
    set(card: ICard) {
      this.$patch({ card, isOpen: true })
    }
  }
})
