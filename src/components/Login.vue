<template>
  <div>
    <toolbar
      title="LinkApp"
      fixed />

    <div class="mdc-toolbar-fixed-adjust mdc-layout-grid">
      <form @submit.prevent="signIn" class="mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
        <p v-show="error.message" class="mdc-typography--body1 invalid">{{ error.message }}</p>
        <p v-show="success" class="mdc-typography--body1">{{ success }}</p>

        <text-field
          v-model="email"
          id="email"
          label="E-mail"
          type="email"
          width="100%"
          required />

        <text-field
          v-model="password"
          id="password"
          label="Password"
          type="password"
          width="100%"
          required />

        <p>
          <button type="submit" class="mdc-button mdc-button--primary mdc-button--raised">Login</button>
          <button type="button" class="mdc-button mdc-button--raised" @click="forgot">Forgot Password?</button>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import TextField from '@/components/TextField';
import Toolbar from '@/components/Toolbar';

export default {
  name: 'Login',

  components: { TextField, Toolbar },

  data() {
    return {
      email: '',
      password: '',
      error: {},
      success: ''
    };
  },

  methods: {
    signIn() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push(this.$route.query.redirect || '/');
        })
        .catch((error) => {
          this.error = error;
        });
    },

    forgot() {
      firebase.auth().sendPasswordResetEmail(this.email)
        .then(() => {
          this.error = {};
          this.success = 'A password reset email has been sent.';
        })
        .catch((error) => {
          this.error = error;
        });
    }
  }
};
</script>
