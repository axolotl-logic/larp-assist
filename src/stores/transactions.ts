// Pinia data store
import { defineStore } from 'pinia'

// Ours
import { makeCrudActions } from 'stores/firestore'
import { Transaction } from 'src/models'

export const useTransactionsStore = defineStore('transactions', () => {
  return {
    ...makeCrudActions<Transaction>('transactions', {
      map: (id, data) => ({
        amount: data.amount,
        toUserId: data.toUserId,
        fromUserId: data.fromUserId,
        currency: data.currency,
        notes: data.notes,
        id: id
      })
    })
  }
})
