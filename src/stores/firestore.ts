// Firebase/Firestore
import {
  getFirestore, getDocs, collection, query, where,
  updateDoc, doc, addDoc, deleteDoc, DocumentData
} from 'firebase/firestore'

// Ours
import { useUserStore } from 'stores/user'

export const makeCrudActions = (collectionPath: string) => {
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

export const processCollection = (
  collectionPath: string,
  options: {
    userScoped: boolean,
    forEach: (id: string, data: DocumentData) => void,
    setup: () => void,
    multipleUsers: boolean
  }
) => {
  const db = getFirestore()
  const userStore = useUserStore()

  const ref = collection(db, collectionPath)
  let q = query(ref)
  
  if (options.userScoped && !userStore.user.gm) {
    if (options.multipleUsers) {
      q = query(ref, where('userIds', 'array-contains-any', ['', userStore.user.id]))
    } else {
      q = query(ref, where('userId', 'in', ['', userStore.user.id]))
    }
  }

  return getDocs(q).then(docs => {
    options.setup()
    docs.forEach(doc => options.forEach(doc.id, doc.data()))
  })
}
