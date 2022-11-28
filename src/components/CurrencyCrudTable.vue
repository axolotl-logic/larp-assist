<template>
  <div class="q-pa-md">
    <CrudTable
        :columns="columns"
        :rows="currencies"
        :dialog="dialog"
        :loading="loading"
        title="Currencies"
        @refresh="fetchCurrencies"
        @delete="deleteCurrency" />
  </div>
</template>

<script>
// Vue
import { ref } from 'vue'

// Ours
import { useCurrenciesStore } from 'stores/currencies'
import { useUserStore } from 'stores/user'
import CurrencyDialogForm from 'components/CurrencyDialogForm.vue'
import CrudTable from 'components/CrudTable.vue'

const currenciesStore = useCurrenciesStore()
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
      currencies: ref(),
      columns: [
        {
          name: 'name',
          field: 'name',
          label: 'Name',
          align: 'left',
          sortable: true
        },
        {
          name: 'userNames',
          field: 'userNames',
          label: 'Characters',
          format: (userNames) => userNames.join(', '),
          align: 'left',
          sortable: true
        },
        { name: 'actions', label: 'Action' }
      ]
    }
  },

  methods: {
    dialog(currency) {
      return {
        component: CurrencyDialogForm,
        componentProps: {
          currency: currency || {},
          userNames: this.userNames
        }
      }
    },

    deleteCurrency(currency, onSuccess) {
      this.loading = true

      currenciesStore.delete(currency.id).then(() => {
        onSuccess()

        this.loading = false
      })
    },

    fetchCurrencies() {
      this.loading = true
      return currenciesStore.fetch().then(currencies => {
        userStore.fetchUserNames().then(userNames => {
          currencies.forEach(currency => {
            currency.userNames = (currency.userIds || []).map(
              (userId)=> userNames.get(userId))
          })

          this.currencies = currencies
          this.loading = false
        })
      })
    },
  }
}
</script>
