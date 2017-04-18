<template>
  <div class="mdc-typography">
    <router-view />
  </div>
</template>

<script>
import firebase from 'firebase/app';

export default {
  name: 'App',

  beforeCreate() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.$router.push('/login');
      }

      if (user && this.$route.path === '/login') {
        this.$router.push(this.$route.query.redirect || '/');
      }
    });
  }
};
</script>

<style lang="scss">
  $mdc-theme-primary: #009688; /* Teal 500 */
  $mdc-theme-accent: #00bfa5;
  $mdc-theme-background: #fff; /* White */

  @import "@material/layout-grid/mdc-layout-grid";
  @import "@material/theme/mdc-theme";
  @import "@material/typography/mdc-typography";
  @import "@material/list/mdc-list";
  @import "@material/button/mdc-button";
  @import "@material/elevation/mdc-elevation";
  @import "@material/ripple/mdc-ripple";

  @import "./styles/base";
  @import "./styles/transitions";
</style>
