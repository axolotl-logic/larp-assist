// Pinia data store
import { defineStore } from 'pinia'

// Ours
import { makeCrudActions, processCollection } from 'stores/firestore'
import { Currency } from 'src/models'

export const useCurrenciesStore = defineStore('currencies', {
  state: () => ({
    currencies: [] as Array<Currency>
  }),

  actions: {
    ...makeCrudActions('currencies'),
    fetch() {
      return processCollection('currencies', {
        userScoped: true,
        multipleUsers: true,
        setup: () => this.currencies = [],
        forEach: (id, data) => this.currencies.push({
          name: data.name,
          userIds: data.userIds,
          id: id,
        }),
      }).then(() => this.currencies)
    }
  }
})
