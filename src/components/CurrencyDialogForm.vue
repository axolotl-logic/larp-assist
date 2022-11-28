<template>
  <DialogForm @ok="save">
    <q-input
        outlined
        label="name"
        v-model="formData.name"
        :rules="[required]"/>

    <q-select
        clearable
        filled
        map-options
        multiple
        use-chips
        stack-label
        emit-value
        v-model="formData.userIds"
        :options="userNameOptions"
        label="Users" />
  </DialogForm>
</template>

<script lang="ts">
// Vue
import { ref } from 'vue'

// Ours
import { useCurrenciesStore } from 'stores/currencies'
import DialogForm from 'components/DialogForm.vue'

const currenciesStore = useCurrenciesStore()

export default {
  components: { DialogForm },

  props: [ 'currency', 'userNames' ],

  emits: [ 'ok' ],

  methods: {
    required (val) {
      return !!val || 'Field is required'
    },

    save() {
      if (this.currency.id) {
        currenciesStore.update(this.currency.id, this.formData)
      } else {
        currenciesStore.create(this.formData)
      }

      this.$emit('ok')
    },
  },

  computed: {
    userNameOptions() {
      const userNameOptions = []
      this.userNames.forEach((name, userId) =>
        userNameOptions.push({
          label: name,
          value: userId
        })
      )

      return userNameOptions
    }
  },

  data() {
    return {
      formData: ref({
        name: this.currency.name || '',
        userIds: this.currency.userIds || [],
      }),
    }
  }
}
</script>
