<template>
  <div class="v-spinner" v-show="loading">
    <div class="v-clip" v-bind:style="spinnerStyle"></div>
  </div>
</template>

<script>
export default {
  name: 'Spinner',

  props: {
    loading: {
      type: Boolean,
      default: true
    },

    color: {
      type: String,
      default: '#fff'
    },

    size: {
      type: String,
      default: '18px'
    }
  },

  computed: {
    spinnerStyle() {
      return {
        height: this.size,
        width: this.size,
        borderColor: `${this.color} ${this.color} transparent`,
        borderWidth: '2px',
        borderStyle: 'solid',
        borderRadius: '100%',
        background: 'transparent'
      };
    }
  }
};
</script>

<style>
  .v-spinner {
    text-align: center;
  }

  .v-spinner .v-clip {
    animation: v-clipDelay 0.75s 0s infinite linear;
    animation-fill-mode: both;
    display: inline-block;
  }

  @keyframes v-clipDelay {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    100% {
    transform: rotate(360deg);
    }
  }
</style>
