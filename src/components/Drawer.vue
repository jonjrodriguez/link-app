<template>
  <aside class="mdc-temporary-drawer">
    <nav class="mdc-temporary-drawer__drawer">
      <div class="mdc-temporary-drawer__toolbar-spacer mdc-theme--primary-bg mdc-theme--text-primary-on-primary">
        <p class="mdc-typography--headline margin-0">LinkApp</p>
      </div>

      <nav class="mdc-temporary-drawer__content mdc-list">
        <router-link to="/" exact @click.native="toggle" class="mdc-list-item">
          <i class="material-icons mdc-list-item__start-detail" aria-hidden="true">link</i>Link Up
        </router-link>
        <router-link to="contacts" exact @click.native="toggle" class="mdc-list-item">
          <i class="material-icons mdc-list-item__start-detail" aria-hidden="true">contacts</i>Contacts
        </router-link>
      </nav>
    </nav>
  </aside>
</template>

<script>
import { MDCTemporaryDrawer } from '@material/drawer';

export default {
  name: 'Drawer',

  data() {
    return {
      drawer: null
    };
  },

  mounted() {
    this.drawer = new MDCTemporaryDrawer(this.$el);
  },

  beforeDestroy() {
    this.drawer.destroy();
  },

  methods: {
    toggle() {
      this.drawer.open = !this.drawer.open;
    }
  }
};
</script>

<style lang="scss">
  @import "@material/drawer/mdc-drawer";
</style>
