<template>
  <DialogForm @ok="save">
    <q-input
        outlined
        type="number"
        label="Amount"
        v-model="formData.amount"
        :rules="[required]"/>
    <q-input
        outlined
        label="Currency"
        v-model="formData.currency"
        :rules="[required]"/>
    <CharacterSelect label="To" :userNames="userNames" v-model="formData.toUserId"/>
    <CharacterSelect label="From" :userNames="userNames" v-model="formData.fromUserId"/>
    <q-input
      outlined
      type="textarea"
      label="Note"
      v-model="formData.notes"
      :rules="[required]"/>

  </DialogForm>
</template>

<script lang="ts">
// Vue
import { ref } from 'vue'

// Ours
import { useTransactionsStore } from 'stores/transactions'
import DialogForm from 'components/DialogForm.vue'
import CharacterSelect from 'components/CharacterSelect.vue'

const transactionsStore = useTransactionsStore()

export default {
  components: { DialogForm, CharacterSelect },

  props: [ 'transaction', 'userNames' ],

  emits: [ 'ok' ],

  methods: {
    required (val) {
      return !!val || 'Field is required'
    },

    save() {
      const id = this.transaction.id
      const transaction = { ...this.formData }
      if (id) {
        transactionsStore.update(id, transaction)
      } else {
        transaction.userIds = [
          transaction.toUserId,
          transaction.fromUserId
        ]
        transactionsStore.create(transaction)
      }

      this.$emit('ok')
    },
  },

  data() {
    const tx = this.transaction
    return {
      formData: ref({
        toUserId: tx.toUserId || '',
        fromUserId: tx.fromUserId || '',
        notes: tx.notes || '',
        amount: tx.amount || 0,
        currency: 'TODO',
      }),
    }
  }
}
</script>
