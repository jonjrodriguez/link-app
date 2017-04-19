<template>
  <header :class="['mdc-toolbar', { 'mdc-toolbar--fixed': fixed }]">
    <div class="mdc-toolbar__row">
      <section class="mdc-toolbar__section mdc-toolbar__section--align-start">
        <a class="material-icons" v-if="icon" @click="$emit('action')">{{ icon }}</a>
        <span class="mdc-toolbar__title">{{ title }}</span>

        <spinner :loading="loading" />
      </section>

      <section class="mdc-toolbar__section mdc-toolbar__section--align-end mdc-toolbar__section--has-menu">
        <slot></slot>
      </section>
    </div>
  </header>
</template>

<script>
import Spinner from './Spinner';

export default {
  name: 'Toolbar',

  components: { Spinner },

  props: {
    title: {
      type: String,
      required: true
    },

    icon: String,

    loading: {
      type: Boolean,
      default: false
    },

    fixed: {
      type: Boolean,
      default: true
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

  .v-spinner {
    margin-left: 8px;
  }
</style>
