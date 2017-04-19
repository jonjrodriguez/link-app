<template>
  <div class="mdc-checkbox">
    <input type="checkbox" class="mdc-checkbox__native-control"/>

    <div class="mdc-checkbox__background">
      <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
        <path class="mdc-checkbox__checkmark__path"
          fill="none"
          stroke="white"
          d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
      </svg>

      <div class="mdc-checkbox__mixedmark"></div>
    </div>
  </div>
</template>

<script>
import { MDCCheckbox } from '@material/checkbox';

export default {
  name: 'Checkbox',

  props: {
    checked: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      checkbox: null
    };
  },

  mounted() {
    this.checkbox = new MDCCheckbox(this.$el);
    this.checkbox.checked = this.checked;
  },

  beforeDestroy() {
    this.checkbox.destroy();
  },

  watch: {
    checked() {
      this.checkbox.checked = this.checked;
    }
  }
};
</script>

<style lang="scss">
  @import "@material/checkbox/mdc-checkbox";
</style>
