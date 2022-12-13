// Pinia data store
import { defineStore } from 'pinia'

// Vue
import { ref } from 'vue'

// Ours
import { useFirestoreCollection } from 'stores/firestore'
import { Currency } from 'src/models'

export const useCurrenciesStore = defineStore('currencies', () => {
  const currencyNames = ref(new Map<string, string>())
  return {
    currencyNames,
    ...useFirestoreCollection<Currency>('currencies', {
      refresh: () => {
        currencyNames.value = new Map()
      },
      map: (id, data) => {
        currencyNames.value.set(id, data.name as string)
        return {
          name: data.name,
          characterIds: data.characterIds || [],
          id: id,
        }
      },
    }),
  }
})
