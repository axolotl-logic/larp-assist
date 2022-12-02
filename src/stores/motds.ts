// Pinia data store
import { defineStore } from 'pinia'

// Ours
import { makeCrudActions } from 'stores/firestore'
import { Motd } from 'src/models'

export const useMotdsStore = defineStore('motds', () => {
  return {
    ...makeCrudActions<Motd>('motds', {
      map: (id, data) => ({
        content: data.content,
        userId: data.userId,
        id: id,
      })
    })
  }
})
