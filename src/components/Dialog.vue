<template>
  <aside id="dialog" class="mdc-dialog" role="alertdialog" aria-labelledby="dialog-label" aria-describedby="dialog-description">
    <div class="mdc-dialog__surface">
      <header v-if="title" class="mdc-dialog__header">
        <h2 id="dialog-label" class="mdc-dialog__header__title">
          {{ title }}
        </h2>
      </header>
      <section v-if="body" id="dialog-description" class="mdc-dialog__body">
        {{ body }}
      </section>
      <footer class="mdc-dialog__footer">
        <button type="button" class="mdc-button mdc-dialog__footer__button mdc-dialog__footer__button--cancel">{{ cancelText }}</button>
        <button type="button" class="mdc-button mdc-dialog__footer__button mdc-dialog__footer__button--accept">{{ acceptText }}</button>
      </footer>
    </div>
    <div class="mdc-dialog__backdrop"></div>
  </aside>
</template>

<script>
import { MDCDialog } from '@material/dialog';

export default {
  name: 'Dialog',

  props: {
    title: {
      type: String
    },

    body: {
      type: String
    },

    cancelText: {
      type: String,
      default: 'Cancel'
    },

    acceptText: {
      type: String,
      default: 'Accept'
    }
  },

  data() {
    return {
      dialog: null
    };
  },

  mounted() {
    this.dialog = new MDCDialog(this.$el);

    this.dialog.listen('MDCDialog:accept', () => this.$emit('accept'));
    this.dialog.listen('MDCDialog:cancel', () => this.$emit('cancel'));
  },

  beforeDestroy() {
    this.dialog.destroy();
  },

  methods: {
    open() {
      this.dialog.show();
    }
  }
};
</script>

<style lang="scss">
  @import "@material/dialog/mdc-dialog";
</style>
