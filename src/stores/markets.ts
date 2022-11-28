// Pinia data store
import { defineStore } from 'pinia'

// Ours
import { makeCrudActions, processCollection } from 'stores/firestore'
import { Market } from 'src/models'

export const useMarketsStore = defineStore('markets', {
  state: () => ({
    markets: [] as Array<Market>
  }),

  actions: {
    ...makeCrudActions('markets'),
    fetch() {
      return processCollection('markets', {
        userScoped: true,
        multipleUsers: true,
        setup: () => this.markets = [],
        forEach: (id, data) => this.markets.push({
          name: data.name,
          userIds: data.userIds,
          currencyIds: data.currencyIds,
          id: id,
        }),
      }).then(() => this.markets)
    }
  }
})
