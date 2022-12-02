// Pinia data store
import { defineStore } from 'pinia'

// Ours
import { makeCrudActions } from 'stores/firestore'
import { Currency } from 'src/models'

export const useCurrenciesStore = defineStore('currencies', () => {
  const currencyNames = new Map<string, string>()
  return {
    currencyNames,
    ...makeCrudActions<Currency>('currencies', {
      map: (id, data) => {
        currencyNames.set(id, data.name as string)
        return {
          name: data.name,
          userIds: data.userIds,
          id: id,
        }
      },
    }),
  }
})
