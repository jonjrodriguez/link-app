<template>
  <div class="mdc-typography">
    <router-view></router-view>
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

  body {
    margin: 0;
  }

  .margin-0 {
    margin: 0;
  }

  a.material-icons {
    text-decoration: none;
    cursor: pointer;
    padding: 0px 8px 0px 0px;

    .mdc-list-item > & {
      padding: 0;
    }
  }

  .invalid {
    color: #d50000;
  }

  .mdc-list--two-line-icon-list .mdc-list-item__start-detail {
    background: grey;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: white;
  }

  a.mdc-list-item {
    cursor: pointer;
  }
</style>
