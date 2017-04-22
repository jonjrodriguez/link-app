<template>
  <div class="mdc-menu-anchor">
    <a class="material-icons" @click="toggle">more_vert</a>
    <div ref="menu" class="mdc-simple-menu mdc-theme--text-primary-on-background" tabindex="-1">
      <ul class="mdc-simple-menu__items mdc-list" role="menu" aria-hidden="true">
        <li @click="$router.push({ name: 'settings' })" class="mdc-list-item" role="menuitem" tabindex="0">
          Settings
        </li>
        <li @click="signOut" class="mdc-list-item" role="menuitem" tabindex="0">
          Sign Out
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import { MDCSimpleMenu } from '@material/menu';

export default {
  name: 'Menu',

  data() {
    return {
      menu: null
    };
  },

  mounted() {
    this.menu = new MDCSimpleMenu(this.$refs.menu);
  },

  beforeDestroy() {
    this.menu.destroy();
  },

  methods: {
    toggle() {
      this.menu.open = !this.menu.open;
    },

    signOut() {
      firebase.auth().signOut().catch((error) => {
        // eslint-disable-next-line
        console.log(error);
      });
    }
  }
};
</script>

<style lang="scss">
  @import "@material/menu/mdc-menu";
</style>
