// Pinia data store
import { defineStore } from 'pinia';

// VueUse for lcoalStorage 
import { useStorage } from '@vueuse/core'

// Firebase/Firestore
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

function signedOutUser() {
  return {
    isAuthorized: false,
    name: '',
    id: '',
    gm: false,
  }
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: useStorage('user', signedOutUser())
  }),

  getters: {
    name(): string {
      return this.user.name
    },
    
    isAuthorized(): boolean {
      return this.user.isAuthorized
    },
    
    isGm(): boolean {
      return this.user.gm
    },
    
    userId(): string {
      return this.user.id
    }
  },

  actions: {
    signOut(): void {
      this.user = signedOutUser()
    },
    login(userId: string): Promise<void> {
      const db = getFirestore()
      this.user.id = userId
      return Promise.all([
        getDoc(doc(db, `userPreferences/${userId}`)).then(doc => {
          const data = doc.data()
          if (data) {
            this.user.name = data.name
          }
        }),
        getDoc(doc(db, `users/${userId}`)).then(doc => {
          const userData = doc.data()
          if (userData) {
            this.user.gm = userData.gm
          }
        })
      ]).then(() => {
        this.user.isAuthorized = true
      })
    },

    register(name: string, userId: string): Promise<void> {
      this.user.id = userId
      this.user.name = name
      this.user.isAuthorized = true
      
      const db = getFirestore()
      
      return setDoc(doc(db, `userPreferences/${userId}`), {name: name})
    },
  }
});
