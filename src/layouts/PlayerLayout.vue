<template>
  <q-layout class="bg-image" view="lHh lpr lFf">
    <q-page-container>
      <q-page padding class="page q-mx-auto">
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style lang="scss">
.bg-image {
  background-image: url(/images/background.jpg);
  background-position: fixed;
  background-size: cover;
}

.page {
  max-width: 768px;
}
</style>

<script setup lang="ts">
// Quasar (plugins)
import { useQuasar } from 'quasar';

// Firebase
import { signOut, getAuth } from 'firebase/auth';

// Ours - Stores

const $q = useQuasar();

const onSignOut = () => {
  signOut(getAuth()).catch((err) => {
    $q.notify({ type: 'negative', message: err });
  });
};
</script>
