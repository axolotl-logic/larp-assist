// Pinia data store
import { defineStore } from 'pinia'

// Ours
import { makeCrudActions, processCollection } from 'stores/firestore'

export interface Transaction {
  amount: number
  toUserId: string
  fromUserId: string
  currency: string
  notes: string
  id: string
}

export const useTransactionsStore = defineStore('transactions', {
  state: () => ({
    transactions: [] as Array<Transaction>
  }),

  actions: {
    ...makeCrudActions('transactions'),
    fetch(): Promise<Array<Transaction>> {
      return processCollection('transactions', {
        userScoped: true,
        setup: () => this.transactions = [],
        multipleUsers: true,
        forEach: (id, data) => this.transactions.push({
          amount: data.amount,
          toUserId: data.toUserId,
          fromUserId: data.fromUserId,
          currency: data.currency,
          notes: data.notes,
          id: id
        }),
      }).then(() => this.transactions)
    }
  }
})
