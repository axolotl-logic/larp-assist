// Pinia data store
import { defineStore } from 'pinia'

// Ours
import { makeCrudActions, processCollection } from 'stores/firestore'
import { Market } from 'src/models'

export const useMarketsStore = defineStore('markets', {
  state: () => ({
    markets: [] as Array<Market>,
    marketsByCurrencyId: new Map<string, Array<Market>>
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
          currencyId: data.currencyId,
          id: id,
        }),
      }).then(() => {
        this.markets.forEach(market => {
          const markets = this.marketsByCurrencyId.get(market.currencyId) || []
          markets.push(market)
          this.marketsByCurrencyId.set(market.currencyId, markets)
        })
 
        return this.markets
      })
    }
  }
})
