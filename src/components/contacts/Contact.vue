<template>
<div>
  <a class="mdc-list-item" v-ripple @click="$emit('click')">

    <span class="mdc-list-item__start-detail">
      <i class="material-icons" aria-hidden="true">{{ startIcon }}</i>
    </span>

    <span class="mdc-list-item__text">
      {{ contact.name }}
      <span class="mdc-list-item__text__secondary">{{ contact.number }}</span>
    </span>

    <slot name="end-detail">
      <a v-show="endIcon" @click.stop="$emit('action')"
        class="mdc-list-item__end-detail material-icons">
        {{ endIcon }}
      </a>
    </slot>

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
    },

    startIcon: {
      type: String,
      default: 'person'
    },

    endIcon: {
      type: String,
      default: ''
    }
  }
};
</script>
