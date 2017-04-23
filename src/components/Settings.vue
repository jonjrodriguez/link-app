<template>
  <Layout :loading="loading">

    <div class="mdc-layout-grid">
      <form @submit.prevent="update" class="mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
        <p v-show="error.message" class="mdc-typography--body1 invalid">{{ error.message }}</p>
        <p v-show="success" class="mdc-typography--body1">{{ success }}</p>

        <text-field
          v-model="user.name"
          id="name"
          label="Name"
          width="100%"
          required />

        <text-field
          v-model="user.twilioNumber"
          id="twilioNumber"
          label="Twilio Number"
          type="tel"
          width="100%"
          required />

        <p>
          <button type="submit" class="mdc-button mdc-button--primary mdc-button--raised">Save</button>
        </p>
      </form>

      <form @submit.prevent="updatePassword" class="mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
        <text-field
          v-model="password"
          id="password"
          label="New Password"
          width="100%" />

        <p>
          <button type="submit" class="mdc-button mdc-button--primary mdc-button--raised">Update Password</button>
        </p>
      </form>
    </div>
  </Layout>
</template>

<script>
import phone from 'phone';
import firebase from 'firebase/app';
import Layout from '@/components/Layout';
import TextField from '@/components/TextField';
import Toolbar from '@/components/Toolbar';

export default {
  name: 'Settings',

  components: { Layout, TextField, Toolbar },

  data() {
    return {
      db: null,
      user: {},
      password: '',
      error: {},
      success: '',
      loading: false
    };
  },

  created() {
    this.loading = true;
    const user = firebase.auth().currentUser;
    this.db = firebase.database().ref(`users/${user.uid}`);

    this.db.once('value').then(() => {
      this.loading = false;
    });

    this.db.on('value', (data) => {
      this.user = data.val() || {};
    });
  },

  beforeDestroy() {
    this.db.off();
  },

  methods: {
    update() {
      this.loading = true;

      const e164 = phone(this.user.twilioNumber);

      this.db.set({ ...this.user, e164: e164[0] })
        .then(() => {
          this.loading = false;
          this.success = 'Profile saved.';
        })
        .catch((error) => {
          this.loading = false;
          this.error = error;
        });
    },

    updatePassword() {
      if (this.password === '') {
        this.error = { message: 'Please enter a password.' };
        return;
      }

      this.loading = true;

      const user = firebase.auth().currentUser;
      user.updatePassword(this.password)
        .then(() => {
          this.loading = false;
          this.password = '';
          this.success = 'Password updated';
        })
        .catch((error) => {
          this.loading = false;
          this.error = error;
        });
    }
  }
};
</script>
