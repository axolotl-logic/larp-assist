<template>
  <div class="row headers">
    <div class="col-2">
      Currency
    </div>
    <div class="col-2">
      Amount
    </div>
    <div class="col">
      Markets
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: ['marketsByCurrencyId', 'currenciesByName'],

  computed: {
    currencies() {
      return Array.from(this.currenciesByName).map(
        ([name, currency]) => ({
          name,
          amount: 0,
          markets: this.marketsByCurrencyId.get(currency.id) || []
        })
      )
    }
  }
}
</script>

<style lang="scss">
.headers {
  font-size: 1.2rem;
}
</style>
