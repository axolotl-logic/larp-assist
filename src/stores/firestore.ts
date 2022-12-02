// Vue
import { ref, Ref } from 'vue'

// Firebase/Firestore
import {
  getFirestore, getDocs, collection, query, where,
  updateDoc, doc, addDoc, deleteDoc, DocumentData
} from 'firebase/firestore'

// Ours
import { useUserStore } from 'stores/user'
import { Model } from 'src/models'


export const makeCrudActions = <T extends Model>(collectionPath: string, settings: {
  map: (id: string, data: DocumentData) => T
}) => {
  const loading = ref(false)
  const items = ref<T[]>([]) as Ref<T[]>
  const refresh = () => {
    loading.value = true

    const db = getFirestore()

    const ref = collection(db, collectionPath)

    return getDocs(ref).then(docs => {
      items.value = []
      docs.forEach(doc => {
        items.value.push(settings.map(doc.id, doc.data()))
      })

      loading.value = false
    })
  }
  
  const update = (id: string, item: object) => {
    loading.value = true

    const db = getFirestore()
    const docRef = doc(db, `${collectionPath}/${id}`)

    return updateDoc(docRef, item).then(refresh)
  }
  
  const create = (item: object) => {
    loading.value = true
    
    const db = getFirestore()

    return addDoc(collection(db, collectionPath), {...item}).then(refresh)
  }
  
  
  return {
    items,
    loading,
    refresh,
    create,
    update,
    createOrUpdate(item: T) {
      const {id, ...safe} = item;
      if (id) {
        update(id, safe)
      } else {
        create(safe)
      }
    },
    delete(id: string) {
      loading.value = true
      
      const db = getFirestore()
      const docRef = doc(db, `${collectionPath}/${id}`)

      return deleteDoc(docRef).then(refresh)
    },
  }
}

export const processCollection = (
  collectionPath: string,
  options: {
    userScoped: boolean,
    setup: () => void,
    multipleUsers: boolean,
    forEach: (id: string, data: DocumentData) => void
  }) => {
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
