<template>
  <div class="q-pa-md">
    <CrudTable
        :columns="columns"
        :rows="transactions"
        :dialog="dialog"
        :loading="loading"
        title="Transactions"
        @refresh="fetchTransactions"
        @delete="deleteTransaction" />
  </div>
</template>

<script>
// Vue
import { ref } from 'vue'

// Ours
import { useTransactionsStore } from 'stores/transactions'
import { useUserStore } from 'stores/user'
import TransactionDialogForm from 'components/TransactionDialogForm.vue'
import CrudTable from 'components/CrudTable.vue'

const transactionsStore = useTransactionsStore()
const userStore = useUserStore()

export default {
  components: { CrudTable },

  computed: {
    userNames() {
      return userStore.userNames
    }
  },

  setup() {
    return {
      loading: ref(true),
      transactions: ref(),
      columns: [
        {
          name: 'toUserName',
          field: 'toUserName',
          label: 'To',
          align: 'left',
          sortable: true
        },
        {
          name: 'fromUserName',
          field: 'fromUserName',
          label: 'From',
          align: 'left',
          sortable: true
        },
        {
          name: 'amount',
          field: 'amount',
          label: 'Amount',
          align: 'left',
          sortable: true
        },
        {
          name: 'currency',
          field: 'currency',
          label: 'Currency',
          align: 'left',
          sortable: true
        },
{
          name: 'notes',
          field: 'notes',
          label: 'Notes',
          align: 'left',
          sortable: true
        },
        { name: 'actions', label: 'Action' }
      ]
    }
  },

  methods: {
    dialog(transaction) {
      return {
        component: TransactionDialogForm,
        componentProps: {
          transaction: transaction || {},
          userNames: this.userNames
        }
      }
    },

    deleteTransaction(transaction, onSuccess) {
      this.loading = true

      transactionsStore.delete(transaction.id).then(() => {
        onSuccess()

        this.loading = false
      })
    },

    fetchTransactions() {
      this.loading = true
      return transactionsStore.fetch().then(transactions => {
        userStore.fetchUserNames().then(userNames => {
          transactions.forEach(transaction => {
            transaction.toUserName = userNames.get(transaction.toUserId, '')
            transaction.fromUserName = userNames.get(transaction.fromUserId, '')
          })

          this.transactions = transactions
          this.loading = false
        })
      })
    },
  }
}
</script>
