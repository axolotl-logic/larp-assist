<template>
  <div v-for="currency in currenciesWithMarkets" class="row q-mb-md" v-bind:key="currency.id">
    <div class="col">
      <div class="currency-name">
        {{ currency.name }}
      </div>
      <div class="text-body1">
        Amount: {{ currency.amount }}
      </div>
      <div class="row">
        <div v-for="market in currency.markets" v-bind:key="market.id">
          <q-btn to="/market/" :label="market.name" outline color="accent" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Market, Currency} from 'src/models'

export default {
  props: {
    marketsByCurrencyId: {
      type: Map<string, Array<Market>>,
      required: true
    },
    currencies: {
      type: Array<Currency>,
      required: true
    }
  },

  computed: {
    currenciesWithMarkets() {
      return this.currencies.map(currency => ({
          name: currency.name,
          id: currency.id,
          amount: 0,
          markets: this.marketsByCurrencyId.get(currency.id) || []
        })
      )
    }
  }
}
</script>

<style lang="scss">
.currency-name {
  font-size: 1.2rem;
}
</style>
