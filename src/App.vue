<template>
  <div class="mdc-typography">
    <toolbar fixed @toggleDrawer="toggleDrawer" />
    <drawer ref="drawer" />

    <div class="mdc-toolbar-fixed-adjust">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import Toolbar from './components/Toolbar';
import Drawer from './components/Drawer';

export default {
  name: 'App',

  components: { Toolbar, Drawer },

  beforeCreate() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.$router.push('/login');
      }

      if (user && this.$route.path === '/login') {
        this.$router.push('/');
      }
    });
  },

  methods: {
    toggleDrawer() {
      this.$refs.drawer.toggle();
    }
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
  @import "@material/card/mdc-card";
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
  }

  .invalid {
    color: #d50000;
  }
</style>
