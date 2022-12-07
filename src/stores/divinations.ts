// Pinia data store
import { defineStore } from 'pinia'

// Ours
import { makeCrudActions } from 'stores/firestore'
import { Divination } from 'src/models'

export const useDivinationsStore = defineStore('divinations', () => {
  return {
    ...makeCrudActions<Divination>('divinations', {
      map: (id, data) => ({
        content: data.content,
        name: data.name,
        userId: data.userId || '',
        id: id,
      })
    })
  }
})
