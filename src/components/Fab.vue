<template>
  <button :class="classes" :aria-label="icon" @click="$emit('onClick')">
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

    absolute: {
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
          'app-fab--absolute': this.absolute
        }
      ];
    }
  }
};
</script>

<style lang="scss">
  @import "@material/fab/mdc-fab";

  .app-fab--absolute {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
  }

  @media(min-width: 1024px) {
    .app-fab--absolute {
      bottom: 3rem;
      right: 5rem;
    }
  }
</style>
