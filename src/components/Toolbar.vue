<template>
  <header :class="['mdc-toolbar', { 'mdc-toolbar--fixed': fixed }]">
    <div class="mdc-toolbar__row">
      <section class="mdc-toolbar__section mdc-toolbar__section--align-start">
        <a class="material-icons" @click="$emit('toggleDrawer')">menu</a>
        <span class="mdc-toolbar__title">LinkApp</span>
      </section>
      <section class="mdc-toolbar__section mdc-toolbar__section--align-end">
        <mdc-menu />
      </section>
    </div>
  </header>
</template>

<script>
import MdcMenu from './Menu';

export default {
  name: 'Toolbar',

  components: { MdcMenu },

  props: {
    fixed: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss">
  @import "@material/toolbar/mdc-toolbar";
</style>
