<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-btn @click="signOut">Logout</q-btn>
      <router-view />
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
