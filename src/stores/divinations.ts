// Pinia data store
import { defineStore } from 'pinia'

// Ours
import { makeCrudActions, processCollection } from 'stores/firestore'
import { Divination } from 'src/models'

export const useDivinationsStore = defineStore('divinations', {
  state: () => ({
    divinations: [] as Array<Divination>
  }),

  actions: {
    ...makeCrudActions('divinations'),
    fetch() {
      return processCollection('divinations', {
        userScoped: true,
        multipleUsers: false,
        setup: () => this.divinations = [],
        forEach: (id, data) => this.divinations.push({
          content: data.content,
          name: data.name,
          userId: data.userId,
          id: id,
        })
      }).then(() => this.divinations)
    }
  }
})
