<template>
  <div>
    <toolbar
      :title="title"
      :icon="icon"
      :loading="loading"
      @action="doAction">
      <mdc-menu />
    </toolbar>

    <drawer v-show="!action" ref="drawer" />

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
    title: {
      type: String,
      default: 'LinkApp'
    },

    icon: {
      type: String,
      default: 'menu'
    },

    loading: {
      type: Boolean,
      default: false
    },

    action: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    doAction() {
      if (this.action) {
        this.$emit('action');
        return;
      }

      this.$refs.drawer.toggle();
    }
  }
};
</script>
