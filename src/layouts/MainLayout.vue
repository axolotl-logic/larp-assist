<template>
    <q-layout view="lHh lpr lFf">
      <q-header elevated>
        <q-toolbar class="q-px-lg">
          <q-icon name="tips_and_updates" size="md"/>

          <q-toolbar-title>LARP Assist</q-toolbar-title>

          <q-btn
              size="md"
              label="Logout"
              @click="logout"
              color="secondary"/>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page padding>
          <router-view />
        </q-page>
      </q-page-container>
    </q-layout>
</template>

<script lang='ts'>
// Vue
import { defineComponent } from 'vue'

// Firebase
import { signOut } from 'firebase/auth';

// Ours
import { useUserStore } from 'stores/user'

export default defineComponent({
  name: 'MainLayout',
  methods: {
    signOut() {
      signOut(this.$auth)
        .then(() => {
          const userStore = useUserStore()
          userStore.signOut()
          this.$router.push('/')
        })
        .catch(err => {
            console.log('Notify!')
            this.$q.notify({type: 'negative', message: err})
        })
    }
  }
});
</script>
