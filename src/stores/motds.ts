// Pinia data store
import { defineStore } from 'pinia'

// Ours
import { makeCrudActions, processCollection } from 'stores/firestore'

export interface Motd {
  content: string
  userId: string
  id: string
}

export const useMotdsStore = defineStore('motds', {
  state: () => ({
    motds: [] as Array<Motd>
  }),

  actions: {
    ...makeCrudActions('motds'),
    fetch() {
      return processCollection('motds', {
        userScoped: true,
        setup: () => this.motds = [],
        forEach: (id, data) => this.motds.push({
          content: data.content,
          userId: data.userId,
          id: id,
        }),
      }).then(() => this.motds)
    }
  }
})
