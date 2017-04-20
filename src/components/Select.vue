<template>
  <div class="mdc-select__with-label" :style="width ? `width: ${width}` : ''">
    <label class="mdc-select__label">{{ label }}</label>

    <select
      class="mdc-select"
      :style="width ? `width: ${width}; max-width: ${width}` : ''"
      :value="value"
      @input="emitChange">
      <option v-for="option in options" :value="option.value">
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'Select',

  props: {
    value: {
      required: true
    },

    id: {
      type: String,
      required: true
    },

    options: {
      type: Array,
      required: true
    },

    label: {
      type: String,
      default: ''
    },

    width: {
      type: String,
      default: ''
    }
  },

  methods: {
    emitChange(event) {
      this.$emit('input', event.target.value);
    }
  }
};
</script>

<style lang="scss">
  @import "~@/styles/variables";
  @import "@material/select/mdc-select";

  .mdc-select__with-label {
    height: 48px;
    position: relative;
    margin-top: 16px;
    margin-bottom: 8px;
    display: inline-block;

    & > .mdc-select__label {
      display: block;
      color: $mdc-theme-primary;
      font-size: 0.75em;
      letter-spacing: 0.04em;
    }
  }
</style>
