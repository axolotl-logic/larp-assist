// Pinia data store
import { defineStore } from 'pinia'

// Firebase/Firestore
import {
  getFirestore, getDocs, collection, query, where,
  updateDoc, doc
} from 'firebase/firestore'

// Ours
import { useUserStore } from 'stores/user'

export interface Motd {
  content: string
  id: string
  userId: string
}

export const useMotdsStore = defineStore('motds', {
  state: () => ({
    motds: [] as Array<Motd>
  }),

  actions: {
    saveContent(id: string, content: string) {
      const db = getFirestore()
      const docRef = doc(db, `motds/${id}`)
      
      return updateDoc(docRef, {content: content})
    },
    
    fetchMotds(): Promise<Array<Motd>> {
      const db = getFirestore()
      const userStore = useUserStore()

      const motdsRef = collection(db, 'motds')
      let q = query(motdsRef)
      if (!userStore.isGm) {
        console.log(userStore.userId)
        q = query(motdsRef,
                  where('userId', 'in', ['', userStore.userId]))
      }

      this.motds = []
      return getDocs(q).then(docs =>  docs.forEach(doc => {
        const motd = doc.data()
        if (motd) {
          this.motds.push({
            content: motd.content,
            id: doc.id,
            userId: motd.userId,
          })
        }
      })).then(() => this.motds)
    },
  }
})
