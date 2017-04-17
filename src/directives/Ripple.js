import { MDCRipple } from '@material/ripple';

export default {
  bind(el, context) {
    if (!context.modifiers.custom) {
      el.classList.add('mdc-ripple-surface');
    }

    el.mdc_ripple = new MDCRipple(el);
    el.mdc_ripple.unbounded = context.modifiers.unbounded;
  },

  unbind(el) {
    if (!el.mdc_ripple) {
      return;
    }

    el.mdc_ripple.destroy();
    delete el.mdc_ripple;
  }
};
