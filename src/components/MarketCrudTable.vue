<template>
  <div class="q-pa-md">
    <CrudTable
        :columns="columns"
        :rows="markets"
        :dialog="dialog"
        :loading="loading"
        title="Markets"
        @refresh="fetchMarkets"
        @delete="deleteMarket" />
  </div>
</template>

<script>
// Vue
import { ref } from 'vue'

// Ours
import { useMarketsStore } from 'stores/markets'
import { useUserStore } from 'stores/user'
import MarketDialogForm from 'components/MarketDialogForm.vue'
import CrudTable from 'components/CrudTable.vue'

const marketsStore = useMarketsStore()
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
      markets: ref(),
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
    dialog(market) {
      return {
        component: MarketDialogForm,
        componentProps: {
          market: currency || {},
          userNames: this.userNames
        }
      }
    },

    deleteMarket(market, onSuccess) {
      this.loading = true

      marketsStore.delete(market.id).then(() => {
        onSuccess()

        this.loading = false
      })
    },

    fetchMarkets() {
      this.loading = true
      return marketsStore.fetch().then(markets => {
        userStore.fetchUserNames().then(userNames => {
          markets.forEach(market => {
            market.userNames = (currency.userIds || []).map(
              (userId)=> userNames.get(userId))
          })

          this.markets = markets
          this.loading = false
        })
      })
    },
  }
}
</script>
