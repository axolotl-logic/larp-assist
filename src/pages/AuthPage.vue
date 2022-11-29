<template>
  <q-card>
    <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator>
      <q-tab name="login" label="Login" />
      <q-tab name="register" label="Register" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="login">
        <div class="text-h6">Login</div>
        <LoginForm/>
      </q-tab-panel>

      <q-tab-panel name="register">
        <div class="text-h6">Register</div>
        <RegistrationForm/>
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script lang="ts">
// Vue
import { defineComponent, ref } from 'vue'

// Ours
import RegistrationForm from 'components/RegistrationForm.vue'
import LoginForm from 'components/LoginForm.vue'

export default defineComponent({
  components: {RegistrationForm, LoginForm},

  setup() {
    return {
      tab: ref('login')
    }
  }
})
</script>
