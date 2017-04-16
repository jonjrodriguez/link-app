<template>
  <aside class="mdc-temporary-drawer">
    <nav class="mdc-temporary-drawer__drawer">
      <div class="mdc-temporary-drawer__toolbar-spacer mdc-theme--primary-bg mdc-theme--text-primary-on-primary"></div>

      <nav class="mdc-temporary-drawer__content mdc-list">
        <a class="mdc-list-item mdc-temporary-drawer--selected" href="#">
          <i class="material-icons mdc-list-item__start-detail" aria-hidden="true">inbox</i>Inbox
        </a>
        <a class="mdc-list-item" href="#">
          <i class="material-icons mdc-list-item__start-detail" aria-hidden="true">star</i>Star
        </a>
      </nav>
    </nav>
  </aside>
</template>

<script>
import { MDCTemporaryDrawer } from '@material/drawer';

export default {
  name: 'Menu',

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
