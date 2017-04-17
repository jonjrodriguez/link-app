<template>
  <div>
    <div ref="textfield" :class="classes" :style="width ? `width: ${width}` : ''">
      <input v-if="!isTextarea"
        class="mdc-textfield__input"
        :type="type"
        :id="id"
        :value="value"
        @input="$emit('input', $event.target.value)"
        :placeholder="fullWidth ? label : ''"
        :aria-label="fullWidth ? label : ''"
        :aria-controls="helptext ? `${id}-helptext` : ''"
        :required="required"
        :disabled="disabled">

      <textarea v-else
        class="mdc-textfield__input"
        :rows="rows"
        :cols="cols"
        :placeholder="fullWidth ? label : ''"
        :aria-label="fullWidth ? label : ''">
      </textarea>

      <label v-if="!fullWidth" class="mdc-textfield__label" :for="id">{{ label }}</label>
    </div>

    <p v-if="helptext"
      :id="`${id}-helptext`"
      :class="['mdc-textfield-helptext', 'mdc-textfield-helptext--validation-msg', {'mdc-textfield-helptext--persistent': persistentHelptext }]"
      :aria-hidden="persistentHelptext">
      {{ helptext }}
    </p>
  </div>
</template>

<script>
import { MDCTextfield } from '@material/textfield';

export default {
  name: 'TextField',

  props: {
    value: {
      type: String,
      default: ''
    },

    id: {
      type: String,
      required: true
    },

    type: {
      type: String,
      default: 'text'
    },

    label: {
      type: String,
      required: true
    },

    fullWidth: {
      type: Boolean,
      default: false
    },

    helptext: {
      type: String,
      default: ''
    },

    persistentHelptext: {
      type: Boolean,
      default: false
    },

    required: {
      type: Boolean,
      default: false
    },

    disabled: {
      type: Boolean,
      default: false
    },

    rows: {
      type: Number,
      default: 8
    },

    cols: {
      type: Number,
      default: 40
    },

    width: {
      type: String
    }
  },

  data() {
    return {
      textfield: null
    };
  },

  computed: {
    classes() {
      return [
        'mdc-textfield',
        {
          'mdc-textfield--disabled': this.disabled,
          'mdc-textfield--fullwidth': this.fullWidth,
          'mdc-textfield--multiline': this.isTextarea
        }
      ];
    },

    isTextarea() {
      return this.type === 'textarea';
    }
  },

  mounted() {
    this.textfield = new MDCTextfield(this.$refs.textfield);
  },

  beforeDestroy() {
    this.textfield.destroy();
  }
};
</script>

<style lang="scss">
  @import "@material/textfield/mdc-textfield";
</style>
