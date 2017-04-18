<template>
  <button :class="classes" :aria-label="icon" @click="$emit('click')">
    <span class="mdc-fab__icon">
      {{ icon }}
    </span>
  </button>
</template>

<script>
export default {
  name: 'Fab',

  props: {
    icon: {
      type: String,
      required: true
    },

    fixed: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    classes() {
      return [
        'mdc-fab',
        'material-icons',
        {
          'app-fab--fixed': this.fixed
        }
      ];
    }
  }
};
</script>

<style lang="scss">
  @import "@material/fab/mdc-fab";

  .app-fab--fixed {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
  }

  @media(min-width: 1024px) {
    .app-fab--fixed {
      bottom: 3rem;
      right: 5rem;
    }
  }
</style>
