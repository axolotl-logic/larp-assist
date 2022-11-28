// Pinia data store
import { defineStore } from 'pinia'

// Firestore
import { getDocs } from 'firebase/firestore'

// Ours
import { firestoreCrudActions, firestoreList } from 'stores/firestore'

export interface Divination {
  content: string
  name: string
  userId: string
  id: string
}

export interface DivinationPatch {
  content: string
  name: string
  userId: string
}

export const useDivinationsStore = defineStore('divinations', {
  state: () => ({
    divinations: [] as Array<Divination>
  }),

  actions: {
    ...firestoreCrudActions('divinations'),
    fetch() {
      return firestoreList('divinations', {userScoped: true}).then(docs => {
        this.divinations = []
        docs.forEach(doc => {
          const divination = doc.data()
          if (divination) {
            this.divinations.push({
              content: divination.content,
              name: divination.name,
              userId: divination.userId,
              id: doc.id,
            })
          }
        })

        return this.divinations
      })
    }
  }
})
