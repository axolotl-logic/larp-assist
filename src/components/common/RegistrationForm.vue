<template>
  <q-form @submit='register' class='full-width'>
    <q-input
        outlined
        class='q-mb-md'
        type='text'
        label='Character Name'
        v-model='name'
        :rules='[required]'/>
    <q-input
        outlined
        class='q-mb-md'
        type='email'
        label='Email'
        v-model='email'
        :rules='[required]'/>
    <q-input
        outlined
        class='q-mb-md'
        type='password'
        label='Password'
        v-model='password'
        :rules='[required]'/>
    <q-input
        outlined
        class='q-mb-md'
        type='password'
        label='Confirm Password'
        v-model='confirmPassword'
        :rules='[required, matchesPassword]'/>
    <div class='row'>
      <q-space />
        <q-btn type='submit' color='primary'>Register</q-btn>
    </div>
  </q-form>
</template>

<script lang='ts'>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { defineComponent } from 'vue'
import { useUserStore } from 'stores/user'

export default defineComponent({
  setup() {
    return {
      store: useUserStore()
    }
  },
  data() {
    return {
      email: ref(),
      password: ref(),
      confirmPassword: ref(),
      name: ref(),
    }
  },
  methods: {
    register() {
      const auth = getAuth()
      createUserWithEmailAndPassword(auth, this.email, this.password).then((userCred) => {
        this.store.register(this.name, userCred.user.uid).then(() => {
          this.$router.push('/')
        })
      }).catch((error) => {
        const messages = {
          'auth/weak-password': 'Password is too weak',
          'auth/email-already-in-use': 'Email already in use'
        }

        const msg = messages[error.code] || error.message
        this.$q.notify({type: 'negative', message: msg})
      })
    },
    required(v) {
      return !!v || 'field required'
    },
    matchesPassword(v) {
      return this.password == v || 'Must match password'
    }
  }
})
</script>
