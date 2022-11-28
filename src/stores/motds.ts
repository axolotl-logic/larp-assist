// Pinia data store
import { defineStore } from 'pinia'

// Ours
import { firestoreCrudActions, firestoreList } from 'stores/firestore'

export interface Motd {
  content: string
  userId: string
  id: string
}

export interface MotdPatch {
  content: string
  userId: string
}

export const useMotdsStore = defineStore('motds', {
  state: () => ({
    motds: [] as Array<Motd>
  }),

  actions: {
    ...firestoreCrudActions('motds'),
    fetch() {
      return firestoreList('motds', {userScoped: true}).then(docs => {
        this.motds = []
        docs.forEach(doc => {
          const motd = doc.data()
          if (motd) {
            this.motds.push({
              content: motd.content,
              userId: motd.userId,
              id: doc.id,
            })
          }
        })

        return this.motds
      })
    }
  }
})
