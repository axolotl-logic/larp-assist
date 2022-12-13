// Pinia data store
import { defineStore } from 'pinia'

// Ours
import { useFirestoreCollection } from 'stores/firestore'
import { Market } from 'src/models'

export const useMarketsStore = defineStore('markets', () => {
  return {
    ...useFirestoreCollection<Market>('markets', {
      map: (id, data) => ({
        name: data.name,
        characterIds: data.characterIds || [],
        currencyId: data.currencyId,
        id: id,
      })
    })
  }
})
