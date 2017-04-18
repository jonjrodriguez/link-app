<template>
  <header :class="['mdc-toolbar', { 'mdc-toolbar--fixed': fixed }]">
    <div class="mdc-toolbar__row">
      <section class="mdc-toolbar__section mdc-toolbar__section--align-start">
        <a class="material-icons" v-if="icon" @click="$emit('action')">{{ icon }}</a>
        <span class="mdc-toolbar__title">{{ title }}</span>
      </section>

      <section class="mdc-toolbar__section mdc-toolbar__section--align-end mdc-toolbar__section--has-menu">
        <slot></slot>
      </section>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Toolbar',

  props: {
    title: {
      type: String,
      required: true
    },

    icon: String,

    fixed: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss">
  @import "@material/toolbar/mdc-toolbar";

  .mdc-toolbar__section > a {
    cursor: pointer;
  }

  .mdc-toolbar__section--has-menu {
    overflow: visible;
  }
</style>
