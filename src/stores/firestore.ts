// Firebase/Firestore
import {
  getFirestore, getDocs, collection, query, where,
  updateDoc, doc, addDoc, deleteDoc
} from 'firebase/firestore'

// Ours
import { useUserStore } from 'stores/user'

export const firestoreCrudActions = (collectionPath: string) => {
  return {
    update(id: string, data: object) {
      const db = getFirestore()
      const docRef = doc(db, `${collectionPath}/${id}`)

      return updateDoc(docRef, data)
    },

    create(data: object) {
      const db = getFirestore()

      return addDoc(collection(db, collectionPath), {...data})
    },

    delete(id: string) {
      const db = getFirestore()
      const docRef = doc(db, `${collectionPath}/${id}`)

      return deleteDoc(docRef)
    },
  }
}

export const firestoreList = (collectionPath: string, options: {userScoped: boolean}) => {
  const db = getFirestore()
  const userStore = useUserStore()

  const ref = collection(db, collectionPath)
  let q = query(ref)
  
  const userScoped = options.userScoped
  if (userScoped && !userStore.isGm) {
    q = query(ref, where('userId', 'in', ['', userStore.userId]))
  }
  
  return getDocs(q)
}
