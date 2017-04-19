<template>
  <div>
    <toolbar
      title="LinkApp"
      icon="menu"
      :loading="loading"
      @action="toggleDrawer">
      <mdc-menu />
    </toolbar>

    <drawer ref="drawer" />

    <div class="mdc-toolbar-fixed-adjust">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Drawer from './Drawer';
import MdcMenu from './Menu';
import Toolbar from './Toolbar';

export default {
  name: 'Layout',

  components: { Drawer, MdcMenu, Toolbar },

  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    toggleDrawer() {
      this.$refs.drawer.toggle();
    }
  }
};
</script>
