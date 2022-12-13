// Pinia data store
import { defineStore } from 'pinia'

// Ours
import { useFirestoreCollection } from 'stores/firestore'
import { Divination } from 'src/models'

export const useDivinationsStore = defineStore('divinations', () => {
  return {
    ...useFirestoreCollection<Divination>('divinations', {
      map: (id, data) => ({
        content: data.content,
        name: data.name,
        characterId: data.characterId || '',
        id: id,
      })
    })
  }
})
