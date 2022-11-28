<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <q-form class="full-width">
          <slot>Not yet implemented.</slot>
        </q-form>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn color="primary" label="OK" @click="onOKClick" />
        <q-btn color="primary" label="Cancel" @click="onCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">

export default {
  emits: [ 'ok', 'hide' ],

  methods: {
    show () {
      this.$refs.dialog.show()
    },

    hide () {
      this.$refs.dialog.hide()
    },

    onDialogHide() {
      this.$emit('hide')
    },

    onCancelClick() {
      this.hide()
    },

    onOKClick () {
      this.$emit('ok')

      this.hide()
    },
  },
}
</script>
