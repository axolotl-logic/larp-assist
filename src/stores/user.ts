// Pinia data store
import { defineStore } from 'pinia';

// VueUse for lcoalStorage 
import { useStorage } from '@vueuse/core'

// Firebase/Firestore
import {
  getFirestore, doc, setDoc, getDoc, getDocs, collection
} from 'firebase/firestore';

export interface UserPreference {
  userId: string
  name: string
}

function getSignedOutUser() {
  return {
    isAuthorized: false,
    name: '',
    id: '',
    gm: false,
  }
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: useStorage('user', getSignedOutUser()),
    userNames: new Map<string, string>
  }),

  actions: {
    fetchUserNames(): Promise<Map<string, string>> {
      const db = getFirestore()
      
      return getDocs(collection(db, 'userPreferences')).then(docs => {
        this.userNames = new Map<string, string>()
        docs.forEach(doc => {
          const prefData = doc.data()
          if (prefData) {
            this.userNames.set(doc.id, prefData.name)
          }
        })
        
        return this.userNames
      })
    },
    
    signOut(): void {
      this.user = getSignedOutUser()
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
