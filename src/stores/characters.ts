// Pinia data store
import { defineStore } from 'pinia'

// Ours
import { makeCrudActions } from 'stores/firestore'
import { Character } from 'src/models'

export const useCharactersStore = defineStore('characters', () => {
  return {
    ...makeCrudActions<Character>('characters', {
      map: (id, data) => ({
        notes: data.notes,
        name: data.name,
        id: id,
      })
    })
  }
})
