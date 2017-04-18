<template>
<div>
  <a class="mdc-list-item" v-ripple @click="$emit('view')">
    <span class="mdc-list-item__start-detail">
      <i class="material-icons" aria-hidden="true">person</i>
    </span>
    <span class="mdc-list-item__text">
      {{ contact.name }}
      <span class="mdc-list-item__text__secondary">{{ contact.number }}</span>
    </span>
    <a @click.stop="$emit('delete')"
      class="mdc-list-item__end-detail material-icons"
      aria-label="Delete from contacts" title="Delete from contacts">
      close
    </a>
  </a>

  <hr role="separator" class="mdc-list-divider" />
</div>
</template>

<script>
import Ripple from '@/directives/Ripple';

export default {
  name: 'Contact',

  directives: { Ripple },

  props: {
    contact: {
      type: Object,
      required: true
    }
  }
};
</script>
