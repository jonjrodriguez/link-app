<template>
  <div>
    <feature-bar title="Login" />

    <div class="mdc-layout-grid">
      <form @submit.prevent="signIn" class="mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
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
        </p>

        <p v-show="error.message" class="mdc-typography--body1 invalid">{{ error.message }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import TextField from './TextField';
import FeatureBar from './FeatureBar';

export default {
  name: 'Login',

  components: { TextField, FeatureBar },

  data() {
    return {
      email: '',
      password: '',
      error: {}
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
    }
  }
};
</script>
