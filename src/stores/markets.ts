// Pinia data store
import { defineStore } from 'pinia'

// Ours
import { makeCrudActions } from 'stores/firestore'
import { Market } from 'src/models'

export const useMarketsStore = defineStore('markets', () => {
  return {
    ...makeCrudActions<Market>('markets', {
      map: (id, data) => ({
        name: data.name,
        userIds: data.userIds,
        currencyId: data.currencyId,
        id: id,
      })
    })
  }
})
