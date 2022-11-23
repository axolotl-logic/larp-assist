<template>
  <q-page padding>
    <LoginForm/>
    <RegistrationForm/>
  </q-page>
</template>

<script lang="ts">
// Vue
import { defineComponent } from 'vue'

// Ours
import RegistrationForm from 'components/RegistrationForm.vue'
import LoginForm from 'components/LoginForm.vue'

export default defineComponent({
  components: {RegistrationForm, LoginForm}
})
</script>
